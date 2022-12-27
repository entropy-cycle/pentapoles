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
    directionTo(v: Vector2): Vector2;
    angleTo(v: Vector2): number;
    normalize(): Vector2;
    normal(): Vector2;
    clone(): Vector2;
    toString(): string;
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
    directionTo(v: Vector3): Vector3;
    angleTo(v: Vector3): number;
    normalize(): Vector3;
    normal(): Vector3;
    clone(): Vector3;
    projectTo2d(camera: Vector3, screen: Vector2, rotation?: Vector3, scale?: number): Vector2;
    toString(): string;
}
