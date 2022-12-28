import { Vector3 } from './vector';
export declare class Ray {
    origin: Vector3;
    direction: Vector3;
    constructor(origin: Vector3, direction: Vector3);
    intersectsSphere(ray: Ray, radius: number): boolean;
}
