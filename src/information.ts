import { Polarity } from "./polarity";
import { EnvironmentBase, EnvironmentRoot } from "./envbase";
import { Environment } from "./environment";
import { Vector3 } from "./vector";
import { Handler } from "./handler";

type EnvironmentalState = 'emission' | 'absorption' | 'vibration' | 'execution' | 'mediation'; // emission -> absorption -> listening -> execution -> mediation
type InformationalState = 'local' | 'global'; // local -> global -> local

export class Information {

    public polarity: Polarity;
    public state: EnvironmentalState = 'emission';
    public domain: InformationalState = 'local';

    time: number = 0; // time is local to the object, updates every time the object moves. thus, faster objects have a higher time
    position: Vector3 = new Vector3(0, 0, 0);
    velocity: Vector3 = new Vector3(0, 0, 0);
    rotation: Vector3 = new Vector3(0, 0, 0);

    constructor(public parent?: EnvironmentRoot, public source?: EnvironmentRoot, public radius?: Vector3) {
        this.radius = radius;
        this.polarity = new Polarity(source);
    }
    on(event: string, eventHandler: Handler) { eventHandler.target = this; }
    off(event: string, eventHandler: Handler) { eventHandler.target = null; }
    once(event: string, eventHandler: Handler) { eventHandler.target = this; }

