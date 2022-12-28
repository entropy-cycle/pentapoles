"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const envbase_1 = require("./envbase");
const information_1 = require("./information");
const logger_1 = require("./logger");
const log = logger_1.Logger.getLogger().log;
/*
The environment class is responsible for advancing the environment's state. Its methods include `observe()`, `step()`, `reset()`, `visibleObjects()`, `updateLocaleInformation()`, `removeLocaleInformation()`, `has()`, `get()`, `set()`, `values()`, `forceBetween()`, `update()`, `clearQueue()`, `on()`, `off()`, `once()`, `emit()`, `toString()`, and `clone()`. When observed, the environment returns a LocaleInformation object with details about the environment's state, such as the positions of objects, force between objects, and events emitted by the environment. The methods of the environment class are used to advance the environment's state, interact with the environment, and observe its current state. The five core processes of the environment are absorption, vibration, execution, mediation, and emission.Information moves from local to global, and global to local. All dipoles are monopoles that connect to the global dipole, with polarity determined by the absolute value of the global dipole.
ALL CHANGES FOLLOW: EMISSION IS ABSORBED BY ABSORBER AS ABSORPTION THEN RELEASED AS ABSORPTION AS VIBRATION THEN VIBRATED BY VIBRATOR AS VIBRATION THEN EXECUTED BY EXECUTOR AS EXECUTION THEN MEDIATED BY MEDIATOR AS MEDIATION THEN EMITTED BY EMITTER AS EMISSION
EnvironmentBase includes the following properties and methods:
- isRoot: boolean
- isLeaf: boolean
- isBranch: boolean
- isQueueEmpty: boolean
- isQueueFull: boolean
- isPhysical: boolean
- clearQueue(): void
- getLocaleInformation(position: Vector3, radius: Vector3): LocaleInformation[]
- getGlobalInformation(): Information
- has(childEnvironment: Environment): boolean
- set(childEnvironment: Environment, replaceWIth: Environment): void
- get(position: Vector3, radius: Vector3): Environment[]
- toString(): string

*/
class Environment extends envbase_1.EnvironmentBase {
    constructor(parent, radius) {
        super(parent);
        this.parent = parent;
        this.radius = radius;
        this.roles = [];
        this.information = new information_1.Information(this.parent, this, radius);
    }
    get localeInformation() {
        return this.information.localeInformation;
    }
    observe(position, radius) {
        const parent = this.parent;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be observed.");
            return [];
        }
        let localeInfoArr = [];
        for (let i = 0; i < this.localeInformation.length; i++) {
            let info = this.localeInformation[i];
            if (this.inRange(position, radius, info.position)) {
                localeInfoArr.push(info);
            }
        }
        return localeInfoArr;
    }
    step() {
        const parent = this.parent;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be stepped.");
            return;
        }
        // Update the environment
        this.update();
        // Advance the state of the environment
        this.advanceState();
        // Emit information from the environment
        this.emit();
    }
    reset() {
        const parent = this.parent;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be reset.");
            return;
        }
        // Reset the environment
        this.clearQueue();
        this.localeInformation = [];
    }
    visibleObjects(ray) {
        const parent = this.parent;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be observed.");
            return [];
        }
        let visibleObjects = [];
        for (let i = 0; i < this.localeInformation.length; i++) {
            let info = this.localeInformation[i];
            if (ray.intersects(info.position)) {
                visibleObjects.push(info.object);
            }
        }
        return visibleObjects;
    }
    updateLocaleInformation(info) {
        const parent = this.parent;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be updated.");
            return;
        }
        // Check if the information already exists in the localeInformation array
        let exists = false;
        for (let i = 0; i < this.localeInformation.length; i++) {
            if (info.position.equals(this.localeInformation[i].position)) {
                exists = true;
                break;
            }
        }
        // If the information doesn't exist, add it to the array
        if (!exists) {
            this.localeInformation.push(info);
        }
    }
    removeLocaleInformation(position) {
        const parent = this.parent;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be updated.");
            return;
        }
        // Find the information with the specified position
        let index = -1;
        for (let i = 0; i < this.localeInformation.length; i++) {
            if (position.equals(this.localeInformation[i].position)) {
                index = i;
                break;
            }
        }
        // If the information is found, remove it from the array
        if (index > -1) {
            this.localeInformation.splice(index, 1);
        }
    }
    toString() {
        return this.information.toString();
    }
    clone() {
        return new Environment(this.parent, this.radius);
    }
}
exports.Environment = Environment;
