import { Information } from './information';

export class Handler {
    target: any;
    constructor(public event: string, public callback: Function, public executeOnce: boolean) { }
    handle(event: string, info: Information) {
        if (this.event === event) {
            this.callback(info);
            if (this.executeOnce) {
                this.target.off(this.event, this);
            }
        }
    }
}