"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ray = void 0;
class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
    intersectsSphere(ray, radius) {
        const a = ray.direction.dot(ray.direction);
        const b = 2 * ray.direction.dot(ray.origin);
        const c = ray.origin.dot(ray.origin) - radius * radius;
        const discriminant = b * b - 4 * a * c;
        return discriminant >= 0;
    }
}
exports.Ray = Ray;
