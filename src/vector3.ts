export default class Vector3 {
    x: number; y: number; z: number;
    constructor(x: number, y: number, z: number) { this.x = x; this.y = y; this.z = z; }
    add(v: Vector3): Vector3 { return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z); }
    sub(v: Vector3): Vector3 { return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z); }
    multiply(v: Vector3): Vector3 { return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z); }
    divide(v: Vector3): Vector3 { return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z); }
    dot(v: Vector3): number { return this.x * v.x + this.y * v.y + this.z * v.z; }
    multiplyScalar(s: number): Vector3 { return new Vector3(this.x * s, this.y * s, this.z * s); }
    divideScalar(s: number): Vector3 { return new Vector3(this.x / s, this.y / s, this.z / s); }
    length(): number { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
    distanceTo(v: Vector3): number { return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2) + Math.pow(this.z - v.z, 2)); }
    directionTo(v: Vector3): Vector3 { return v.sub(this).normal(); }
    angleTo(v: Vector3): number { return Math.acos(this.dot(v) / (this.length() * v.length())); }
    normalize(): Vector3 { return this.divideScalar(this.length()); }
    normal(): Vector3 { return this.clone().normalize(); }
    clone(): Vector3 { return new Vector3(this.x, this.y, this.z); }
    toString(): string { return `(${this.x}, ${this.y}, ${this.z})`; }
}