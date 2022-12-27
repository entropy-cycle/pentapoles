export class Vector2 {
    x: number; y: number;
    constructor(x: number, y: number) { this.x = x; this.y = y; }
    add(v: Vector2): Vector2 { return new Vector2(this.x + v.x, this.y + v.y); }
    sub(v: Vector2): Vector2 { return new Vector2(this.x - v.x, this.y - v.y); }
    multiply(v: Vector2): Vector2 { return new Vector2(this.x * v.x, this.y * v.y); }
    divide(v: Vector2): Vector2 { return new Vector2(this.x / v.x, this.y / v.y); }
    dot(v: Vector2): number { return this.x * v.x + this.y * v.y; }
    multiplyScalar(s: number): Vector2 { return new Vector2(this.x * s, this.y * s); }
    divideScalar(s: number): Vector2 { return new Vector2(this.x / s, this.y / s); }
    length(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }
    distanceTo(v: Vector2): number { return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2)); }
    directionTo(v: Vector2): Vector2 { return v.sub(this).normal(); }
    angleTo(v: Vector2): number { return Math.acos(this.dot(v) / (this.length() * v.length())); }
    normalize(): Vector2 { return this.divideScalar(this.length()); }
    normal(): Vector2 { return this.clone().normalize(); }
    clone(): Vector2 { return new Vector2(this.x, this.y); }
    toString(): string { return `(${this.x}, ${this.y})`; }
}
export class Vector3 {
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
    projectTo2d( camera: Vector3, screen: Vector2, rotation: Vector3 = new Vector3(1, 1, 1), scale: number = 100 ): Vector2 {
        let v = this.sub(camera);
        let x = v.dot(new Vector3(rotation.x, 0, 0));
        let y = v.dot(new Vector3(0, rotation.y, 0));
        let z = v.dot(new Vector3(0, 0, rotation.z));
        return new Vector2(x / z, y / z).multiplyScalar(scale).add(screen);
    }
    toString(): string { return `(${this.x}, ${this.y}, ${this.z})`; }
}