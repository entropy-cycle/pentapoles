export default class Vector3 {
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
    toString(): string;
}
