import { EventEmitter } from 'events';
import { Environment } from './environment';
import { LocaleInformation } from './localeinfo';
import { Vector3 } from './vector';
import { Logger } from './logger';
import { Handler } from './handler';

const log = Logger.getLogger().log;
export abstract class EnvironmentRoot extends EventEmitter { }
class NullBase extends EnvironmentRoot {
    public isNull = true;
}

export abstract class EnvironmentBase extends EnvironmentRoot {
    public information: any
    public children: Environment[];
    public queue: Environment[];
    constructor(public parent: EnvironmentRoot) {
        super();
        this.parent = parent;
        this.children = [];
        this.queue = [];
    }
    get isRoot(): boolean { return this.parent === undefined; }
    get isLeaf(): boolean { return this.children.length === 0; }
    get isBranch(): boolean { return !this.isLeaf; }
    get isQueueEmpty(): boolean { return this.queue.length === 0; }
    get isQueueFull(): boolean { return this.queue.length === this.children.length; }
    get isPhysical(): boolean {
        return (this.information instanceof LocaleInformation) 
        && (this.information.position instanceof Vector3) 
        && (this.information.rotation instanceof Vector3);
    }
    static NULL = new NullBase();
}
