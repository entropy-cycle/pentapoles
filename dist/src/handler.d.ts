import { Information } from './information';
export declare class Handler {
    event: string;
    callback: Function;
    executeOnce: boolean;
    target: any;
    constructor(event: string, callback: Function, executeOnce: boolean);
    handle(event: string, info: Information): void;
}
