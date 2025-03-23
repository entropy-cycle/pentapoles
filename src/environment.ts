import { EnvironmentBase, EnvironmentRoot } from './envbase';
import { Information } from './information';
import { Vector3 } from './vector';
import { Ray } from './ray';
import { Logger } from './logger';

const log = Logger.getLogger().log;

type EnvironmentalRole = 'emitter' | 'absorber' | 'vibrator' | 'executor' | 'mediator'; 

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


export class Environment extends EnvironmentBase {

    constructor(public parent: EnvironmentRoot, public radius: Vector3) {
        super(parent);
        this.information = new Information(this.parent, this, radius);
    }

    public roles: EnvironmentalRole[] = [];

    // Private backing field for locale information
    private _localeInformation: Information[] = [];
    
    get localeInformation(): Information[] {
        // This is a read-only property that needs a backing field
        return this._localeInformation;
    }

    public observe(position: Vector3, radius: Vector3): Information[] {
        const parent = this.parent as Environment;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be observed.");
            return [];
        }

        let localeInfoArr: Information[] = [];
        for (let i = 0; i < this.localeInformation.length; i++) {
            let info = this.localeInformation[i];
            if (this.inRange(position, radius, info.position)) {
                localeInfoArr.push(info);
            }
        }
        return localeInfoArr;
    }
    public inRange(position: Vector3, radius: Vector3, target: Vector3): boolean {
        let x = position.x - target.x;
        let y = position.y - target.y;
        let z = position.z - target.z;
        return (x * x) / (radius.x * radius.x) + (y * y) / (radius.y * radius.y) + (z * z) / (radius.z * radius.z) <= 1;
    }
    public step(): void {
        const parent = this.parent as Environment;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be stepped.");
            return;
        }

        // Update the environment
        this.updateEnvironment();

        // Advance the state of the environment
        this.advanceEnvironmentState();

        // Emit information from the environment
        this.emitInformation();
    }

    // Update the environment state
    private updateEnvironment(): void {
        // Implementation of environment update logic
        if (this.information) {
            this.information.quantizeState();
        }
    }

    // Advance the state of the environment
    private advanceEnvironmentState(): void {
        // Implementation of state advancement logic
        if (this.information) {
            this.information.advanceState();
        }
    }

    // Emit information from the environment
    private emitInformation(): void {
        // Implementation of information emission logic
        // Emit an event with the current state
        if (this.information) {
            this.emit('stateChanged', this.information);
        }
    }

    public reset(): void {
        const parent = this.parent as Environment;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be reset.");
            return;
        }
        // Reset the environment
        this.clearQueue();
        this._localeInformation = []; // Use the backing field instead of the getter
    }

    public visibleObjects(ray: Ray): Information[] {
        const parent = this.parent as Environment;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be observed.");
            return [];
        }
        let visibleObjects: Information[] = [];
        for (let i = 0; i < this._localeInformation.length; i++) {
            let info = this._localeInformation[i];
            // Use intersectsSphere instead of intersects
            if (ray.intersectsSphere(ray, info.radius ? info.radius.x : 1)) {
                visibleObjects.push(info);
            }
        }
        return visibleObjects;
    }

    public updateLocaleInformation(info: Information): void {
        const parent = this.parent as Environment;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be updated.");
            return;
        }
        // Check if the information already exists in the localeInformation array
        let exists = false;
        for (let i = 0; i < this._localeInformation.length; i++) {
            if (info.position.equals(this._localeInformation[i].position)) {
                exists = true;
                break;
            }
        }
        // If the information doesn't exist, add it to the array
        if (!exists) {
            this._localeInformation.push(info);
        }
    }

    public removeLocaleInformation(position: Vector3): void {
        const parent = this.parent as Environment;
        if (!parent.isPhysical) {
            log("The environment is not physical and cannot be updated.");
            return;
        }
        // Find the information with the specified position
        let index = -1;
        for (let i = 0; i < this._localeInformation.length; i++) {
            if (position.equals(this._localeInformation[i].position)) {
                index = i;
                break;
            }
        }
        // If the information is found, remove it from the array
        if (index > -1) {
            this._localeInformation.splice(index, 1);
        }
    }
    public toString(): string {
        return this.information.toString();
    }
    public clone(): Environment {
        return new Environment(this.parent, this.radius);
    }
}