import { Polarity } from "./polarity";
import { EnvironmentRoot, EnvironmentBase } from "./envbase";
import { Environment } from "./environment";
import { Vector3 } from "./vector";
import { Information } from "./information";
import { Handler } from "./handler";

export class LocaleInformation extends Information { // information that has a position and velocity. Describes the state of an object in the environment including its position and velocity and rotation
    time: number; // time is local to the object, updates every time the object moves. thus, faster objects have a higher time
    position: Vector3;
    velocity: Vector3;
    rotation: Vector3;
    mass: number;
    constructor(parent: EnvironmentRoot, source: EnvironmentRoot, radius: Vector3, mass: number = 1) {
        super(parent, source, radius);
        this.time = 0;
        this.mass = mass;
        this.position = new Vector3(0, 0, 0);
        this.velocity = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
    }
    visibleObjects(): LocaleInformation[] { // get all objects that are within the radius of this object and not blocked by another object
        if(this.source === EnvironmentBase.NULL) return []
        const environment = this.source as Environment;
        // retrieve all objects that are within the radius of this object
        const visibleObjects = environment.children.filter(child => {
            const distance = this.position.distanceTo(child.information.position);
            return distance <= this.radius.x && child.information instanceof LocaleInformation;
        });
        // filter out all objects that are blocked by another object
        return visibleObjects.filter(child => {
            const distance = this.position.distanceTo(child.information.position);
            const blocked = visibleObjects.filter(other => {
                const otherDistance = this.position.distanceTo(other.information.position);
                return otherDistance < distance && other.information instanceof LocaleInformation;
            });
            return blocked.length === 0;
        }).map(child => child.information as LocaleInformation);
    }
    updateLocaleInformation(info: LocaleInformation) {
        this.time = info.time;
        this.position = info.position;
        this.velocity = info.velocity;
        this.rotation = info.rotation;
    }
    removeLocaleInformation(info: LocaleInformation) {
        if(this.source === EnvironmentBase.NULL) return;
        const environment = this.source as Environment;
        const index = environment.children.findIndex(child => child.information === info);
        if(index !== -1) {
            environment.children.splice(index, 1);
        }
    }
    has(info: LocaleInformation | Environment): boolean {
        if(this.source === EnvironmentBase.NULL) return false;
        const children = (this.source as Environment).children;
        // check to see if the given information is contained in this information as one of its children
        if(info instanceof Environment) {
            if(!this.source) return false;
            for(const child of children) {
                if(child === info) {
                    return true;
                }
            }
        } else {
            if(!this.source) return false;
            for(const child of children) {
                if(child === info.source) {
                    return true;
                }
            }
        }
        return false;
    }
    get(info: LocaleInformation | Environment): LocaleInformation | undefined {
        if(this.source === EnvironmentBase.NULL) return;
        const children = (this.source as Environment).children;
        if(!this.has(info)) {
            return;
        }
        if(info instanceof Environment) {
            if(!this.source) return undefined;
            for(const child of children) {
                if(child === info) {
                    return child.information;
                }
            }
        } else {
            if(!this.source) return undefined;
            for(const child of children) {
                if(child === info.source) {
                    return child.information;
                }
            }
        }
    }
    set(info: LocaleInformation, value: LocaleInformation) {
        if(this.has(info)) {
            this.updateLocaleInformation(value);
        }
    }
    values(): LocaleInformation[] {
        if(this.source === EnvironmentBase.NULL) return;
        const children = (this.source as Environment).children;
        return children.map(child => child.information);
    }
    forceBetween(other: LocaleInformation): Vector3 {
        const distance = this.position.sub(other.position);
        const force = distance.multiplyScalar(this.polarityBetween(other).absorb);
        return force;
    }
    update() {
        this.velocity = this.velocity.add(this.forceBetween(this).multiplyScalar(1 / this.mass));
        this.position = this.position.add(this.velocity);
        this.time++;
        // emit the updated event
        this.emit('updated', this);
    }
    clearQueue() {
        this.time = 0;
        this.position = new Vector3(0, 0, 0);
        this.velocity = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
    }
    on(event: string, eventHandler: Handler) { eventHandler.target = this; }
    off(event: string, eventHandler: Handler) { eventHandler.target = null; }
    once(event: string, eventHandler: Handler) { eventHandler.target = this; }

    emit(event: string, info: LocaleInformation) {
        this.visibleObjects().forEach((object) => {
            object.emit(event, info);
        });
    }
    toString() {
        // show all the locale information
        return `(${this.polarity}) ${this.position.toString()} ${this.velocity.toString()} ${this.rotation.toString()}`;
    }
    clone() { return new LocaleInformation(this.parent, this.source, this.radius, this.mass); }
}
