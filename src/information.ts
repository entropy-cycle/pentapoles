import { Polarity } from "./polarity";
import { EnvironmentRoot } from "./envbase";
import { Environment } from "./environment";
import { Vector3 } from "./vector";

type EnvironmentalState = 'emission' | 'absorption' | 'vibration' | 'execution' | 'mediation'; // emission -> absorption -> listening -> execution -> mediation

export class Information {
    public polarity: Polarity;
    public state: EnvironmentalState = 'emission';

    constructor(public parent: EnvironmentRoot, public source: EnvironmentRoot, public radius: Vector3) {
        this.radius = radius;
        this.polarity = new Polarity(source);
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

