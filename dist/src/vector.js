"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3 = exports.Vector2 = void 0;
class Vector2 {
    constructor(x, y) { this.x = x; this.y = y; }
    add(v) { return new Vector2(this.x + v.x, this.y + v.y); }
    sub(v) { return new Vector2(this.x - v.x, this.y - v.y); }
    multiply(v) { return new Vector2(this.x * v.x, this.y * v.y); }
    divide(v) { return new Vector2(this.x / v.x, this.y / v.y); }
    dot(v) { return this.x * v.x + this.y * v.y; }
    multiplyScalar(s) { return new Vector2(this.x * s, this.y * s); }
    divideScalar(s) { return new Vector2(this.x / s, this.y / s); }
    length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    distanceTo(v) { return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2)); }
    distanceToX(v) { return Math.abs(this.x - v.x); }
    distanceToY(v) { return Math.abs(this.y - v.y); }
    directionTo(v) { return v.sub(this).normal(); }
    angleTo(v) { return Math.acos(this.dot(v) / (this.length() * v.length())); }
    normalize() { return this.divideScalar(this.length()); }
    normal() { return this.clone().normalize(); }
    clone() { return new Vector2(this.x, this.y); }
    toString() { return `(${this.x},${this.y})`; }
    static random(vecMin, vecMax) { return new Vector2(Math.random() * (vecMax.x - vecMin.x) + vecMin.x, Math.random() * (vecMax.y - vecMin.y) + vecMin.y); }
    static r(num) { return Vector2.random(new Vector2(-num, -num), new Vector2(num, num)); }
}
exports.Vector2 = Vector2;
class Vector3 {
    constructor(x, y, z) { this.x = x; this.y = y; this.z = z; }
    add(v) { return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z); }
    sub(v) { return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z); }
    multiply(v) { return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z); }
    divide(v) { return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z); }
    dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
    multiplyScalar(s) { return new Vector3(this.x * s, this.y * s, this.z * s); }
    divideScalar(s) { return new Vector3(this.x / s, this.y / s, this.z / s); }
    length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
    distanceTo(v) { return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2) + Math.pow(this.z - v.z, 2)); }
    distanceToX(v) { return Math.abs(this.x - v.x); }
    distanceToY(v) { return Math.abs(this.y - v.y); }
    distanceToZ(v) { return Math.abs(this.z - v.z); }
    directionTo(v) { return v.sub(this).normal(); }
    angleTo(v) { return Math.acos(this.dot(v) / (this.length() * v.length())); }
    normalize() { return this.divideScalar(this.length()); }
    normal() { return this.clone().normalize(); }
    clone() { return new Vector3(this.x, this.y, this.z); }
    projectTo2d(camera, screen, rotation = new Vector3(1, 1, 1), scale = 100) {
        let v = this.sub(camera);
        let x = v.dot(new Vector3(rotation.x, 0, 0));
        let y = v.dot(new Vector3(0, rotation.y, 0));
        let z = v.dot(new Vector3(0, 0, rotation.z));
        return new Vector2(x / z, y / z).multiplyScalar(scale).add(screen);
    }
    toString() { return `(${this.x},${this.y},${this.z})`; }
    static random(vecMin, vecMax) { return new Vector3(Math.random() * (vecMax.x - vecMin.x) + vecMin.x, Math.random() * (vecMax.y - vecMin.y) + vecMin.y, Math.random() * (vecMax.z - vecMin.z) + vecMin.z); }
    static r(num) { return Vector3.random(new Vector3(-num, -num, -num), new Vector3(num, num, num)); }
}
exports.Vector3 = Vector3;
