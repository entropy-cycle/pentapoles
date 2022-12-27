import { Vector3 } from './vector';
export declare class Environment {
    parent: LocalInformation | null;
    localInformations: LocalInformation[];
    globalInformation: LocalInformation;
    _children: Environment[];
    children(): Environment[];
    constructor(parent: LocalInformation | null, localInformations: LocalInformation[], globalInformation: LocalInformation);
    getGlobalInformation(): LocalInformation;
    absorb(local: Emission): Absorption[];
    listen(local: Absorption): Listening[];
    execute(local: Listening): Execution[];
    mediate(local: Execution): Mediation[];
    emit(local: Mediation): Emission[];
    getLocalInformation(position: Vector3, velocity: Vector3): LocalInformation;
    getVisibleObjects(local: LocalInformation, position: Vector3, velocity: Vector3): LocalInformation[];
    toString(): string;
    clone(): any;
}
export type infoType = 'absorber' | 'absorption' | 'listener' | 'listening' | 'executive' | 'execution' | 'mediative' | 'mediation' | 'emitter' | 'emission';
export declare class LocalInformation {
    parent: LocalInformation | null;
    position: Vector3;
    velocity: Vector3;
    infoType: infoType;
    infoValue: any;
    source: any;
    visibleObjects: LocalInformation[];
    constructor(parent: LocalInformation | null, position: Vector3, velocity: Vector3);
    distanceTo(local: LocalInformation): number;
    angleTo(local: LocalInformation): number;
    directionTo(local: LocalInformation): Vector3;
    velocityTo(local: LocalInformation): Vector3;
    add(local: LocalInformation): void;
    subtract(local: LocalInformation): void;
    convert(toType: infoType): any;
    update(): void;
    value(): any;
    toString(): string;
    clone(): LocalInformation;
}
export declare class Absorber extends Environment {
    parent: LocalInformation | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation);
    absorb(local: Emission): Absorption[];
    _doAbsorption(emission: LocalInformation, position: Vector3, velocity: Vector3): Absorption;
    clone(): Absorber;
}
export declare class Absorption extends LocalInformation {
    parent: LocalInformation | null;
    self: LocalInformation;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: LocalInformation | null, self: LocalInformation, position: Vector3, velocity: Vector3);
    add(absorption: Absorption): void;
    clone(): Absorption;
}
export declare class Listener extends Environment {
    parent: LocalInformation | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation);
    listen(local: Absorption): Listening[];
    _doListening(emission: LocalInformation, position: Vector3, velocity: Vector3): Listening;
    clone(): Listener;
}
export declare class Listening extends LocalInformation {
    parent: LocalInformation | null;
    self: LocalInformation;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: LocalInformation | null, self: LocalInformation, position: Vector3, velocity: Vector3);
    add(listening: Listening): void;
    clone(): Listening;
}
export declare class Executive extends Environment {
    parent: LocalInformation | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation);
    execute(local: Listening): Execution[];
    _doExecution(listening: LocalInformation, position: Vector3, velocity: Vector3): Execution;
    clone(): Executive;
}
export declare class Execution extends LocalInformation {
    parent: LocalInformation | null;
    self: LocalInformation;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: LocalInformation | null, self: LocalInformation, position: Vector3, velocity: Vector3);
    add(execution: Execution): void;
    clone(): Execution;
}
export declare class Mediative extends Environment {
    parent: LocalInformation | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation);
    mediate(local: Listening): Mediation[];
    _doMediation(listening: LocalInformation, position: Vector3, velocity: Vector3): Mediation;
    clone(): Mediative;
}
export declare class Mediation extends LocalInformation {
    parent: LocalInformation | null;
    self: LocalInformation;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: LocalInformation | null, self: LocalInformation, position: Vector3, velocity: Vector3);
    add(mediation: Mediation): void;
    clone(): Mediation;
}
export declare class Emitter extends Environment {
    parent: LocalInformation | null;
    informations: LocalInformation[];
    information: LocalInformation;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation);
    emit(local: Mediation): Emission[];
    _doEmission(emission: Emission, position: Vector3, velocity: Vector3): Emission[];
    _doMediation(mediation: Mediation, position: Vector3, velocity: Vector3): Mediation;
    listen(local: LocalInformation): Listening[];
}
export declare class Emission extends LocalInformation {
    parent: LocalInformation | null;
    self: LocalInformation;
    position: Vector3;
    velocity: Vector3;
    constructor(parent: LocalInformation | null, self: LocalInformation, position: Vector3, velocity: Vector3);
    add(emission: Emission): void;
    clone(): Emission;
}
export declare class Pole extends Environment {
    parent: LocalInformation;
    localInformations: LocalInformation[];
    globalInformation: LocalInformation;
    absorber: Absorber;
    listener: Listener;
    executor: Executive;
    mediator: Mediative;
    radiator: Emitter;
    constructor(parent: LocalInformation, localInformations: LocalInformation[], globalInformation: LocalInformation);
    getglobalInformation(): LocalInformation;
    absorb(local: LocalInformation): Absorption[];
    listen(local: LocalInformation): Listening[];
    execute(local: LocalInformation): Execution[];
    mediate(local: LocalInformation): Mediation[];
    emit(local: LocalInformation): Emission[];
    getLocalInformation(position: Vector3, velocity: Vector3): LocalInformation;
    update(): void;
    updateLocalInformation(localInformation: LocalInformation): void;
    measureQuantumState(): any;
}
export declare class Dipole extends Pole {
    parent: LocalInformation;
    localInformations: LocalInformation[];
    globalInformation: LocalInformation;
    constructor(parent: LocalInformation, localInformations: LocalInformation[], globalInformation: LocalInformation);
    updateLocalInformation(localInformation: LocalInformation): void;
}
export declare function randomDipoles(environment: Environment, maxX: number, maxY: number, maxZ: number, randomVal: number): void;
