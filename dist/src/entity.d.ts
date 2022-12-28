import { Environment } from "./environment";
import { Vector3 } from "./vector";
import { LocaleInformation } from "./localeinfo";
import { Polarity } from "./polarity";
export declare class Entity extends Environment {
    parent: Environment;
    position: Vector3;
    radius: Vector3;
    mass: number;
    polarity: Polarity;
    information: LocaleInformation;
    /**
     * constructor. Creates a new entity in the environment
     * @param parent
     * @param position
     * @param radius
     * @param mass
     * @param polarity
     */
    constructor(parent: Environment, position: Vector3, radius: Vector3, mass: number, polarity: Polarity);
    getGlobalInformation(): LocaleInformation;
    addLocality(info: Environment, position: Vector3, radius: Vector3): void;
    getLocalInformation(): LocaleInformation[];
}
