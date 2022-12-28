export class Vector2 {
    x: number; y: number;
    constructor(x: number, y: number) { this.x = x; this.y = y; }
    add(v: Vector2): Vector2 { return new Vector2(this.x + v.x, this.y + v.y); }
    sub(v: Vector2): Vector2 { return new Vector2(this.x - v.x, this.y - v.y); }
    multiply(v: Vector2): Vector2 { return new Vector2(this.x * v.x, this.y * v.y); }
    divide(v: Vector2): Vector2 { return new Vector2(this.x / v.x, this.y / v.y); }
    dot(v: Vector2): number { return this.x * v.x + this.y * v.y; }
    multiplyScalar(s: number): Vector2 { return new Vector2(this.x * s, this.y * s); }
    divideScalar(s: number): Vector2 { return new Vector2(this.x / s, this.y / s); }
    length(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }
    distanceTo(v: Vector2): number { return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2)); }
    distanceToX(v: Vector2): number { return Math.abs(this.x - v.x); }
    distanceToY(v: Vector2): number { return Math.abs(this.y - v.y); }
    directionTo(v: Vector2): Vector2 { return v.sub(this).normal(); }
    angleTo(v: Vector2): number { return Math.acos(this.dot(v) / (this.length() * v.length())); }
    normalize(): Vector2 { return this.divideScalar(this.length()); }
    normal(): Vector2 { return this.clone().normalize(); }
    clone(): Vector2 { return new Vector2(this.x, this.y); }
    equals(v: Vector2): boolean { return this.x == v.x && this.y == v.y; }
    toString(): string { return `(${this.x},${this.y})`; }
    static random(vecMin: Vector2, vecMax: Vector2): Vector2 { return new Vector2(Math.random() * (vecMax.x - vecMin.x) + vecMin.x, Math.random() * (vecMax.y - vecMin.y) + vecMin.y); }
    static r(num: number) { return Vector2.random(new Vector2(-num, -num), new Vector2(num, num)); }
}

export class Vector3 {
    x: number; y: number; z: number;
    constructor(x: number, y: number, z: number) { this.x = x; this.y = y; this.z = z; }
    add(v: Vector3): Vector3 { return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z); }
    sub(v: Vector3): Vector3 { return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z); }
    multiply(v: Vector3): Vector3 { return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z); }
    divide(v: Vector3): Vector3 { return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z); }
    dot(v: Vector3): number { return this.x * v.x + this.y * v.y + this.z * v.z; }
    multiplyScalar(s: number): Vector3 { return new Vector3(this.x * s, this.y * s, this.z * s); }
    divideScalar(s: number): Vector3 { return new Vector3(this.x / s, this.y / s, this.z / s); }
    length(): number { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
    distanceTo(v: Vector3): number { return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2) + Math.pow(this.z - v.z, 2)); }
    distanceToX(v: Vector3): number { return Math.abs(this.x - v.x); }
    distanceToY(v: Vector3): number { return Math.abs(this.y - v.y); }
    distanceToZ(v: Vector3): number { return Math.abs(this.z - v.z); }
    directionTo(v: Vector3): Vector3 { return v.sub(this).normal(); }
    angleTo(v: Vector3): number { return Math.acos(this.dot(v) / (this.length() * v.length())); }
    normalize(): Vector3 { return this.divideScalar(this.length()); }
    normal(): Vector3 { return this.clone().normalize(); }
    clone(): Vector3 { return new Vector3(this.x, this.y, this.z); }
    equals(v: Vector3): boolean { return this.x == v.x && this.y == v.y && this.z == v.z; }
    projectTo2d( camera: Vector3, screen: Vector2, rotation: Vector3 = new Vector3(1, 1, 1), scale: number = 100 ): Vector2 {
        let v = this.sub(camera);
        let x = v.dot(new Vector3(rotation.x, 0, 0));
        let y = v.dot(new Vector3(0, rotation.y, 0));
        let z = v.dot(new Vector3(0, 0, rotation.z));
        return new Vector2(x / z, y / z).multiplyScalar(scale).add(screen);
    }
    toString(): string { return `(${this.x},${this.y},${this.z})`; }
    static random(vecMin: Vector3, vecMax: Vector3): Vector3 { return new Vector3( ~~(Math.random() * (vecMax.x - vecMin.x) + vecMin.x), ~~(Math.random() * (vecMax.y - vecMin.y) + vecMin.y), ~~(Math.random() * (vecMax.z - vecMin.z) + vecMin.z)); }
    static r(num: number) { return Vector3.random(new Vector3(-num, -num, -num), new Vector3(num, num, num)); }
}

