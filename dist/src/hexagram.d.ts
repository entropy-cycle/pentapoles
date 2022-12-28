import { Pentuple } from "./pentuple";
export type HexagramCharacter = '䷀' | '䷁' | '䷂' | '䷃' | '䷄' | '䷅' | '䷆' | '䷇' | '䷈' | '䷉' | '䷊' | '䷋' | '䷌' | '䷍' | '䷎' | '䷏' | '䷐' | '䷑' | '䷒' | '䷓' | '䷔' | '䷕' | '䷖' | '䷗' | '䷘' | '䷙' | '䷚' | '䷛' | '䷜' | '䷝' | '䷞' | '䷟' | '䷠' | '䷡' | '䷢' | '䷣' | '䷤' | '䷥' | '䷦' | '䷧' | '䷨' | '䷩' | '䷪' | '䷫' | '䷬' | '䷭' | '䷮' | '䷯' | '䷰' | '䷱' | '䷲' | '䷳' | '䷴' | '䷵' | '䷶' | '䷷' | '䷸' | '䷹' | '䷺' | '䷻' | '䷼' | '䷽' | '䷾' | '䷿';
export declare class Hexagram {
    _a: number;
    _b: number;
    _c: number;
    _d: number;
    _e: number;
    _f: number;
    constructor(initialHexagram?: number);
    get a(): number;
    get b(): number;
    get c(): number;
    get d(): number;
    get e(): number;
    get f(): number;
    static decompose(hexagram: number): number[];
    static evolve(hexChar: HexagramCharacter): HexagramCharacter;
    static compare(self: Hexagram, other: Hexagram): Hexagram;
    static fromHexagramCharacter(hexagram: HexagramCharacter): Hexagram;
    get pentuple(): Pentuple;
    get hexagram(): HexagramCharacter;
    set hexagram(hexagram: HexagramCharacter);
    get pentupleNumber(): number;
    getAsHexagram(): number;
    getAsTrits(): number;
    toString(): string;
}
