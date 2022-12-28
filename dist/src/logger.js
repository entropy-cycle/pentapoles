"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(target) {
        this.target = target;
    }
    log(s) { console.log(s); }
    info(s) { console.log(s); }
    warn(s) { console.log(s); }
    error(s) { console.log(s); }
    static getLogger() { return new Logger(this); }
}
exports.Logger = Logger;