export class Polarity {
    _absorb: number;
    _listen: number;
    _execute: number;
    _mediate: number;
    _emit: number;
    constructor(public stateSource: Environment | undefined) {
        this._absorb = 0;
        this._listen = 0;
        this._execute = 0;
        this._mediate = 0;
        this._emit = 0;
    }
    static compare(self: Polarity, other: Polarity): Polarity {
        const polarity = new Polarity(self.stateSource);
        polarity.absorb = self.absorb - other.absorb;
        polarity.listen = self.listen - other.listen;
        polarity.execute = self.execute - other.execute;
        polarity.mediate = self.mediate - other.mediate;
        polarity.emit = self.emit - other.emit;
        return polarity;
    }
    compare(other: Polarity): Polarity { return Polarity.compare(this, other); }
    get absorb(): number {
        return this.stateSource 
            && this.stateSource.information 
            && this.stateSource.information.polarity !== this ? this.stateSource.information.polarity.absorb : this._absorb;
    }
    set absorb(value: number) {
        if(this.stateSource 
            && this.stateSource.information 
            && this.stateSource.information.polarity !== this) {
            this.stateSource.information.polarity.absorb = value; 
        } else { 
            this._absorb = value; 
        } 
    }
    get listen(): number {
        return this.stateSource
            && this.stateSource.information
            && this.stateSource.information.polarity !== this ? this.stateSource.information.polarity.listen : this._listen;
    }
    set listen(value: number) {
        if(this.stateSource 
            && this.stateSource.information 
            && this.stateSource.information.polarity !== this) {
            this.stateSource.information.polarity.listen = value;
        } else {
            this._listen = value;
        }
    }
    get execute(): number {
        return this.stateSource
            && this.stateSource.information
            && this.stateSource.information.polarity !== this ? this.stateSource.information.polarity.execute : this._execute;
    }
    set execute(value: number) {
        if(this.stateSource 
            && this.stateSource.information
            && this.stateSource.information.polarity !== this) {
            this.stateSource.information.polarity.execute = value;
        } else {
            this._execute = value;
        }
    }
    get mediate(): number {
        return this.stateSource
            && this.stateSource.information
            && this.stateSource.information.polarity !== this ? this.stateSource.information.polarity.mediate : this._mediate;
    }
    set mediate(value: number) {
        if(this.stateSource 
            && this.stateSource.information 
            && this.stateSource.information.polarity !== this) {
            this.stateSource.information.polarity.mediate = value;
        } else {
            this._mediate = value;
        }
    }
    get emit(): number {
        return this.stateSource
            && this.stateSource.information
            && this.stateSource.information.polarity !== this ? this.stateSource.information.polarity.emit : this._emit;
    }
    set emit(value: number) {
        if(this.stateSource 
            && this.stateSource.information
            && this.stateSource.information.polarity !== this) {
            this.stateSource.information.polarity.emit = value;
        } else {
            this._emit = value;
        }
    }
    set(absorb: number, listen: number, execute: number, mediate: number, emit: number) {
        this.absorb = absorb;
        this.listen = listen;
        this.execute = execute;
        this.mediate = mediate;
        this.emit = emit;
    }
    get() { return [this.absorb, this.listen, this.execute, this.mediate, this.emit]; }
    toString(): string { return `(${this.absorb},${this.listen},${this.execute},${this.mediate},${this.emit})\n`; }
    clone(): Polarity { return new Polarity(this.stateSource); }
}
// the above export class has the following interface:
// - get absorb(): number
// - set absorb(value: number)
// - get listen(): number
// - set listen(value: number)
// - get execute(): number
// - set execute(value: number)
// - get mediate(): number
// - set mediate(value: number)
// - get emit(): number
// - set emit(value: number)
// - set(absorb: number, listen: number, execute: number, mediate: number, emit: number)
// - get(): [number, number, number, number, number]
// - toString(): string
// - clone(): Polarity


