"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentBase = exports.EnvironmentRoot = void 0;
const events_1 = require("events");
const information_1 = require("./information");
const vector_1 = require("./vector");
const logger_1 = require("./logger");
const ray_1 = require("./ray");
const log = logger_1.Logger.getLogger().log;
class EnvironmentRoot extends events_1.EventEmitter {
}
exports.EnvironmentRoot = EnvironmentRoot;
class NullBase extends EnvironmentRoot {
    constructor() {
        super(...arguments);
        this.isNull = true;
    }
}
class EnvironmentBase extends EnvironmentRoot {
    constructor(parent) {
        super();
        this.parent = parent;
        this.parent = parent;
        this.children = [];
        this.queue = [];
    }
    get isRoot() { return this.parent === undefined; }
    get isLeaf() { return this.children.length === 0; }
    get isBranch() { return !this.isLeaf; }
    get isQueueEmpty() { return this.queue.length === 0; }
    get isQueueFull() { return this.queue.length === this.children.length; }
    get isPhysical() {
        return (this.information.source instanceof EnvironmentRoot)
            && (this.information.position instanceof vector_1.Vector3)
            && (this.information.rotation instanceof vector_1.Vector3);
    }
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
    getLocaleInformation(position, radius) {
        // get the visible children of this environment. A child is visible if it is within the radius of the
        // passed position and it is not blocked by another environment in the line of sight between the passed
        // position and the child.
        const visibleChildren = this.children.filter(child => {
            if (child && !child.isPhysical) {
                return true;
            }
            const distance = position.sub(child.information.position);
            return distance.length() < radius.length();
        });
        // remove any visible children that are blocked by another environment in the line of sight between the
        // passed position and the visible child.
        const visibleChildrenWithoutObstructions = visibleChildren.filter(child => {
            const distance = position.sub(child.information.position);
            const direction = distance.normalize();
            const ray = new ray_1.Ray(position, direction);
            const blocked = visibleChildren.filter(other => {
                const otherDistance = position.sub(other.information.position);
                const otherDirection = otherDistance.normalize();
                const otherRay = new ray_1.Ray(position, otherDirection);
                return ray.intersectsSphere(otherRay, other.radius.length());
            });
            return blocked.length === 0;
        });
        // aggregate the information from the visible children by source so that there is only one LocaleInformation entry
        // for each physical source in the visible children
        const localeInformationsBySource = visibleChildrenWithoutObstructions.reduce((map, child) => {
            const source = child.information.source;
            if ([!source]) {
                return map;
            }
            if (!map[source]) {
                map[source] = [];
            }
            map[source].push(child);
            return map;
        }, {});
        return localeInformationsBySource.children.map((e) => e.information);
    }
    getGlobalInformation() {
        const info = new information_1.Information(this.parent, this, this.information.radius);
        this.children.forEach(child => {
            if (child.information.source.isPhysical) {
                return;
            }
            info.polarity.absorb += child.information.polarity.absorb;
            info.polarity.listen += child.information.polarity.listen;
            info.polarity.execute += child.information.polarity.execute;
            info.polarity.mediate += child.information.polarity.mediate;
            info.polarity.emit += child.information.polarity.emit;
        });
        return info;
    }
    has(childEnvironment) {
        return this.children.indexOf(childEnvironment) !== -1;
    }
    set(childEnvironment, replaceWith) {
        const index = this.children.indexOf(childEnvironment);
        if (index !== -1) {
            this.children[index] = replaceWith;
        }
    }
    get(position, radius) {
        const environments = [];
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].isLeaf) {
                if (this.children[i].information.position.distanceTo(position) < radius.x) {
                    environments.push(this.children[i]);
                }
            }
            else {
                const childEnvironments = this.children[i].get(position, radius);
                for (let j = 0; j < childEnvironments.length; j++) {
                    environments.push(childEnvironments[j]);
                }
            }
        }
        return environments;
    }
    toString() { return this.information ? this.information.toString() + this.children.map(child => child.toString()).join('') : ''; }
}
exports.EnvironmentBase = EnvironmentBase;
EnvironmentBase.NULL = new NullBase();
