import { HexagramCharacter, Hexagram } from './hexagram';
function clamp(v: number) {
    // values greater than -.5 and less than .5 are rounded to 0. values less than -.5 are rounded to -1. values greater than .5 are rounded to 1.
    return v < -.5 ? -1 : v > .5 ? 1 : 0;
}
export class Pentuple {
    _a: number;
    _b: number;
    _c: number;
    _d: number;
    _e: number;
    constructor(initialPentuple: number = 0) {
        const [a, b, c, d, e] = Pentuple.decompose(initialPentuple);
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
    }
    get a(): number { return this._a; }
    get b(): number { return this._b; }
    get c(): number { return this._c; }
    get d(): number { return this._d; }
    get e(): number { return this._e; }
    set a(value: number) { this._a = clamp(value); }
    set b(value: number) { this._b = clamp(value); }
    set c(value: number) { this._c = clamp(value); }
    set d(value: number) { this._d = clamp(value); }
    set e(value: number) { this._e = clamp(value); }
    static decompose(pentuple: number): number[] {
        const a = pentuple % 3;
        const b = Math.floor(pentuple / 3) % 3;
        const c = Math.floor(pentuple / 9) % 3;
        const d = Math.floor(pentuple / 27) % 3;
        const e = Math.floor(pentuple / 81) % 3;
        return [a, b, c, d, e];
    }
    static compare(self: Pentuple, other: Pentuple): Pentuple {
        const a = self.a === other.a ? self.a : 1;
        const b = self.b === other.b ? self.b : 1;
        const c = self.c === other.c ? self.c : 1;
        const d = self.d === other.d ? self.d : 1;
        const e = self.e === other.e ? self.e : 1;
        return new Pentuple(a + b * 3 + c * 9 + d * 27 + e * 81);
    }
    get hexagram(): HexagramCharacter {
        const isNegative = this.a === -1 || this.b === -1 || this.c === -1 || this.d === -1 || this.e === -1;
        return (isNegative ? '-' : '') + String.fromCharCode(0x4DC0 + this.hexagramNumber) as HexagramCharacter;
    }
    set hexagram(hexagram: HexagramCharacter) {
        const hexagramNumber = hexagram.charCodeAt(0) - 0x4DC0;
        const [a, b, c, d, e] = Pentuple.decompose(hexagramNumber);
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
    }
    get hexagramNumber(): number {
        let hexagram = 0;
        hexagram += this.a === 1 ? 1 : 0;
        hexagram += this.b === 1 ? 2 : 0;
        hexagram += this.c === 1 ? 4 : 0;
        hexagram += this.d === 1 ? 8 : 0;
        hexagram += this.e === 1 ? 16 : 0;
        // if absorbing is negative, add 32 to the hexagram
        if (this.a === -1 || this.b === -1 || this.c === -1 || this.d === -1 || this.e === -1) {
            hexagram += 32;
        }
        return hexagram;
    }
    get pentupleNumber(): number {
        let trits = 0;
        trits += this.a;
        trits += this.b * 3;
        trits += this.c * 9;
        trits += this.d * 27;
        trits += this.e * 81;
        return trits;
    }

    evolve(other: Pentuple): Pentuple {
        const a = this.a === other.a ? this.a : 1;
        const b = this.b === other.b ? this.b : 1;
        const c = this.c === other.c ? this.c : 1;
        const d = this.d === other.d ? this.d : 1;
        const e = this.e === other.e ? this.e : 1;
        return new Pentuple(a + b * 3 + c * 9 + d * 27 + e * 81);
    }

    // treat the pentuple like a hexagram, then find its changing likes and evolve the hexagram into its next state then return the new pentuple
    evolveHexagram(other: Pentuple): Pentuple {
        const changingLines = Pentuple.compare(this, other);
        const newHexagram = Hexagram.evolve(changingLines.hexagram);
        return Hexagram.fromHexagramCharacter(newHexagram).pentuple;;
    }
    
    toString(): string {
        return this.hexagram;
    }
}