    get energy(): number {
        if(this.domain === 'local') return this.polarity.energy;
        else return this.polarity.entropy;
    }
    get entropy(): number { return this.polarity.entropy; }
    get mass(): number {
        if(this.domain === 'local') return this.energy;
        else return this.polarity.entropy;
    }
    quantizeState(): void {
        // quantize the state of the system. This is done by setting the state of the system to the state that\
        // has the highest entropy and the lowest energy
        const states: EnvironmentalState[] = ['emission', 'absorption', 'vibration', 'execution', 'mediation'];
        const state = states.reduce((prev, curr) => {
            const prevEntropy = this.polarity.entropy;
            const prevEnergy = this.polarity.energy;
            this.state = curr;
            const currEntropy = this.polarity.entropy;
            const currEnergy = this.polarity.energy;
            if(currEntropy > prevEntropy) return curr;
            else if(currEntropy === prevEntropy && currEnergy < prevEnergy) return curr;
            else return prev;
        });
        this.state = state;
        // quantize the domain of the system. This is done by setting the domain of the system to the domain that\
        // has the highest entropy and the lowest energy
        const domains: InformationalState[] = ['local', 'global'];
        const domain = domains.reduce((prev, curr) => {
            const prevEntropy = this.polarity.entropy;
            const prevEnergy = this.polarity.energy;
            this.domain = curr;
            const currEntropy = this.polarity.entropy;
            const currEnergy = this.polarity.energy;
            if(currEntropy > prevEntropy) return curr;
            else if(currEntropy === prevEntropy && currEnergy < prevEnergy) return curr;
            else return prev;
        });
        this.domain = domain;
        // quantize the polarity of the system. This is done by setting the polarity of the system to the polarity that\
        // has the highest entropy and the lowest energy
        const polarities: Polarity[] = [new Polarity(this.source), new Polarity(this.parent)];
        const polarity = polarities.reduce((prev, curr) => {
            const prevEntropy = this.polarity.entropy;
            const prevEnergy = this.polarity.energy;
            this.polarity = curr;
            const currEntropy = this.polarity.entropy;
            const currEnergy = this.polarity.energy;
            if(currEntropy > prevEntropy) return curr;
            else if(currEntropy === prevEntropy && currEnergy < prevEnergy) return curr;
            else return prev;
        });
        this.polarity = polarity;   
        // clear environment of any objects inside of it
        if(this.source) {
            const environment = this.source as Environment;
            environment.children = [];
        }
    }
    unQuantizeState() {
        if(this.domain === 'local' && this.state === 'emission') this.polarity = new Polarity(this.parent);
        else if(this.domain === 'global' && this.state === 'emission') this.polarity = new Polarity(this.source);
        else if(this.domain === 'local' && this.state === 'absorption') this.polarity = new Polarity(this.parent);
        else if(this.domain === 'global' && this.state === 'absorption') this.polarity = new Polarity(this.source);
        else if(this.domain === 'local' && this.state === 'vibration') this.polarity = new Polarity(this.parent);
        else if(this.domain === 'global' && this.state === 'vibration') this.polarity = new Polarity(this.source);
        else if(this.domain === 'local' && this.state === 'execution') this.polarity = new Polarity(this.parent);
        else if(this.domain === 'global' && this.state === 'execution') this.polarity = new Polarity(this.source);
        else if(this.domain === 'local' && this.state === 'mediation') this.polarity = new Polarity(this.parent);
        else if(this.domain === 'global' && this.state === 'mediation') this.polarity = new Polarity(this.source);
    }
    polarityBetween(other: Information): Polarity { // the polarity between this information and another information
        const oSource = other.source as Environment;
        if(this.parent) {
            if(oSource && oSource.information) {
                const otherPolarity = this.polarity.compare(oSource.information.polarity);
                return Polarity.compare(this.polarity, otherPolarity);
            }
        }
        return this.polarity;
    }
    visibleObjects(): Information[] { // get all objects that are within the radius of this object and not blocked by another object
        if(this.source === EnvironmentBase.NULL||!this.radius) return []
        const environment = this.source as Environment;
        // retrieve all objects that are within the radius of this object
        const visibleObjects = environment.children.filter(child => {
            const distance = this.position.distanceTo(child.information.position);
            return distance <= (this.radius||{x:1}).x && child.information instanceof Information;
        });
        // filter out all objects that are blocked by another object
        return visibleObjects.filter(child => {
            const distance = this.position.distanceTo(child.information.position);
            const blocked = visibleObjects.filter(other => {
                const otherDistance = this.position.distanceTo(other.information.position);
                return otherDistance < distance && other.information instanceof Information;
            });
            return blocked.length === 0;
        }).map(child => child.information as Information);
    }
    has(info: Information): boolean {
        if(this.source === EnvironmentBase.NULL) return false;
        const children = (this.source as Environment).children;
        return children.some(child => child.information === info);
    }
    get(info: Information): Information {
        if(this.source === EnvironmentBase.NULL) return Information.NULL;
        const children = (this.source as Environment).children;
        const child = children.find(child => child.information === info);
        if(child) return child.information;
        return Information.NULL;
    }
    set(info: Information, newInfo: Information): Information {
        if(this.source === EnvironmentBase.NULL) return Information.NULL;
        const children = (this.source as Environment).children;
        const child = children.find(child => child.information === info);
        if(child) child.information = newInfo;
        return newInfo;
    }
    all(): Information[] { // get all objects that are within the radius of this object
        if(this.source === EnvironmentBase.NULL) return []
        const environment = this.source as Environment;
        const visibleObjects = environment.children.filter(child => {
            const distance = this.position.distanceTo(child.information.position);
            return distance <= (this.radius||{x:1}).x && child.information instanceof Information;
        });
        return visibleObjects.map(child => child.information as Information);
    }
    clearQueue() {
        if(this.source === EnvironmentBase.NULL) return;
        const environment = this.source as Environment;
        environment.children = [];
    }
    advanceState(): EnvironmentalState { // advance the state of the information
        switch(this.state) {
            case 'emission': this.state = 'absorption'; break;
            case 'absorption': this.state = 'vibration'; break;
            case 'vibration': this.state = 'execution'; break;
            case 'execution': this.state = 'mediation'; break;
            case 'mediation': this.state = 'emission'; break;
        }
        return this.state;
    }
    static NULL: Information = new Information(Environment.NULL, Environment.NULL, new Vector3(0, 0, 0));
    toString() { return `(${this.polarity})`; }
    clone() { return new Information(this.parent, this.source, this.radius); }
}
/*

The following is a condensed abstract for test writers. The below should give anyone writing test coverage for the above class enough information to write the tests.
*/