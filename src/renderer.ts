import { Environment } from './environment';
import { Information } from './information';
import { Ray } from './ray';
import { Vector3 } from './vector';


const renderColors = {

}


export class Renderer {
    canvas: HTMLCanvasElement;
    env: Environment;
    x: CanvasRenderingContext2D | null;
    constructor(canvas: HTMLCanvasElement, env : Environment) {
        this.canvas = canvas;
        this.env = env;
        this.x = canvas.getContext('2d');
    }
    // raytrace the environment and render the visible objects
    render(position: Vector3, direction: Vector3, radius: Vector3) {
        const x = this.x;
        if(!x) { return; }
        x.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const ray = new Ray(position, direction);
        // get the visible objects from this perspective
        const localeInformations = this.env.getLocaleInformation(position, radius);
        localeInformations.forEach(info => {
            if(ray.intersectsSphere(ray, radius.x)) {
                // render the object
                x.beginPath();
                x.arc(info.position.x, info.position.y, 10, 0, 2 * Math.PI);
                x.fillStyle = 'red';
                x.fill();
                // render the object's children, scaling them all so that their positions and scales are relative to the parent
                if(info.source) {
                    const infoSource = info.source as Environment;
                    infoSource.children.forEach((child: Environment) => {
                        if(child.isPhysical) {
                            const childInfo = child.information as Information;
                            x.beginPath();
                            x.arc(childInfo.position.x, childInfo.position.y, 10, 0, 2 * Math.PI);
                            x.fillStyle = 'blue';
                            x.fill();
                        } else {
                            // field
                        }
                    });
                }
            }
        });
    }
}