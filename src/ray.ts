import { Vector3 } from './vector';

export class Ray {
    constructor(public origin: Vector3, public direction: Vector3) {}
    intersectsSphere(ray: Ray, radius: number): boolean {
        const a = ray.direction.dot(ray.direction);
        const b = 2 * ray.direction.dot(ray.origin);
        const c = ray.origin.dot(ray.origin) - radius * radius;
        const discriminant = b * b - 4 * a * c;
        return discriminant >= 0;
    }
}