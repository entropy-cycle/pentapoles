/// <reference types="node" />
import { EventEmitter } from 'events';
import { Environment } from './environment';
export declare abstract class EnvironmentRoot extends EventEmitter {
}
declare class NullBase extends EnvironmentRoot {
    isNull: boolean;
}
export declare abstract class EnvironmentBase extends EnvironmentRoot {
    parent: EnvironmentRoot;
    information: any;
    children: Environment[];
    queue: Environment[];
    constructor(parent: EnvironmentRoot);
    get isRoot(): boolean;
    get isLeaf(): boolean;
    get isBranch(): boolean;
    get isQueueEmpty(): boolean;
    get isQueueFull(): boolean;
    get isPhysical(): boolean;
    static NULL: NullBase;
}
export {};
