export class Logger {
    constructor(public target: any) { }
    log(s: string) { console.log(s); }
    info(s: string) { console.log(s); }
    warn(s: string) { console.log(s); }
    error(s: string) { console.log(s); }
    static getLogger() { return new Logger(this); }
}
