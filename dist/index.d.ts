import Vector3 from './vector3';
export declare class Environment {
    parent: Environment | null;
    localInformations: LocalInformation[];
    globalInformation: LocalInformation;
    _children: Environment[];
    children(): Environment[];
    constructor(parent: Environment | null, localInformations: LocalInformation[], globalInformation: LocalInformation);
    absorb(local: LocalInformation): Absorption;
    listen(local: LocalInformation): Listening;
    execute(local: LocalInformation): Execution;
    mediate(local: LocalInformation): Mediation;
    emit(local: LocalInformation): Emission;
    getLocalInformation(position: Vector3, velocity: Vector3): LocalInformation;
    getGlobalInformation(): LocalInformation;
    getVisibleObjects(local: LocalInformation, position: Vector3, velocity: Vector3): LocalInformation[];
}
export type infoType = 'emitter' | 'emission' | 'absorptive' | 'absorption' | 'radiative' | 'radiation' | 'listener' | 'listening' | 'mediative' | 'mediation' | 'executive' | 'execution';
export declare class LocalInformation {
    parent: Environment | null;
    position: Vector3;
    velocity: Vector3;
    infoType: infoType;
    infoValue: any;
    source: any;
    visibleObjects: LocalInformation[];
    constructor(parent: Environment | null, position: Vector3, velocity: Vector3);
    distanceTo(local: LocalInformation): number;
    angleTo(local: LocalInformation): number;
    directionTo(local: LocalInformation): Vector3;
    velocityTo(local: LocalInformation): Vector3;
    add(local: LocalInformation): void;
    subtract(local: LocalInformation): void;
    convert(toType: LocalInformation): any;
    update(): void;
    value(): any;
}
export declare class Absorption extends LocalInformation {
    parent: Environment | null;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: Environment | null, position: Vector3, velocity: Vector3);
    listen(local: LocalInformation | null): LocalInformation | null;
    add(absorption: Absorption): void;
}
export declare class Listening extends LocalInformation {
    parent: Environment | null;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: Environment | null, position: Vector3, velocity: Vector3);
    execute(local: LocalInformation | null): LocalInformation | null;
}
export declare class Execution extends LocalInformation {
    parent: Environment | null;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: Environment | null, position: Vector3, velocity: Vector3);
    mediate(local: LocalInformation | null): LocalInformation | null;
}
export declare class Mediation extends LocalInformation {
    parent: Environment | null;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: Environment | null, position: Vector3, velocity: Vector3);
    emit(local: LocalInformation | null): LocalInformation | null;
}
export declare class Emission extends LocalInformation {
    parent: Environment | null;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: Environment | null, position: Vector3, velocity: Vector3);
    emit(local: LocalInformation): LocalInformation | null;
    add(emission: Emission): void;
}
export declare class Emitter extends Environment {
    parent: Environment | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: Environment | null, informations: LocalInformation[], information: LocalInformation);
    emit(local: LocalInformation): Emission;
}
export declare class Absorber extends Environment {
    parent: Environment | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: Environment | null, informations: LocalInformation[], information: LocalInformation);
    absorb(local: LocalInformation): Absorption;
}
export declare class Executive extends Environment {
    parent: Environment | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: Environment | null, informations: LocalInformation[], information: LocalInformation);
    execute(local: LocalInformation): Execution;
}
export declare class Mediative extends Environment {
    parent: Environment | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: Environment | null, informations: LocalInformation[], information: LocalInformation);
    mediate(local: LocalInformation): Mediation;
}
export declare class Listener extends Environment {
    parent: Environment | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: Environment | null, informations: LocalInformation[], information: LocalInformation);
    listen(local: LocalInformation): Listening;
}
export declare class Pole extends Environment {
    parent: Environment;
    localInformations: LocalInformation[];
    globalInformation: LocalInformation;
    absorber: Absorber;
    listener: Listener;
    executor: Executive;
    mediator: Mediative;
    radiator: Emitter;
    constructor(parent: Environment, localInformations: LocalInformation[], globalInformation: LocalInformation);
    getglobalInformation(): LocalInformation;
    absorb(local: LocalInformation): Absorption;
    listen(local: LocalInformation): Listening;
    execute(local: LocalInformation): Execution;
    mediate(local: LocalInformation): Mediation;
    emit(local: LocalInformation): Emission;
    getLocalInformation(position: Vector3, velocity: Vector3): LocalInformation;
    update(): void;
    updateLocalInformation(localInformation: LocalInformation): void;
}
export declare class Dipole extends Pole {
    parent: Environment;
    localInformations: LocalInformation[];
    globalInformation: LocalInformation;
    constructor(parent: Environment, localInformations: LocalInformation[], globalInformation: LocalInformation);
    getLocalInformation(position: Vector3, velocity: Vector3): LocalInformation;
}
export declare function randomDipoles(environment: Environment, maxX: number, maxY: number, maxZ: number, randomVal: number): void;
