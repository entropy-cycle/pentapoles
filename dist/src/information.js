"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Information = void 0;
const polarity_1 = require("./polarity");
const environment_1 = require("./environment");
const vector_1 = require("./vector");
class Information {
    constructor(parent, source, radius) {
        this.parent = parent;
        this.source = source;
        this.radius = radius;
        this.state = 'emission';
        this.radius = radius;
        this.polarity = new polarity_1.Polarity(source);
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
