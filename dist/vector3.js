"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    directionTo(v) { return v.sub(this).normal(); }
    angleTo(v) { return Math.acos(this.dot(v) / (this.length() * v.length())); }
    normalize() { return this.divideScalar(this.length()); }
    normal() { return this.clone().normalize(); }
    clone() { return new Vector3(this.x, this.y, this.z); }
    toString() { return `(${this.x}, ${this.y}, ${this.z})`; }
}
exports.default = Vector3;
