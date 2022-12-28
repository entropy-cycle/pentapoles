"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
class Handler {
    constructor(event, callback, executeOnce) {
        this.event = event;
        this.callback = callback;
        this.executeOnce = executeOnce;
    }
    handle(event, info) {
        if (this.event === event) {
            this.callback(info);
            if (this.executeOnce) {
                this.target.off(this.event, this);
            }
        }
    }
}
exports.Handler = Handler;
