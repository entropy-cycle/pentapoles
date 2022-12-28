"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polarity = void 0;
const pentuple_1 = require("./pentuple");
// represents a set of polarities, which affect the behavior of an environment. Each polarity is a whole number between -1 and 1.
// these polarities can be interpreted as numeric values by treating each polarity as a trit. The trits are interpreted as
// a base 3 number, where -1 is 0, 0 is 1, and 1 is 2. The trits are then interpreted as a base 10 number, where -1 is 0, 0 is 1,
// polarities can evolve over time, and can be compared to other polarities to determine how they differ. A total of 243 different
// combinations of polarities are possible, which can be used to determine the behavior of an environment since 3 * 3 * 3 * 3 * 3 = 243.
// polarities can also be interpreted as a set of five bits where 0 is 0 and 1 is 1. The bits are then interpreted as a base 10 number
// and the sign of the absorption polarity determines the sign of the number. The number can be used to determine the behavior of an
// environment since 2 * 2 * 2 * 2 * 2 = 32 * 2 for the sign of the absorption polarity. This creates a strong equivalency to 
// the I-Ching, which is a set of 64 hexagrams, each of which is composed of 6 lines, each of which is either yin or yang. The lines
// are interpreted as a base 2 number, where yin is 0 and yang is 1. The number is then interpreted as a base 10 number, where yin is 0
// and yang is 1. The number can be used to determine the behavior of an environment since 2 * 2 * 2 * 2 * 2 * 2 = 64.
// the initial evolution of polarities also matches the I-Ching, where each polarity can evolve from 0 to 1 to 2 to 0, where 0 is -1,
// 1 is 0, and 2 is 1. Thus, the polarity can evolve from -1 to 0 to 1 to -1. We will use this evolution to determine the behavior of
// an environment.
function clamp(v) {
    // values greater than -.5 and less than .5 are rounded to 0. values less than -.5 are rounded to -1. values greater than .5 are rounded to 1.
    return v < -.5 ? -1 : v > .5 ? 1 : 0;
}
class Polarity {
    constructor(stateSource, initialPentuple = 0) {
        this.stateSource = stateSource;
        this._pentuple = new pentuple_1.Pentuple(initialPentuple);
    }
    static compare(self, other) {
        const polarity = new Polarity(self.stateSource);
        polarity._pentuple = pentuple_1.Pentuple.compare(self._pentuple, other._pentuple);
        return polarity;
    }
    getAsHexagram() {
        let hexagram = 0;
        hexagram += this.absorb === 1 ? 1 : 0;
        hexagram += this.listen === 1 ? 2 : 0;
        hexagram += this.execute === 1 ? 4 : 0;
        hexagram += this.mediate === 1 ? 8 : 0;
        hexagram += this.emit === 1 ? 16 : 0;
        hexagram *= this.absorb === -1 ? -1 : 1;
        return hexagram;
    }
    setAsHexagram(hexagram) {
        this.absorb = hexagram & 1 ? 1 : -1;
        this.listen = hexagram & 2 ? 1 : -1;
        this.execute = hexagram & 4 ? 1 : -1;
        this.mediate = hexagram & 8 ? 1 : -1;
        this.emit = hexagram & 16 ? 1 : -1;
    }
    getAsPentuple() {
        let pentuple = 0;
        pentuple += this.absorb === 1 ? 1 : 0;
        pentuple += this.listen === 1 ? 3 : 0;
        pentuple += this.execute === 1 ? 9 : 0;
        pentuple += this.mediate === 1 ? 27 : 0;
        pentuple += this.emit === 1 ? 81 : 0;
        pentuple *= this.absorb === -1 ? -1 : 1;
        return pentuple;
    }
    setAsPentuple(pentuple) {
        this.absorb = pentuple & 1 ? 1 : -1;
        this.listen = pentuple & 3 ? 1 : -1;
        this.execute = pentuple & 9 ? 1 : -1;
        this.mediate = pentuple & 27 ? 1 : -1;
        this.emit = pentuple & 81 ? 1 : -1;
    }
    nextHexagram() {
        let hexagram = this.getAsHexagram();
        hexagram += hexagram < 0 ? 1 : -1;
        return hexagram;
    }
    nextPentuple() {
        let pentuple = this.getAsPentuple();
        pentuple += pentuple < 0 ? 1 : -1;
        return pentuple;
    }
    compare(other) { return Polarity.compare(this, other); }
    get absorb() {
        const ss = this.stateSource;
        return ss
            && ss.information
            && ss.information.polarity !== this ? ss.information.polarity.absorb : this._pentuple.a;
    }
    set absorb(value) {
        const ss = this.stateSource;
        if (ss
            && ss.information
            && ss.information.polarity !== this) {
            ss.information.polarity.absorb = clamp(value);
        }
        else {
            this._pentuple.a = clamp(value);
        }
    }
    get listen() {
        const ss = this.stateSource;
        return ss
            && ss.information
            && ss.information.polarity !== this ? ss.information.polarity.listen : this._pentuple.b;
    }
    set listen(value) {
        const ss = this.stateSource;
        if (ss
            && ss.information
            && ss.information.polarity !== this) {
            ss.information.polarity.listen = clamp(value);
        }
        else {
            this._pentuple.b = clamp(value);
        }
    }
    get execute() {
        const ss = this.stateSource;
        return ss
            && ss.information
            && ss.information.polarity !== this ? ss.information.polarity.execute : this._pentuple.c;
    }
    set execute(value) {
        const ss = this.stateSource;
        if (ss
            && ss.information
            && ss.information.polarity !== this) {
            ss.information.polarity.execute = clamp(value);
        }
        else {
            this._pentuple.c = clamp(value);
        }
    }
    get mediate() {
        const ss = this.stateSource;
        return ss
            && ss.information
            && ss.information.polarity !== this ? ss.information.polarity.mediate : this._pentuple.d;
    }
    set mediate(value) {
        const ss = this.stateSource;
        if (ss
            && ss.information
            && ss.information.polarity !== this) {
            ss.information.polarity.mediate = clamp(value);
        }
        else {
            this._pentuple.d = clamp(value);
        }
    }
    get emit() {
        const ss = this.stateSource;
        return ss
            && ss.information
            && ss.information.polarity !== this ? ss.information.polarity.emit : this._pentuple.e;
    }
    set emit(value) {
        const ss = this.stateSource;
        if (ss
            && ss.information
            && ss.information.polarity !== this) {
            ss.information.polarity.emit = clamp(value);
        }
        else {
            this._pentuple.e = clamp(value);
        }
    }
    set(absorb, listen, execute, mediate, emit) {
        this.absorb = absorb;
        this.listen = listen;
        this.execute = execute;
        this.mediate = mediate;
        this.emit = emit;
    }
    get() { return [this.absorb, this.listen, this.execute, this.mediate, this.emit]; }
    toString() { return `(${this.absorb},${this.listen},${this.execute},${this.mediate},${this.emit})\n`; }
    clone() {
        const polarity = new Polarity(this.stateSource);
        polarity.absorb = this.absorb;
        polarity.listen = this.listen;
        polarity.execute = this.execute;
        polarity.mediate = this.mediate;
        polarity.emit = this.emit;
        return polarity;
    }
    state() {
        return this.getAsPentuple();
    }
    add(other) {
        // add the two polarities as pentuples, wrappping around at 0
        const thisPentuple = this._pentuple.evolve(other._pentuple);
        const polarity = new Polarity(this.stateSource);
        polarity.setAsPentuple(thisPentuple.pentupleNumber);
        return polarity;
    }
    subtract(other) {
        // to subtract we wrap the other polarity around and add
        const polarity = new Polarity(this.stateSource);
        polarity.setAsPentuple(-other.getAsPentuple());
        return this.add(polarity);
    }
}
exports.Polarity = Polarity;
