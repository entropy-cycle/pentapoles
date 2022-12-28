"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Information = void 0;
const polarity_1 = require("./polarity");
const envbase_1 = require("./envbase");
const environment_1 = require("./environment");
const vector_1 = require("./vector");
class Information {
    constructor(parent, source, radius) {
        this.parent = parent;
        this.source = source;
        this.radius = radius;
        this.state = 'emission';
        this.domain = 'local';
        this.time = 0; // time is local to the object, updates every time the object moves. thus, faster objects have a higher time
        this.position = new vector_1.Vector3(0, 0, 0);
        this.velocity = new vector_1.Vector3(0, 0, 0);
        this.rotation = new vector_1.Vector3(0, 0, 0);
        this.radius = radius;
        this.polarity = new polarity_1.Polarity(source);
    }
    on(event, eventHandler) { eventHandler.target = this; }
    off(event, eventHandler) { eventHandler.target = null; }
    once(event, eventHandler) { eventHandler.target = this; }
    get energy() {
        if (this.domain === 'local')
            return this.polarity.energy;
        else
            return this.polarity.entropy;
    }
    get entropy() { return this.polarity.entropy; }
    get mass() {
        if (this.domain === 'local')
            return this.energy;
        else
            return this.polarity.entropy;
    }
    inRange(position, radius, target) {
        const distance = position.distanceTo(target);
        return distance <= radius.x;
    }
    quantizeState() {
        // quantize the state of the system. This is done by setting the state of the system to the state that\
        // has the highest entropy and the lowest energy
        const states = ['emission', 'absorption', 'vibration', 'execution', 'mediation'];
        const state = states.reduce((prev, curr) => {
            const prevEntropy = this.polarity.entropy;
            const prevEnergy = this.polarity.energy;
            this.state = curr;
            const currEntropy = this.polarity.entropy;
            const currEnergy = this.polarity.energy;
            if (currEntropy > prevEntropy)
                return curr;
            else if (currEntropy === prevEntropy && currEnergy < prevEnergy)
                return curr;
            else
                return prev;
        });
        this.state = state;
        // quantize the domain of the system. This is done by setting the domain of the system to the domain that\
        // has the highest entropy and the lowest energy
        const domains = ['local', 'global'];
        const domain = domains.reduce((prev, curr) => {
            const prevEntropy = this.polarity.entropy;
            const prevEnergy = this.polarity.energy;
            this.domain = curr;
            const currEntropy = this.polarity.entropy;
            const currEnergy = this.polarity.energy;
            if (currEntropy > prevEntropy)
                return curr;
            else if (currEntropy === prevEntropy && currEnergy < prevEnergy)
                return curr;
            else
                return prev;
        });
        this.domain = domain;
        // quantize the polarity of the system. This is done by setting the polarity of the system to the polarity that\
        // has the highest entropy and the lowest energy
        const polarities = [new polarity_1.Polarity(this.source), new polarity_1.Polarity(this.parent)];
        const polarity = polarities.reduce((prev, curr) => {
            const prevEntropy = this.polarity.entropy;
            const prevEnergy = this.polarity.energy;
            this.polarity = curr;
            const currEntropy = this.polarity.entropy;
            const currEnergy = this.polarity.energy;
            if (currEntropy > prevEntropy)
                return curr;
            else if (currEntropy === prevEntropy && currEnergy < prevEnergy)
                return curr;
            else
                return prev;
        });
        this.polarity = polarity;
        // clear environment of any objects inside of it
        if (this.source) {
            const environment = this.source;
            environment.children = [];
        }
    }
    unQuantizeState() {
        if (this.domain === 'local' && this.state === 'emission')
            this.polarity = new polarity_1.Polarity(this.parent);
        else if (this.domain === 'global' && this.state === 'emission')
            this.polarity = new polarity_1.Polarity(this.source);
        else if (this.domain === 'local' && this.state === 'absorption')
            this.polarity = new polarity_1.Polarity(this.parent);
        else if (this.domain === 'global' && this.state === 'absorption')
            this.polarity = new polarity_1.Polarity(this.source);
        else if (this.domain === 'local' && this.state === 'vibration')
            this.polarity = new polarity_1.Polarity(this.parent);
        else if (this.domain === 'global' && this.state === 'vibration')
            this.polarity = new polarity_1.Polarity(this.source);
        else if (this.domain === 'local' && this.state === 'execution')
            this.polarity = new polarity_1.Polarity(this.parent);
        else if (this.domain === 'global' && this.state === 'execution')
            this.polarity = new polarity_1.Polarity(this.source);
        else if (this.domain === 'local' && this.state === 'mediation')
            this.polarity = new polarity_1.Polarity(this.parent);
        else if (this.domain === 'global' && this.state === 'mediation')
            this.polarity = new polarity_1.Polarity(this.source);
    }
    polarityBetween(other) {
        const oSource = other.source;
        if (this.parent) {
            if (oSource && oSource.information) {
                const otherPolarity = this.polarity.compare(oSource.information.polarity);
                return polarity_1.Polarity.compare(this.polarity, otherPolarity);
            }
        }
        return this.polarity;
    }
    visibleObjects() {
        if (this.source === envbase_1.EnvironmentBase.NULL || !this.radius)
            return [];
        const environment = this.source;
        // retrieve all objects that are within the radius of this object
        const visibleObjects = environment.children.filter(child => {
            const distance = this.position.distanceTo(child.information.position);
            return distance <= (this.radius || { x: 1 }).x && child.information instanceof Information;
        });
        // filter out all objects that are blocked by another object
        return visibleObjects.filter(child => {
            const distance = this.position.distanceTo(child.information.position);
            const blocked = visibleObjects.filter(other => {
                const otherDistance = this.position.distanceTo(other.information.position);
                return otherDistance < distance && other.information instanceof Information;
            });
            return blocked.length === 0;
        }).map(child => child.information);
    }
    has(info) {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return false;
        const children = this.source.children;
        return children.some(child => child.information === info);
    }
    get(info) {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return Information.NULL;
        const children = this.source.children;
        const child = children.find(child => child.information === info);
        if (child)
            return child.information;
        return Information.NULL;
    }
    set(info, newInfo) {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return Information.NULL;
        const children = this.source.children;
        const child = children.find(child => child.information === info);
        if (child)
            child.information = newInfo;
        return newInfo;
    }
    all() {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return [];
        const environment = this.source;
        const visibleObjects = environment.children.filter(child => {
            const distance = this.position.distanceTo(child.information.position);
            return distance <= (this.radius || { x: 1 }).x && child.information instanceof Information;
        });
        return visibleObjects.map(child => child.information);
    }
    clearQueue() {
        if (this.source === envbase_1.EnvironmentBase.NULL)
            return;
        const environment = this.source;
        environment.children = [];
    }
    advanceState() {
        switch (this.state) {
            case 'emission':
                this.state = 'absorption';
                break;
            case 'absorption':
                this.state = 'vibration';
                break;
            case 'vibration':
                this.state = 'execution';
                break;
            case 'execution':
                this.state = 'mediation';
                break;
            case 'mediation':
                this.state = 'emission';
                break;
        }
        return this.state;
    }
    toString() { return `(${this.polarity})`; }
    clone() { return new Information(this.parent, this.source, this.radius); }
}
exports.Information = Information;
Information.NULL = new Information(environment_1.Environment.NULL, environment_1.Environment.NULL, new vector_1.Vector3(0, 0, 0));
