"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hexagram = void 0;
const pentuple_1 = require("./pentuple");
class Hexagram {
    constructor(initialHexagram = 0) {
        const [a, b, c, d, e, f] = Hexagram.decompose(initialHexagram);
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
        this._f = f;
    }
    get a() { return this._a; }
    get b() { return this._b; }
    get c() { return this._c; }
    get d() { return this._d; }
    get e() { return this._e; }
    get f() { return this._f; }
    static decompose(hexagram) {
        const a = hexagram % 2;
        const b = Math.floor(hexagram / 2) % 2;
        const c = Math.floor(hexagram / 4) % 2;
        const d = Math.floor(hexagram / 8) % 2;
        const e = Math.floor(hexagram / 16) % 2;
        const f = Math.floor(hexagram / 32) % 2;
        return [a, b, c, d, e, f];
    }
    static evolve(hexChar) {
        const hexagramNumber = hexChar.charCodeAt(0) - 0x4DC0;
        const [a, b, c, d, e, f] = Hexagram.decompose(hexagramNumber);
        const newHexagramNumber = a + b * 2 + c * 4 + d * 8 + e * 16 + f * 32;
        return String.fromCharCode(0x4DC0 + newHexagramNumber);
    }
    static compare(self, other) {
        const a = self.a === other.a ? self.a : 1;
        const b = self.b === other.b ? self.b : 1;
        const c = self.c === other.c ? self.c : 1;
        const d = self.d === other.d ? self.d : 1;
        const e = self.e === other.e ? self.e : 1;
        const f = self.f === other.f ? self.f : 1;
        return new Hexagram(a + b * 2 + c * 4 + d * 8 + e * 16 + f * 32);
    }
    static fromHexagramCharacter(hexagram) {
        const hexagramNumber = hexagram.charCodeAt(0) - 0x4DC0;
        return new Hexagram(hexagramNumber);
    }
    get pentuple() {
        return new pentuple_1.Pentuple(this.pentupleNumber);
    }
    get hexagram() {
        return String.fromCharCode(0x4DC0 + this.getAsHexagram());
    }
    set hexagram(hexagram) {
        const hexagramNumber = hexagram.charCodeAt(0) - 0x4DC0;
        const [a, b, c, d, e, f] = Hexagram.decompose(hexagramNumber);
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
        this._f = f;
    }
    get pentupleNumber() {
        let trits = 0;
        trits += this.a;
        trits += this.b * 3;
        trits += this.c * 9;
        trits += this.d * 27;
        trits += this.e * 81;
        return trits;
    }
    getAsHexagram() {
        let hexagram = 0;
        hexagram += this.a === 1 ? 1 : 0;
        hexagram += this.b === 1 ? 2 : 0;
        hexagram += this.c === 1 ? 4 : 0;
        hexagram += this.d === 1 ? 8 : 0;
        hexagram += this.e === 1 ? 16 : 0;
        hexagram += this.f === 1 ? 32 : 0;
        return hexagram;
    }
    getAsTrits() {
        let trits = 0;
        trits += this.a === 1 ? 1 : 0;
        trits += this.b === 1 ? 3 : 0;
        trits += this.c === 1 ? 9 : 0;
        trits += this.d === 1 ? 27 : 0;
        trits += this.e === 1 ? 81 : 0;
        trits += this.f === 1 ? 243 : 0;
        return trits;
    }
    toString() {
        return `${this.hexagram}`;
    }
}
exports.Hexagram = Hexagram;
