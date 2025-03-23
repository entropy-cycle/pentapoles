import { EventEmitter } from 'events';
import { Environment } from './environment';
import { Information } from './information';
import { Vector3 } from './vector';
import { Logger } from './logger';
import { Ray } from './ray';

const log = Logger.getLogger().log;
export abstract class EnvironmentRoot extends EventEmitter { }
class NullBase extends EnvironmentRoot {
    public isNull = true;
}

export abstract class EnvironmentBase extends EnvironmentRoot {
    public information: any
    public children: Environment[];
    public queue: Environment[];
    constructor(public parent: EnvironmentRoot) {
        super();
        this.parent = parent;
        this.children = [];
        this.queue = [];
    }
    get isRoot(): boolean { return this.parent === undefined; }
    get isLeaf(): boolean { return this.children.length === 0; }
    get isBranch(): boolean { return !this.isLeaf; }
    get isQueueEmpty(): boolean { return this.queue.length === 0; }
    get isQueueFull(): boolean { return this.queue.length === this.children.length; }
    get isPhysical(): boolean {
        return (this.information.source instanceof EnvironmentRoot) 
        && (this.information.position instanceof Vector3) 
        && (this.information.rotation instanceof Vector3);
    }
    static NULL = new NullBase();
    clearQueue() {
        const info = this.information; 
        info.time = 0;
        info.polarity.absorb = 0;
        info.polarity.listen = 0;
        info.polarity.execute = 0;
        info.polarity.mediate = 0;
        info.polarity.emit = 0;
        this.queue = [];
    }
    getLocaleInformation(position: Vector3, radius: Vector3): Information[] {
        // get the visible children of this environment. A child is visible if it is within the radius of the
        // passed position and it is not blocked by another environment in the line of sight between the passed
        // position and the child.
        const visibleChildren = this.children.filter(child => {
            if(child && !child.isPhysical) { return true; }
            const distance = position.sub(child.information.position);
            return distance.length() < radius.length();
        });
        // remove any visible children that are blocked by another environment in the line of sight between the
        // passed position and the visible child.
        const visibleChildrenWithoutObstructions = visibleChildren.filter(child => {
            const distance = position.sub(child.information.position);
            const direction = distance.normalize();
            const ray = new Ray(position, direction);
            const blocked = visibleChildren.filter(other => {
                const otherDistance = position.sub(other.information.position);
                const otherDirection = otherDistance.normalize();
                const otherRay = new Ray(position, otherDirection);
                return ray.intersectsSphere(otherRay, other.radius.length());
            });
            return blocked.length === 0;
        });
        // aggregate the information from the visible children by source so that there is only one LocaleInformation entry
        // for each physical source in the visible children
        const localeInformationsBySource = visibleChildrenWithoutObstructions.reduce((map, child) => {
            const source = child.information.source;
            if(!source) { return map; }
            if(!map[source]) { map[source] = [] }
            map[source].push(child);
            return map;
        }, {} as any);
        return localeInformationsBySource.children.map((e: any) => e.information);
    }
    getGlobalInformation(): Information { // get the non-local information in the environment
        const info = new Information(this.parent, this, this.information.radius);
        this.children.forEach(child => {
            if(child.information.source.isPhysical) { return; }
            info.polarity.absorb += child.information.polarity.absorb;
            info.polarity.listen += child.information.polarity.listen;
            info.polarity.execute += child.information.polarity.execute;
            info.polarity.mediate += child.information.polarity.mediate;
            info.polarity.emit += child.information.polarity.emit;
        });
        return info;
    }
    has(childEnvironment: Environment): boolean {
        return this.children.indexOf(childEnvironment) !== -1;
    }

    set(childEnvironment: Environment, replaceWith: Environment): void {
        const index = this.children.indexOf(childEnvironment);
        if (index !== -1) {
            this.children[index] = replaceWith;
        }
    }

    get(position: Vector3, radius: Vector3): Environment[] {
        const environments: Environment[] = [];
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].isLeaf) {
                if (this.children[i].information.position.distanceTo(position) < radius.x) {
                    environments.push(this.children[i]);
                }
            } else {
                const childEnvironments = this.children[i].get(position, radius);
                for (let j = 0; j < childEnvironments.length; j++) {
                    environments.push(childEnvironments[j]);
                }
            }
        }
        return environments;
    }
    toString(): string {  return this.information ? this.information.toString() + this.children.map(child => child.toString()).join('') : ''; }
}
