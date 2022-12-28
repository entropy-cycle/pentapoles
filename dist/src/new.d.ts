export declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(v: Vector2): Vector2;
    sub(v: Vector2): Vector2;
    multiply(v: Vector2): Vector2;
    divide(v: Vector2): Vector2;
    dot(v: Vector2): number;
    multiplyScalar(s: number): Vector2;
    divideScalar(s: number): Vector2;
    length(): number;
    distanceTo(v: Vector2): number;
    distanceToX(v: Vector2): number;
    distanceToY(v: Vector2): number;
    directionTo(v: Vector2): Vector2;
    angleTo(v: Vector2): number;
    normalize(): Vector2;
    normal(): Vector2;
    clone(): Vector2;
    equals(v: Vector2): boolean;
    toString(): string;
    static random(vecMin: Vector2, vecMax: Vector2): Vector2;
    static r(num: number): Vector2;
}
export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    add(v: Vector3): Vector3;
    sub(v: Vector3): Vector3;
    multiply(v: Vector3): Vector3;
    divide(v: Vector3): Vector3;
    dot(v: Vector3): number;
    multiplyScalar(s: number): Vector3;
    divideScalar(s: number): Vector3;
    length(): number;
    distanceTo(v: Vector3): number;
    distanceToX(v: Vector3): number;
    distanceToY(v: Vector3): number;
    distanceToZ(v: Vector3): number;
    directionTo(v: Vector3): Vector3;
    angleTo(v: Vector3): number;
    normalize(): Vector3;
    normal(): Vector3;
    clone(): Vector3;
    equals(v: Vector3): boolean;
    projectTo2d(camera: Vector3, screen: Vector2, rotation?: Vector3, scale?: number): Vector2;
    toString(): string;
    static random(vecMin: Vector3, vecMax: Vector3): Vector3;
    static r(num: number): Vector3;
}
export declare class Polarity {
    stateSource: Environment | undefined;
    _absorb: number;
    _listen: number;
    _execute: number;
    _mediate: number;
    _emit: number;
    constructor(stateSource: Environment | undefined);
    static compare(self: Polarity, other: Polarity): Polarity;
    compare(other: Polarity): Polarity;
    get absorb(): number;
    set absorb(value: number);
    get listen(): number;
    set listen(value: number);
    get execute(): number;
    set execute(value: number);
    get mediate(): number;
    set mediate(value: number);
    get emit(): number;
    set emit(value: number);
    set(absorb: number, listen: number, execute: number, mediate: number, emit: number): void;
    get(): number[];
    toString(): string;
    clone(): Polarity;
}
export declare class Information {
    parent: Environment | undefined;
    source: Environment | undefined;
    radius: Vector3;
    polarity: Polarity;
    constructor(parent: Environment | undefined, source: Environment | undefined, radius: Vector3);
    polarityBetween(other: Information): Polarity;
    static NULL: Information;
    toString(): string;
    clone(): Information;
}
export declare class Handler {
    event: string;
    callback: Function;
    executeOnce: boolean;
    target: any;
    constructor(event: string, callback: Function, executeOnce: boolean);
    handle(event: string, info: LocaleInformation): void;
}
export declare class LocaleInformation extends Information {
    time: number;
    position: Vector3;
    velocity: Vector3;
    rotation: Vector3;
    mass: number;
    constructor(parent: Environment | undefined, source: Environment | undefined, radius: Vector3, mass?: number);
    setInformation(position: Vector3, velocity: Vector3, rotation: Vector3): void;
    visibleObjects(): LocaleInformation[];
    updateLocaleInformation(info: LocaleInformation): void;
    removeLocaleInformation(info: LocaleInformation): void;
    has(info: LocaleInformation | Environment): boolean;
    get(info: LocaleInformation | Environment): LocaleInformation | undefined;
    set(info: LocaleInformation, value: LocaleInformation): void;
    values(): LocaleInformation[];
    forceBetween(other: LocaleInformation): Vector3;
    update(): void;
    clearQueue(): void;
    on(event: string, eventHandler: Handler): void;
    off(event: string, eventHandler: Handler): void;
    once(event: string, eventHandler: Handler): void;
    emit(event: string, info: LocaleInformation): void;
    toString(): string;
    clone(): LocaleInformation;
}
export declare class Environment {
    parent: Environment | undefined;
    information: Information | undefined;
    eventHandlers: any;
    children: LocaleInformation[];
    queue: LocaleInformation[];
    constructor(parent: Environment | undefined, information: Information | undefined);
    get isPhysical(): boolean;
    get isVirtual(): boolean;
    get isRoot(): boolean;
    get isLeaf(): boolean;
    get isBranch(): boolean;
    get isQueueEmpty(): boolean;
    get isQueueFull(): boolean;
    getLocaleInformation(position: Vector3, radius: Vector3): LocaleInformation[];
    getGlobalInformation(): LocaleInformation;
    addLocality(info: Environment, position: Vector3, radius: Vector3): void;
    addLocaleInformation(info: LocaleInformation, position: Vector3, radius: Vector3): void;
    updateLocaleInformation(info: LocaleInformation): void;
    removeLocaleInformation(info: LocaleInformation): void;
    update(): void;
    clearQueue(): void;
    on(event: string, eventHandler: Handler): void;
    off(event: string, eventHandler: Handler): void;
    once(event: string, eventHandler: Handler): void;
    toString(): string;
}
export declare class Ray {
    origin: Vector3;
    direction: Vector3;
    constructor(origin: Vector3, direction: Vector3);
    intersectsSphere(ray: Ray, radius: number): boolean;
}
export declare class Locality extends Environment {
    position: Vector3;
    velocity: Vector3;
    rotation: Vector3;
    constructor(parent: Environment | undefined, componentEnvs: Environment[], position: Vector3, velocity: Vector3, rotation: Vector3);
    get isPhysical(): boolean;
    get isVirtual(): boolean;
    set(position: Vector3, velocity: Vector3, rotation: Vector3): void;
    update(): void;
    clearQueue(): void;
    toString(): string;
    clone(): Locality;
}
export declare class Renderer {
    canvas: HTMLCanvasElement;
    env: Environment;
    x: CanvasRenderingContext2D | null;
    constructor(canvas: HTMLCanvasElement, env: Environment);
    render(position: Vector3, direction: Vector3, radius: Vector3): void;
}
