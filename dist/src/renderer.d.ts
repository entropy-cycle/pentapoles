import { Environment } from './environment';
import { Vector3 } from './vector';
export declare class Renderer {
    canvas: HTMLCanvasElement;
    env: Environment;
    x: CanvasRenderingContext2D | null;
    constructor(canvas: HTMLCanvasElement, env: Environment);
    render(position: Vector3, direction: Vector3, radius: Vector3): void;
}
