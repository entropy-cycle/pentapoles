import { HexagramCharacter } from './hexagram';
export declare class Pentuple {
    _a: number;
    _b: number;
    _c: number;
    _d: number;
    _e: number;
    constructor(initialPentuple?: number);
    get a(): number;
    get b(): number;
    get c(): number;
    get d(): number;
    get e(): number;
    set a(value: number);
    set b(value: number);
    set c(value: number);
    set d(value: number);
    set e(value: number);
    static decompose(pentuple: number): number[];
    static compare(self: Pentuple, other: Pentuple): Pentuple;
    get hexagram(): HexagramCharacter;
    set hexagram(hexagram: HexagramCharacter);
    get hexagramNumber(): number;
    get pentupleNumber(): number;
    evolve(other: Pentuple): Pentuple;
    evolveHexagram(other: Pentuple): Pentuple;
    toString(): string;
}