export class Information { // only has state information (polarity, radius, etc.), has no position or velocity since it has no location
    public polarity: Polarity;
    constructor(public parent: Environment | undefined, public source: Environment | undefined, public radius: Vector3) {
        this.radius = radius;
        this.polarity = new Polarity(source);
    }
    polarityBetween(other: Information): Polarity { // the polarity between this information and another information
        if(this.parent) {
            if(other.source && other.source.information) {
                const otherPolarity = this.polarity.compare(other.source.information.polarity);
                return Polarity.compare(this.polarity, otherPolarity);
            }
        }
        return this.polarity;
    }
    static NULL: Information = new Information(undefined, undefined, new Vector3(0, 0, 0));
    toString() { return `(${this.polarity})`; }
    clone() { return new Information(this.parent, this.source, this.radius); }
}
// the above export class has the following interface:
// - polarity: Polarity
// - polarityBetween(other: Information): Polarity
// - static NULL: Information
// - toString(): string
// - clone(): Information


export class Handler {
    target: any;
    constructor(public event: string, public callback: Function, public executeOnce: boolean) { }
    handle(event: string, info: LocaleInformation) {
        if (this.event === event) {
            this.callback(info);
            if (this.executeOnce) {
                this.target.off(this.event, this);
            }
        }
    }
}
// the above export class has the following interface:
// - target: any
// - constructor(event: string, callback: Function, executeOnce: boolean)
// - handle(event: string, info: LocaleInformation): void

export class LocaleInformation extends Information { // information that has a position and velocity. Describes the state of an object in the environment including its position and velocity and rotation
    time: number; // time is local to the object, updates every time the object moves. thus, faster objects have a higher time
    position: Vector3;
    velocity: Vector3;
    rotation: Vector3;
    mass: number;
    constructor(parent: Environment | undefined, source: Environment | undefined, radius: Vector3, mass: number = 1) {
        super(parent, source, radius);
        this.time = 0;
        this.mass = mass;
        this.position = new Vector3(0, 0, 0);
        this.velocity = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
    }
    setInformation(position: Vector3, velocity: Vector3, rotation: Vector3) { // set the position, velocity, and rotation of the object
        this.position = position;
        this.velocity = velocity;
        this.rotation = rotation;
    }
    visibleObjects(): LocaleInformation[] { // get all objects that are within the radius of this object and not blocked by another object
        return [];
    }
    updateLocaleInformation(info: LocaleInformation) {
        this.time = info.time;
        this.position = info.position;
        this.velocity = info.velocity;
        this.rotation = info.rotation;
    }
    removeLocaleInformation(info: LocaleInformation) {
        this.time = 0;
        this.position = new Vector3(0, 0, 0);
        this.velocity = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
    }
    has(info: LocaleInformation | Environment): boolean {
        // check to see if the given information is contained in this information as one of its children
        if(info instanceof Environment) {
            if(!this.source) return false;
            for(const child of this.source.children) {
                if(child.source === info) {
                    return true;
                }
            }
        } else {
            if(!this.source) return false;
            for(const child of this.source.children) {
                if(child.source === info.source) {
                    return true;
                }
            }
        }
        return false;
    }
    get(info: LocaleInformation | Environment): LocaleInformation | undefined {
        if(!this.has(info)) {
            return;
        }
        if(info instanceof Environment) {
            if(!this.source) return undefined;
            for(const child of this.source.children) {
                if(child.source === info) {
                    return child;
                }
            }
        } else {
            if(!this.source) return undefined;
            for(const child of this.source.children) {
                if(child.source === info.source) {
                    return child;
                }
            }
        }
    }
    set(info: LocaleInformation, value: LocaleInformation) {
        if(this.has(info)) {
            this.updateLocaleInformation(value);
        }
    }
    values(): LocaleInformation[] {
        return this.source ? this.source.children  : [];
    }
    forceBetween(other: LocaleInformation): Vector3 {
        const distance = this.position.sub(other.position);
        const force = distance.multiplyScalar(this.polarityBetween(other).absorb);
        return force;
    }
    update() {
        this.velocity = this.velocity.add(this.forceBetween(this).multiplyScalar(1 / this.mass));
        this.position = this.position.add(this.velocity);
        this.time++;
        // emit the updated event
        this.emit('updated', this);
    }
    clearQueue() {
        this.time = 0;
        this.position = new Vector3(0, 0, 0);
        this.velocity = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
    }
    on(event: string, eventHandler: Handler) { eventHandler.target = this; }
    off(event: string, eventHandler: Handler) { eventHandler.target = null; }
    once(event: string, eventHandler: Handler) { eventHandler.target = this; }

