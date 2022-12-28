export declare class Logger {
    target: any;
    constructor(target: any);
    log(s: string): void;
    info(s: string): void;
    warn(s: string): void;
    error(s: string): void;
    static getLogger(): Logger;
}
