import { EnvironmentRoot } from "./envbase";
import { Environment } from "./environment";
import { Vector3 } from "./vector";
import { Information } from "./information";
import { Handler } from "./handler";
export declare class LocaleInformation extends Information {
    time: number;
    position: Vector3;
    velocity: Vector3;
    rotation: Vector3;
    mass: number;
    constructor(parent: EnvironmentRoot, source: EnvironmentRoot, radius: Vector3, mass?: number);
    visibleObjects(): LocaleInformation[];
    updateLocaleInformation(info: LocaleInformation): void;
    removeLocaleInformation(info: LocaleInformation): void;
    has(info: LocaleInformation | Environment): boolean;
    get(info: LocaleInformation | Environment): LocaleInformation | undefined;
    set(info: LocaleInformation, value: LocaleInformation): void;
    values(): LocaleInformation[];
    forceBetween(other: LocaleInformation): Vector3;
    update(): void;
    clearQueue(): void;
    on(event: string, eventHandler: Handler): void;
    off(event: string, eventHandler: Handler): void;
    once(event: string, eventHandler: Handler): void;
    emit(event: string, info: LocaleInformation): void;
    toString(): string;
    clone(): LocaleInformation;
}