    emit(event: string, info: LocaleInformation) {
        this.visibleObjects().forEach((object) => {
            object.emit(event, info);
        });
    }
    toString() {
        // show all the locale information
        return `(${this.polarity}) ${this.position.toString()} ${this.velocity.toString()} ${this.rotation.toString()}`;
    }
    clone() { return new LocaleInformation(this.parent, this.source, this.radius, this.mass); }
}
// the above export class has the following interface:
// - position: Vector3
// - velocity: Vector3
// - rotation: Vector3
// - mass: number
// - time: number
// - update(): void
// - clearQueue(): void
// - forceBetween(other: LocaleInformation): Vector3
// - visibleObjects(): LocaleInformation[]
// - updateLocaleInformation(info: LocaleInformation): void
// - removeLocaleInformation(info: LocaleInformation): void
// - has(info: LocaleInformation | Environment): boolean
// - get(info: LocaleInformation | Environment): LocaleInformation | undefined
// - set(info: LocaleInformation, value: LocaleInformation): void
// - values(): LocaleInformation[]
// - on(event: string, eventHandler: Handler): void
// - off(event: string, eventHandler: Handler): void
// - once(event: string, eventHandler: Handler): void
// - emit(event: string, info: LocaleInformation): void
// - toString(): string
// - clone(): LocaleInformation

export class Environment {
    eventHandlers: any = {};

    children: LocaleInformation[];
    queue: LocaleInformation[];

    constructor(public parent: Environment | undefined, public information: Information | undefined) {
        this.parent = parent;
        this.children = [];
        this.queue = [];
        this.information = new LocaleInformation(this.parent, this, new Vector3(0, 0, 0));
    }
    // environments are physical if they have a position and a rotation
    get isPhysical(): boolean {
        return (this.information instanceof LocaleInformation) 
        && (this.information.position instanceof Vector3) 
        && (this.information.rotation instanceof Vector3);
    }
    get isVirtual(): boolean { return !this.isPhysical; }
    get isRoot(): boolean { return this.parent === undefined; }
    get isLeaf(): boolean { return this.children.length === 0; }
    get isBranch(): boolean { return !this.isLeaf; }
    get isQueueEmpty(): boolean { return this.queue.length === 0; }
    get isQueueFull(): boolean { return this.queue.length === this.children.length; }

