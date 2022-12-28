"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentBase = exports.EnvironmentRoot = void 0;
const events_1 = require("events");
const localeinfo_1 = require("./localeinfo");
const vector_1 = require("./vector");
const logger_1 = require("./logger");
const log = logger_1.Logger.getLogger().log;
class EnvironmentRoot extends events_1.EventEmitter {
}
exports.EnvironmentRoot = EnvironmentRoot;
class NullBase extends EnvironmentRoot {
    constructor() {
        super(...arguments);
        this.isNull = true;
    }
}
class EnvironmentBase extends EnvironmentRoot {
    constructor(parent) {
        super();
        this.parent = parent;
        this.parent = parent;
        this.children = [];
        this.queue = [];
    }
    get isRoot() { return this.parent === undefined; }
    get isLeaf() { return this.children.length === 0; }
    get isBranch() { return !this.isLeaf; }
    get isQueueEmpty() { return this.queue.length === 0; }
    get isQueueFull() { return this.queue.length === this.children.length; }
    get isPhysical() {
        return (this.information instanceof localeinfo_1.LocaleInformation)
            && (this.information.position instanceof vector_1.Vector3)
            && (this.information.rotation instanceof vector_1.Vector3);
    }
}
exports.EnvironmentBase = EnvironmentBase;
EnvironmentBase.NULL = new NullBase();
