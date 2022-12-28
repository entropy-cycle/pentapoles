"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleInformation = void 0;
const envbase_1 = require("./envbase");
const environment_1 = require("./environment");
const vector_1 = require("./vector");
const information_1 = require("./information");
class LocaleInformation extends information_1.Information {
    constructor(parent, source, radius, mass = 1) {
        super(parent, source, radius);
        this.time = 0;
        this.mass = mass;
        this.position = new vector_1.Vector3(0, 0, 0);
        this.velocity = new vector_1.Vector3(0, 0, 0);
        this.rotation = new vector_1.Vector3(0, 0, 0);
    }
    visibleObjects() {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return [];
        const environment = this.source;
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
        }).map(child => child.information);
    }
    updateLocaleInformation(info) {
        this.time = info.time;
        this.position = info.position;
        this.velocity = info.velocity;
        this.rotation = info.rotation;
    }
    removeLocaleInformation(info) {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return;
        const environment = this.source;
        const index = environment.children.findIndex(child => child.information === info);
        if (index !== -1) {
            environment.children.splice(index, 1);
        }
    }
    has(info) {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return false;
        const children = this.source.children;
        // check to see if the given information is contained in this information as one of its children
        if (info instanceof environment_1.Environment) {
            if (!this.source)
                return false;
            for (const child of children) {
                if (child === info) {
                    return true;
                }
            }
        }
        else {
            if (!this.source)
                return false;
            for (const child of children) {
                if (child === info.source) {
                    return true;
                }
            }
        }
        return false;
    }
    get(info) {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return;
        const children = this.source.children;
        if (!this.has(info)) {
            return;
        }
        if (info instanceof environment_1.Environment) {
            if (!this.source)
                return undefined;
            for (const child of children) {
                if (child === info) {
                    return child.information;
                }
            }
        }
        else {
            if (!this.source)
                return undefined;
            for (const child of children) {
                if (child === info.source) {
                    return child.information;
                }
            }
        }
    }
    set(info, value) {
        if (this.has(info)) {
            this.updateLocaleInformation(value);
        }
    }
    values() {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return [];
        const children = this.source.children;
        return children.map(child => child.information);
    }
    forceBetween(other) {
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
        this.position = new vector_1.Vector3(0, 0, 0);
        this.velocity = new vector_1.Vector3(0, 0, 0);
        this.rotation = new vector_1.Vector3(0, 0, 0);
    }
    on(event, eventHandler) { eventHandler.target = this; }
    off(event, eventHandler) { eventHandler.target = null; }
    once(event, eventHandler) { eventHandler.target = this; }
    emit(event, info) {
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
exports.LocaleInformation = LocaleInformation;
