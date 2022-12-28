import { EnvironmentBase, EnvironmentRoot } from './envbase';
import { Information } from './information';
import { LocaleInformation } from './localeinfo';
import { Vector3 } from './vector';
import { Ray } from './ray';
import { Logger } from './logger';

const log = Logger.getLogger().log;

export class Environment extends EnvironmentBase {
    constructor(public parent: EnvironmentRoot, public radius: Vector3) {
        super(parent);
        this.information = new Information(this.parent, this, radius);
    }

    /**
     * get the locale information for this environment. Locale information is information that is relative to 
     * the environment's position and rotation.
     * @param position 
     * @param radius 
     * @returns 
     */
    getLocaleInformation(position: Vector3, radius: Vector3): LocaleInformation[] {
        
        // get the chilren that are within the radius of the position
        const visibleChildren = this.children.filter(child => {
            // if the child is a not physical environment then it is always visible
            if(child.source && child.source.isVirtual) { return true; }
            const distance = position.sub(child.position);
            return distance.length() < radius.length();
        });
        
        // remove any children that are within the radius of the position but blocked by other children
        // in the line of sight between the position and the child
        const visibleChildrenWithoutObstructions = visibleChildren.filter(child => {
            const distance = position.sub(child.position);
            const direction = distance.normalize();
            const ray = new Ray(position, direction);
            const blocked = visibleChildren.filter(other => {
                const otherDistance = position.sub(other.position);
                const otherDirection = otherDistance.normalize();
                const otherRay = new Ray(position, otherDirection);
                return ray.intersectsSphere(otherRay, other.radius.length());
            });
            return blocked.length === 0;
        });
        
        // aggregate the information from the visible children by source so that there is only one LocaleInformation entry
        // for each physical source in the visible children
        const localeInformationsBySource = visibleChildrenWithoutObstructions.reduce((map, child) => {
            if(!child.source) return map;
            if(map.has(child.source)) {
                const info = map.get(child.source);
                if(info) {
                    info.polarity.absorb += child.polarity.absorb;
                    info.polarity.listen += child.polarity.listen;
                    info.polarity.execute += child.polarity.execute;
                    info.polarity.mediate += child.polarity.mediate;
                    info.polarity.emit += child.polarity.emit;
                }
            } else map.set(child, child);
            return map;
        });
        return Array.from(localeInformationsBySource.values());
    }

    /**
     * get the global information for this environment. Global information is information that is not relative to
     * the environment's position and rotation. global information is the sum of the information from all of the
     * children of the environment.
     * @returns 
     */
    getGlobalInformation(): LocaleInformation { // get the non-local information in the environment
        const info = new LocaleInformation(this.parent, this, new Vector3(0, 0, 0));
        this.children.forEach(child => {
            if(!child.source) return;
            if(child.source.isPhysical) { return; }
            info.polarity.absorb += child.polarity.absorb;
            info.polarity.listen += child.polarity.listen;
            info.polarity.execute += child.polarity.execute;
            info.polarity.mediate += child.polarity.mediate;
            info.polarity.emit += child.polarity.emit;
        });
        return info;
    }

    /**
     * add a child to the environment in a specific position and radius as a physical environment
     * @param info 
     * @param position 
     * @param radius 
     */
    addLocality(info: Environment, position: Vector3, radius: Vector3) {
        const localeInfo = new LocaleInformation(this, info, radius);
        localeInfo.position = position;
        localeInfo.rotation = new Vector3(0, 0, 0);
        localeInfo.velocity = new Vector3(0, 0, 0);
        localeInfo.mass = 1;
        localeInfo.source = info;
        this.children.push(localeInfo);
        log(`added ${info} to ${this}`);
    }

    /**
     * called when the passed locale information is absorbed by this environment. The passed locale information
     * is absorbed by this environment when the passed locale information is within the radius of this environment
     * and the passed locale information is not blocked by another environment in the line of sight between this
     * environment and the passed locale information. Absorbed locale information interacts with the environment,
     * @param info 
     */
    absorbed(info: LocaleInformation) {}
    /**
     * add locale information to the environment in a specific position and radius. locale information is information
     * that is relative to the environment's position and rotation.
     * @param info 
     * @param position 
     * @param radius 
     */
    addLocaleInformation(info: LocaleInformation, position: Vector3, radius: Vector3) {
        this.children.push(info);
    }

    /**
     * update the locale information for this environment. locale information is information that is relative to
     * the environment's position and rotation.
     * @param info 
     */
    updateLocaleInformation(info: LocaleInformation) { // update the environment with the new information
        this.queue.push(info);
    }

    /**
     * remove locale information from the environment
     * @param info 
     */    
    removeLocaleInformation(info: LocaleInformation) {
        const index = this.children.indexOf(info);
        if(index >= 0) {
            this.children.splice(index, 1);
        }
    }

    /**
     * update the state of the environment, including the state of the children. To advance the state, the environment
     * must be updated with the new information. We do this in two steps to allow the environment to process all of the
     * information before updating the children. Step 1: update the environment with the new information. Step 2: update
     * the children with the new information.
     */
    update() {
        this.queue.forEach(info => {
            const index = this.children.indexOf(info);
            if(index >= 0) {
                this.children[index] = info;
            } else {
                this.children.push(info);
            }
        });
        this.clearQueue();
        this.children.forEach(child => child.update());
    }

    /**
     * clear the queue of information to be processed
     */
    clearQueue() {
        const info = this.information as LocaleInformation; 
        info.time = 0;
        info.polarity.absorb = 0;
        info.polarity.listen = 0;
        info.polarity.execute = 0;
        info.polarity.mediate = 0;
        info.polarity.emit = 0;
        this.queue = [];
    }
    toString() {  return this.information ? this.information.toString() + this.children.map(child => child.toString()).join('\n') : ''; }
}
