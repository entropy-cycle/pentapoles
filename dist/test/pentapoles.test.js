"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
// Absorber -> Absorption -> Listener -> Listening -> Executive -> Execution -> Mediative -> Mediation -> Emitter -> Emission -< Absorber ...
/*
interface for Environment class:
    getGlobalInformation(): LocalInformation
    absorb(local: Emission): Absorption[]
    listen(local: Absorption): Listening[]
    execute(local: Listening): Execution[]
    mediate(local: Execution): Mediation[]
    emit(local: Mediation): Emission[]
    getLocalInformation(position: Vector3, velocity: Vector3): LocalInformation
    getVisibleObjects(local: LocalInformation, position: Vector3, velocity: Vector3): LocalInformation[]
    toString(): string
*/
/*
interface for LocalInformation class:
    distanceTo(local: LocalInformation): number
    angleTo(local: LocalInformation): number
    directionTo(local: LocalInformation): Vector3
    velocityTo(local: LocalInformation): Vector3
    add(local: LocalInformation): void
    subtract(local: LocalInformation): void
    convert(toType: infoType): any
    update(): void
    value(): any
    toString(): string
    clone(): any
*/
/*
interface for Absorber class:
    absorb(local: Emission): Absorption[]
    clone(): Absorber
*/
/**
interface for Absorption class:
    add(absorption: Absorption): void
    clone(): Absorption
 */
/*
interface for Listener class:
    listen(local: Absorption): Listening[]
    clone(): Listener
*/ 