    getLocaleInformation(position: Vector3, radius: Vector3): LocaleInformation[] {
        // get the chilren that are within the radius of the position
        const visibleChildren = this.children.filter(child => {
            // if the child is a not physical environment then it is always visible
            if(child.source && child.source.isVirtual) { return true; }
            const distance = position.sub(child.position);
            return distance.length() < radius.length();
        });
        // remove any children that are within the radius of the position but blocked by other children
        // in the line of sight between the position and the child
        const visibleChildrenWithoutObstructions = visibleChildren.filter(child => {
            const distance = position.sub(child.position);
            const direction = distance.normalize();
            const ray = new Ray(position, direction);
            const blocked = visibleChildren.filter(other => {
                const otherDistance = position.sub(other.position);
                const otherDirection = otherDistance.normalize();
                const otherRay = new Ray(position, otherDirection);
                return ray.intersectsSphere(otherRay, other.radius.length());
            });
            return blocked.length === 0;
        });
        // aggregate the information from the visible children by source so that there is only one LocaleInformation entry
        // for each physical source in the visible children
        const localeInformationsBySource = visibleChildrenWithoutObstructions.reduce((map, child) => {
            if(!child.source) return map;
            if(map.has(child.source)) {
                const info = map.get(child.source);
                if(info) {
                    info.polarity.absorb += child.polarity.absorb;
                    info.polarity.listen += child.polarity.listen;
                    info.polarity.execute += child.polarity.execute;
                    info.polarity.mediate += child.polarity.mediate;
                    info.polarity.emit += child.polarity.emit;
                }
            } else map.set(child, child);
            return map;
        });

        return Array.from(localeInformationsBySource.values());
    }
    getGlobalInformation(): LocaleInformation { // get the non-local information in the environment
        const info = new LocaleInformation(this.parent, this, new Vector3(0, 0, 0));
        this.children.forEach(child => {
            if(!child.source) return;
            if(child.source.isPhysical) { return; }
            info.polarity.absorb += child.polarity.absorb;
            info.polarity.listen += child.polarity.listen;
            info.polarity.execute += child.polarity.execute;
            info.polarity.mediate += child.polarity.mediate;
            info.polarity.emit += child.polarity.emit;
        });
        return info;
    }
    addLocality(info: Environment, position: Vector3, radius: Vector3) {
        const localeInfo = new LocaleInformation(this, info, radius);
        localeInfo.position = position;
        localeInfo.rotation = new Vector3(0, 0, 0);
        localeInfo.velocity = new Vector3(0, 0, 0);
        localeInfo.mass = 1;
        localeInfo.source = info;
        this.children.push(localeInfo);
        log(`added ${info} to ${this}`);
    }
    addLocaleInformation(info: LocaleInformation, position: Vector3, radius: Vector3) {
        this.children.push(info);
    }
    updateLocaleInformation(info: LocaleInformation) { // update the environment with the new information
        this.queue.push(info);
    }
    removeLocaleInformation(info: LocaleInformation) {
        const index = this.children.indexOf(info);
        if(index >= 0) {
            this.children.splice(index, 1);
        }
    }
    update() {
        this.queue.forEach(info => {
            // update the environment with the new information
            // update the children with the new information
            this.children.forEach(child => child.update());
        });
        this.queue = [];
    }
    clearQueue() {
        const info = this.information as LocaleInformation; 
        info.time = 0;
        info.polarity.absorb = 0;
        info.polarity.listen = 0;
        info.polarity.execute = 0;
        info.polarity.mediate = 0;
        info.polarity.emit = 0;
        this.queue = [];
    }

