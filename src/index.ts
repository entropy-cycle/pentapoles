import Vector3 from './vector3';

export class Environment {
    _children: Environment[] = [];
    children(): Environment[] { return this._children; }
    constructor(public parent: Environment | null, public localInformations: LocalInformation[] = [], public globalInformation: LocalInformation) {
        if(parent) { parent.children().push(this); }
    }
    absorb(local: LocalInformation): Absorption {
        const absorption = new Absorption(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for(let child of this.children()) {
            const childAbsorption = child.absorb(local);
            absorption.add(childAbsorption);
        }
        return absorption;
    }
    listen(local: LocalInformation): Listening {
        const listening = new Listening(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for(let child of this.children()) {
            const childListening = child.listen(local);
            listening.add(childListening);
        }
        return listening;
    }
    execute(local: LocalInformation): Execution {
        const execution = new Execution(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for(let child of this.children()) {
            const childExecution = child.execute(local);
            execution.add(childExecution);
        }
        return execution;
    }
    mediate(local: LocalInformation): Mediation {
        const mediation = new Mediation(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for(let child of this.children()) {
            const childMediation = child.mediate(local);
            mediation.add(childMediation);
        }
        return mediation;
    }
    emit(local: LocalInformation): Emission {
        const emission = new Emission(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for(let child of this.children()) {
            const childEmission = child.emit(local);
            emission.add(childEmission);
        }
        return emission;
    }
    getLocalInformation(position: Vector3, velocity: Vector3): LocalInformation {
        // get the local information from the point of view of the local information
        const localInformation = new LocalInformation(this.parent, position, velocity);
        for(let child of this.children()) {
            const childLocalInformation = child.getLocalInformation(position, velocity);
            localInformation.add(childLocalInformation);
        }
        return localInformation;
    }
    getGlobalInformation(): LocalInformation {
        return this.globalInformation;
    }
    getVisibleObjects(local: LocalInformation, position: Vector3, velocity: Vector3): LocalInformation[] {
        // get the visible objects from the point od view of the local information
        const visibleObjects = [];
        for(let child of this.children()) {
            const childVisibleObjects = child.getVisibleObjects(local, position, velocity);
            visibleObjects.push(...childVisibleObjects);
        }
        // sort the visible objects by distance
        visibleObjects.sort((a, b) => {
            const distanceA = a.position.distanceTo(local.position);
            const distanceB = b.position.distanceTo(local.position);
            return distanceA - distanceB;
        });
        // filter out items that are blocked by other items from the point of view of the local information
        const visibleObjectsFiltered = [];
        for(let visibleObject of visibleObjects) {
            let blocked = false;
            for(let visibleObjectFiltered of visibleObjectsFiltered) {
                if(visibleObjectFiltered.position.distanceTo(local.position) < visibleObject.position.distanceTo(local.position)) {
                    blocked = true;
                    break;
                }
            }
            if(!blocked) { visibleObjectsFiltered.push(visibleObject); }
        }
        return visibleObjectsFiltered;
    }
}

export type infoType = 'emitter' | 'emission' | 'absorptive' | 'absorption' | 'radiative' | 'radiation' | 'listener' | 'listening' | 'mediative' | 'mediation' | 'executive' | 'execution';

export class LocalInformation {
    infoType: infoType; // the type of information
    infoValue: any; // the value of the information - this is usually a vector or a number
    source: any; // if the source is null, then the source is the environment.
    visibleObjects: LocalInformation[];
    constructor(public parent: Environment| null, public position: Vector3, public velocity: Vector3) { 
        this.source = parent;
        this.visibleObjects = [];
        this.infoType = 'emitter';
        this.visibleObjects = parent ? parent.getVisibleObjects(this, position, velocity) : [];
    }
    distanceTo(local: LocalInformation): number { return this.position.distanceTo(local.position); }
    angleTo(local: LocalInformation): number { return this.position.angleTo(local.position); }
    directionTo(local: LocalInformation): Vector3 { return this.position.directionTo(local.position); }
    velocityTo(local: LocalInformation): Vector3 { return this.velocity.directionTo(local.velocity); }
    add(local: LocalInformation): void { this.visibleObjects.push(local); }
    subtract(local: LocalInformation): void { this.visibleObjects = this.visibleObjects.filter((visibleObject) => visibleObject !== local); }
    convert(toType: LocalInformation): any {
        switch(toType.infoType) {
            case 'absorptive': return new Absorber(this.parent, this.visibleObjects, toType);
            case 'absorption': return new Absorption(this.parent, this.position, this.velocity)
            case 'listener': return new Listener(this.parent, this.visibleObjects, toType);
            case 'listening': return new Listening(this.parent, this.position, this.velocity);
            case 'executive': return new Executive(this.parent, this.visibleObjects, toType);
            case 'execution': return new Execution(this.parent, this.position, this.velocity);
            case 'mediative': return new Mediative(this.parent, this.visibleObjects, toType);
            case 'mediation': return new Mediation(this.parent, this.position, this.velocity);
            case 'emitter': return new Emitter(this.parent, this.visibleObjects, toType);
            case 'emission': return new Emission(this.parent, this.position, this.velocity);
        }
    }
    update(): void {
        this.visibleObjects = this.parent ? this.parent.getVisibleObjects(this, this.position, this.velocity) : [];
        this.infoValue = this.visibleObjects.length;
    }
    value(): any { 
        this.update();
        return this.infoValue; 
    }
}

export class Absorption extends LocalInformation {
    constructor(public parent: Environment | null, public position: Vector3, public velocity: Vector3) { super(parent, position, velocity); }
    listen(local: LocalInformation | null): LocalInformation | null{ return local; }
    add(absorption: Absorption) { this.infoValue += absorption.infoValue; }
}

export class Listening extends LocalInformation {
    constructor(public parent: Environment| null, public position: Vector3, public velocity: Vector3) { super(parent, position, velocity); }
    execute(local: LocalInformation | null): LocalInformation | null{ return local; }
}

export class Execution extends LocalInformation {
    constructor(public parent: Environment| null, public position: Vector3, public velocity: Vector3) { super(parent, position, velocity); }
    mediate(local: LocalInformation | null): LocalInformation | null{ return local; }
}

export class Mediation extends LocalInformation {
    constructor(public parent: Environment| null, public position: Vector3, public velocity: Vector3) { super(parent, position, velocity); }
    emit(local: LocalInformation | null): LocalInformation | null{ return local; }
}

export class Emission extends LocalInformation {
    constructor(public parent: Environment | null, public position: Vector3, public velocity: Vector3) { super(parent, position, velocity); }
    emit(local: LocalInformation): LocalInformation | null{ return local; }
    add(emission: Emission) { this.infoValue += emission.infoValue; }
}

// an emitter is an environment that emits information. emissive, radiative, listener, mediative, executive are all types of emitters.
export class Emitter extends Environment {
    constructor(public parent: Environment | null, public informations: LocalInformation[], public information: LocalInformation) { super(parent, informations, information); }
    emit(local: LocalInformation): Emission {
        const emission = new Emission(this, local.position, local.velocity);
        emission.infoValue = local;
        return emission;
    }
}

// an absorber is an environment that absorbs information. absorptive, radiative, listener, mediative, executive are all types of absorbers.
export class Absorber extends Environment {
    constructor(public parent: Environment | null, public informations: LocalInformation[], public information: LocalInformation) { super(parent, informations, information); }
    absorb(local: LocalInformation): Absorption {
        const absorption = new Absorption(this, local.position, local.velocity);
        absorption.infoValue = local;
        return absorption;
    }
}

export class Executive extends Environment {
    constructor(public parent: Environment | null, public informations: LocalInformation[], public information: LocalInformation) { super(parent, informations, information); }
    execute(local: LocalInformation): Execution {
        const execution = new Execution(this, local.position, local.velocity);
        execution.infoValue = local;
        return execution;
    }
}

export class Mediative extends Environment {
    constructor(public parent: Environment | null, public informations: LocalInformation[], public information: LocalInformation) { super(parent, informations, information); }
    mediate(local: LocalInformation): Mediation {
        const mediation = new Mediation(this, local.position, local.velocity);
        mediation.infoValue = local;
        return mediation;
    }
}

export class Listener extends Environment {
    constructor(public parent: Environment | null, public informations: LocalInformation[], public information: LocalInformation) { super(parent, informations, information); }
    listen(local: LocalInformation): Listening {
        const listening = new Listening(this, local.position, local.velocity);
        listening.infoValue = local;
        return listening;
    }
}

export class Pole extends Environment {
    absorber: Absorber;
    listener: Listener;
    executor: Executive
    mediator: Mediative
    radiator: Emitter;
    constructor(public parent: Environment, public localInformations: LocalInformation[], public globalInformation: LocalInformation) {
        super(
            parent,
            localInformations,
            globalInformation
        );
        this.absorber = new Absorber(parent, localInformations, globalInformation);
        this.listener = new Listener(parent, localInformations, globalInformation);
        this.executor = new Executive(parent, localInformations, globalInformation);
        this.mediator = new Mediative(parent, localInformations, globalInformation);
        this.radiator = new Emitter(parent, localInformations, globalInformation);
    }
    getglobalInformation(): LocalInformation {
        return this.getLocalInformation(this.globalInformation.position, this.globalInformation.velocity);
    }
    absorb(local: LocalInformation): Absorption { return this.absorber.absorb(local); }
    listen(local: LocalInformation): Listening { return this.listener.listen(local); }
    execute(local: LocalInformation): Execution { return this.executor.execute(local); }
    mediate(local: LocalInformation): Mediation { return this.mediator.mediate(local); }
    emit(local: LocalInformation): Emission { return this.radiator.emit(local); }
    getLocalInformation(position: Vector3, velocity: Vector3): LocalInformation {
        let localInformation = new LocalInformation(this, position, velocity);
        localInformation = this.absorber.absorb(localInformation);
        localInformation = this.listener.listen(localInformation);
        localInformation = this.executor.execute(localInformation);
        localInformation = this.mediator.mediate(localInformation);
        localInformation = this.radiator.emit(localInformation);
        return localInformation;
    }
    update() { this.globalInformation = this.getglobalInformation(); }
    updateLocalInformation(localInformation: LocalInformation) {
        this.localInformations.push(localInformation);
        this.update();
    }
}

export class Dipole extends Pole {
    constructor(public parent: Environment, public localInformations: LocalInformation[], public globalInformation: LocalInformation) {
        super(
            parent,
            localInformations,
            globalInformation
        );
    }
    getLocalInformation(position: Vector3, velocity: Vector3): LocalInformation {
        let localInformation = new LocalInformation(this, position, velocity);
        localInformation = this.absorber.absorb(localInformation);
        localInformation = this.listener.listen(localInformation);
        localInformation = this.executor.execute(localInformation);
        localInformation = this.mediator.mediate(localInformation);
        localInformation = this.radiator.emit(localInformation);
        return localInformation;
    }
}

export function randomDipoles(environment: Environment, maxX: number, maxY: number, maxZ: number, randomVal: number) {
    // add several local informations
    for(let x = 0; x < maxX; x++) {
        // add local informations to the dipole
        for(let y = 0; y < maxY; y++) {
            for(let z = 0; z < maxZ; z++) {
                if(Math.random() > randomVal) {  continue }
                // create a dipole 
                const dipole = new Dipole(environment, [], new LocalInformation(environment, new Vector3(x, y, z), new Vector3(x, y, z)));
                const localInformation = new LocalInformation(dipole, new Vector3(x, y, z), new Vector3(x, y, z));
                dipole.updateLocalInformation(localInformation);
            }
        }
    }

}
