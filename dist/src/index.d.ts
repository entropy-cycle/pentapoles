import { Vector2, Vector3 } from './vector';
export { Vector2, Vector3 };
export declare class Environment {
    parent: LocalInformation | null;
    globalInformation: LocalInformation;
    absorber: any;
    listener: any;
    executor: any;
    mediator: any;
    emitter: any;
    _children: Environment[];
    children(): Environment[];
    constructor(parent: LocalInformation | null, localInformations: LocalInformation[] | undefined, globalInformation: LocalInformation);
    initEnvironment(parent: LocalInformation | null, localInformations: LocalInformation[] | undefined, globalInformation: LocalInformation): Promise<void>;
    getGlobalInformation(): LocalInformation;
    absorb(local: LocalInformation): Absorption[];
    listen(local: LocalInformation): Listening[];
    execute(local: LocalInformation): Execution[];
    mediate(local: LocalInformation): Mediation[];
    emit(local: LocalInformation): Emission[];
    observeLocalInformation(position: Vector3, radius: Vector3): LocalInformation;
    getLocalInformation(position: Vector3, radius: Vector3): LocalInformation;
    addLocalInformation(information: LocalInformation, position: Vector3, radius: Vector3): LocalInformation;
    updateLocalInformation(information: LocalInformation, position: Vector3): LocalInformation;
    removeLocalInformation(information: LocalInformation, position: Vector3): LocalInformation;
    addPole(pole: Pole, position: Vector3, radius: Vector3): LocalInformation;
    getPoles(position: Vector3, radius: Vector3): LocalInformation[];
    getVisibleObjects(local: LocalInformation, position: Vector3, radius: Vector3): LocalInformation[];
    toString(): string;
    clone(): any;
    compress(position: Vector3, radius: Vector3): LocalInformation;
    render(canvas: any, position: Vector3, direction: Vector3): void;
}
export type infoType = 'absorber' | 'absorption' | 'listener' | 'listening' | 'executive' | 'execution' | 'mediative' | 'mediation' | 'emitter' | 'emission';
export declare class LocalInformation {
    parent: LocalInformation | null;
    position: Vector3;
    radius: Vector3;
    infoType: infoType;
    infoValue: any;
    source: any;
    visibleObjects: LocalInformation[];
    constructor(parent: LocalInformation | null, position: Vector3, radius: Vector3);
    distanceTo(local: LocalInformation): number;
    angleTo(local: LocalInformation): number;
    directionTo(local: LocalInformation): Vector3;
    add(local: LocalInformation): void;
    subtract(local: LocalInformation): void;
    convert(toType: infoType): any;
    static convert(self: LocalInformation, toType: infoType): any;
    update(): void;
    toString(): string;
    clone(): LocalInformation;
    quantumState(): number;
}
export declare class Absorber extends Environment {
    parent: LocalInformation | null;
    informations: LocalInformation[];
    information: LocalInformation;
    alignment: Vector3;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation, alignment?: Vector3);
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
    alignment: Vector3;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation, alignment?: Vector3);
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
    alignment: Vector3;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation, alignment?: Vector3);
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
    alignment: Vector3;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation, alignment?: Vector3);
    mediate(local: Execution): Mediation[];
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
    alignment: Vector3;
    constructor(parent: LocalInformation | null, informations: LocalInformation[], information: LocalInformation, alignment?: Vector3);
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
    localInformation: LocalInformation;
    poleType: string;
    constructor(parent: LocalInformation, localInformation: LocalInformation, polarConfiguration: number);
    static createPoles(parent: LocalInformation, localInformations: LocalInformation, polarConfigurations: number[]): Pole[];
    createRandomPoles(parent: LocalInformation, localInformations: LocalInformation, maxPoles: number): Pole[];
}
export declare class Dipole extends Pole {
    parent: LocalInformation;
    localInformation: LocalInformation;
    constructor(parent: LocalInformation, localInformation: LocalInformation, polarConfiguration: number);
    static createDipoles(parent: LocalInformation, localInformations: LocalInformation, polarConfigurations: number[]): Dipole[];
    createRandomDipoles(parent: LocalInformation, localInformations: LocalInformation, maxDipoles: number): Dipole[];
}
export declare function randomDipoles(environment: Environment, maxX: number, maxY: number, maxZ: number, randomVal: number): void;
export declare class EnvironmentRenderer {
    canvas: any;
    environment: Environment;
    position: Vector3;
    radius: Vector3;
    constructor(canvas: any, environment: Environment, position: Vector3, radius: Vector3);
    render(position: Vector3, direction: Vector3): void;
}
export declare class FieldLine {
    position: Vector3;
    localInformationPosition: Vector3;
    constructor(position: Vector3, localInformationPosition: Vector3);
    render(canvas: any): void;
}