    on(event: string, eventHandler: Handler) {
        eventHandler.target = this;
        if(!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(eventHandler);
    }
    off(event: string, eventHandler: Handler) {
        eventHandler.target = null;
        if(this.eventHandlers[event]) {
            this.eventHandlers[event].splice(this.eventHandlers[event].indexOf(eventHandler), 1);
        }
    }
    once(event: string, eventHandler: Handler) {
        eventHandler.target = this;
        eventHandler.executeOnce = true;
        this.on(event, eventHandler);
    }
    toString() { 
        // show all information, then show local information, then show global information
        return this.information ? this.information.toString() + this.children.map(child => child.toString()).join('\n') : '';
    }
}
// the above export class has the following interface:
// - addLocality(info: Environment, position: Vector3, radius: Vector3)
// - addLocaleInformation(info: LocaleInformation, position: Vector3, radius: Vector3)
// - updateLocaleInformation(info: LocaleInformation)
// - removeLocaleInformation(info: LocaleInformation)
// - update()
// - clearQueue()
// - on(event: string, eventHandler: Handler)
// - off(event: string, eventHandler: Handler)
// - once(event: string, eventHandler: Handler)
// - toString()


export class Ray {
    constructor(public origin: Vector3, public direction: Vector3) {}
    intersectsSphere(ray: Ray, radius: number): boolean {
        const a = ray.direction.dot(ray.direction);
        const b = 2 * ray.direction.dot(ray.origin);
        const c = ray.origin.dot(ray.origin) - radius * radius;
        const discriminant = b * b - 4 * a * c;
        return discriminant >= 0;
    }
}
// the above export class has the following interface:
// - intersectsSphere(ray: Ray, radius: number): boolean


export class Locality extends Environment { 
    // a locality is a collection of information that is local to a specific position
    // and does not need to be propagated to the parent environment
    constructor(
        parent: Environment | undefined, 
        componentEnvs: Environment[], 
        public position: Vector3, 
        public velocity: Vector3, 
        public rotation: Vector3) {
        super(parent, parent ? parent.information : undefined);
        if(parent) {
            const info = parent.information as LocaleInformation;
            info.position = position;
            info.velocity = velocity;
            info.rotation = rotation;
            // remove componentEnvs from the parent environment and add them to this environment
            componentEnvs.forEach((componentEnv: any) => {
                const index = parent.children.indexOf(componentEnv);
                if(index >= 0) {
                    parent.children.splice(index, 1);
                }
                this.children.push(componentEnv);
            });
        }
    }
    get isPhysical() { return true; }
    get isVirtual() { return false; }
    set(position: Vector3, velocity: Vector3, rotation: Vector3) {
        const info = this.information as LocaleInformation;
        info.position = position;
        info.velocity = velocity;
        info.rotation = rotation;
    }
    update() {
        (this.information as LocaleInformation).time++;
    }
    clearQueue() {
        const info = this.information as LocaleInformation; 
        info.time = 0;
        info.polarity.absorb = 0;
        info.polarity.listen = 0;
        info.polarity.execute = 0;
        info.polarity.mediate = 0;
        info.polarity.emit = 0;
        this.queue = [];
    }
    toString() {
        return this.information ? this.information.toString() + this.children.map(child => child.toString()).join('\n') : '';
    }
    clone() {
        let o: any = [ ...this.children.map(e => e.source) ];
        return new Locality(this.parent, o, this.position, this.velocity, this.rotation);
    }
}
// the above export class has the following interface:
// - addLocality(info: Environment, position: Vector3, radius: Vector3)
// - addLocaleInformation(info: LocaleInformation, position: Vector3, radius: Vector3)
// - updateLocaleInformation(info: LocaleInformation)
// - removeLocaleInformation(info: LocaleInformation)
// - update()
// - clearQueue()
// - on(event: string, eventHandler: Handler)
// - off(event: string, eventHandler: Handler)
// - once(event: string, eventHandler: Handler)
// - toString()
// - clone()

export class Renderer {
    canvas: HTMLCanvasElement;
    env: Environment;
    x: CanvasRenderingContext2D | null;
    constructor(canvas: HTMLCanvasElement, env : Environment) {
        this.canvas = canvas;
        this.env = env;
        this.x = canvas.getContext('2d');
    }
    // raytrace the environment and render the visible objects
    render(position: Vector3, direction: Vector3, radius: Vector3) {
        const x = this.x;
        if(!x) { return; }
        x.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const ray = new Ray(position, direction);
        // get the visible objects from this perspective
        const localeInformations = this.env.getLocaleInformation(position, radius);
        localeInformations.forEach(info => {
            if(ray.intersectsSphere(ray, radius.x)) {
                // render the object
                x.beginPath();
                x.arc(info.position.x, info.position.y, 10, 0, 2 * Math.PI);
                x.fillStyle = 'red';
                x.fill();
                // render the object's children, scaling them all so that their positions and scales are relative to the parent
                if(info.source) info.source.children.forEach(child => {
                    const childInfo = child as LocaleInformation;
                    x.beginPath();
                    x.arc(childInfo.position.x, childInfo.position.y, 10, 0, 2 * Math.PI);
                    x.fillStyle = 'blue';
                    x.fill();
                });
            }
        });
    }
}
// the above export class has the following interface:
// - render(position: Vector3, direction: Vector3, radius: Vector3)


// log to the pre element, adding a newline then the string
function log(s: string) { console.log(s); }
