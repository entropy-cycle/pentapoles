"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const ray_1 = require("./ray");
class Renderer {
    constructor(canvas, env) {
        this.canvas = canvas;
        this.env = env;
        this.x = canvas.getContext('2d');
    }
    // raytrace the environment and render the visible objects
    render(position, direction, radius) {
        const x = this.x;
        if (!x) {
            return;
        }
        x.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const ray = new ray_1.Ray(position, direction);
        // get the visible objects from this perspective
        const localeInformations = this.env.getLocaleInformation(position, radius);
        localeInformations.forEach(info => {
            if (ray.intersectsSphere(ray, radius.x)) {
                // render the object
                x.beginPath();
                x.arc(info.position.x, info.position.y, 10, 0, 2 * Math.PI);
                x.fillStyle = 'red';
                x.fill();
                // render the object's children, scaling them all so that their positions and scales are relative to the parent
                if (info.source)
                    info.source.children.forEach((child) => {
                        const childInfo = child;
                        x.beginPath();
                        x.arc(childInfo.position.x, childInfo.position.y, 10, 0, 2 * Math.PI);
                        x.fillStyle = 'blue';
                        x.fill();
                    });
            }
        });
    }
}
exports.Renderer = Renderer;
