"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomDipoles = exports.Dipole = exports.Pole = exports.Listener = exports.Mediative = exports.Executive = exports.Absorber = exports.Emitter = exports.Emission = exports.Mediation = exports.Execution = exports.Listening = exports.Absorption = exports.LocalInformation = exports.Environment = void 0;
const vector3_1 = __importDefault(require("./vector3"));
class Environment {
    children() { return this._children; }
    constructor(parent, localInformations = [], globalInformation) {
        this.parent = parent;
        this.localInformations = localInformations;
        this.globalInformation = globalInformation;
        this._children = [];
        if (parent) {
            parent.children().push(this);
        }
    }
    absorb(local) {
        const absorption = new Absorption(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for (let child of this.children()) {
            const childAbsorption = child.absorb(local);
            absorption.add(childAbsorption);
        }
        return absorption;
    }
    listen(local) {
        const listening = new Listening(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for (let child of this.children()) {
            const childListening = child.listen(local);
            listening.add(childListening);
        }
        return listening;
    }
    execute(local) {
        const execution = new Execution(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for (let child of this.children()) {
            const childExecution = child.execute(local);
            execution.add(childExecution);
        }
        return execution;
    }
    mediate(local) {
        const mediation = new Mediation(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for (let child of this.children()) {
            const childMediation = child.mediate(local);
            mediation.add(childMediation);
        }
        return mediation;
    }
    emit(local) {
        const emission = new Emission(this.parent, this.globalInformation.position, this.globalInformation.velocity);
        for (let child of this.children()) {
            const childEmission = child.emit(local);
            emission.add(childEmission);
        }
        return emission;
    }
    getLocalInformation(position, velocity) {
        // get the local information from the point of view of the local information
        const localInformation = new LocalInformation(this.parent, position, velocity);
        for (let child of this.children()) {
            const childLocalInformation = child.getLocalInformation(position, velocity);
            localInformation.add(childLocalInformation);
        }
        return localInformation;
    }
    getGlobalInformation() {
        return this.globalInformation;
    }
    getVisibleObjects(local, position, velocity) {
        // get the visible objects from the point od view of the local information
        const visibleObjects = [];
        for (let child of this.children()) {
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
        for (let visibleObject of visibleObjects) {
            let blocked = false;
            for (let visibleObjectFiltered of visibleObjectsFiltered) {
                if (visibleObjectFiltered.position.distanceTo(local.position) < visibleObject.position.distanceTo(local.position)) {
                    blocked = true;
                    break;
                }
            }
            if (!blocked) {
                visibleObjectsFiltered.push(visibleObject);
            }
        }
        return visibleObjectsFiltered;
    }
}
exports.Environment = Environment;
class LocalInformation {
    constructor(parent, position, velocity) {
        this.parent = parent;
        this.position = position;
        this.velocity = velocity;
        this.source = parent;
        this.visibleObjects = [];
        this.infoType = 'emitter';
        this.visibleObjects = parent ? parent.getVisibleObjects(this, position, velocity) : [];
    }
    distanceTo(local) { return this.position.distanceTo(local.position); }
    angleTo(local) { return this.position.angleTo(local.position); }
    directionTo(local) { return this.position.directionTo(local.position); }
    velocityTo(local) { return this.velocity.directionTo(local.velocity); }
    add(local) { this.visibleObjects.push(local); }
    subtract(local) { this.visibleObjects = this.visibleObjects.filter((visibleObject) => visibleObject !== local); }
    convert(toType) {
        switch (toType.infoType) {
            case 'absorptive': return new Absorber(this.parent, this.visibleObjects, toType);
            case 'absorption': return new Absorption(this.parent, this.position, this.velocity);
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
    update() {
        this.visibleObjects = this.parent ? this.parent.getVisibleObjects(this, this.position, this.velocity) : [];
        this.infoValue = this.visibleObjects.length;
    }
    value() {
        this.update();
        return this.infoValue;
    }
}
exports.LocalInformation = LocalInformation;
class Absorption extends LocalInformation {
    constructor(parent, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.position = position;
        this.velocity = velocity;
    }
    listen(local) { return local; }
    add(absorption) { this.infoValue += absorption.infoValue; }
}
exports.Absorption = Absorption;
class Listening extends LocalInformation {
    constructor(parent, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.position = position;
        this.velocity = velocity;
    }
    execute(local) { return local; }
}
exports.Listening = Listening;
class Execution extends LocalInformation {
    constructor(parent, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.position = position;
        this.velocity = velocity;
    }
    mediate(local) { return local; }
}
exports.Execution = Execution;
class Mediation extends LocalInformation {
    constructor(parent, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.position = position;
        this.velocity = velocity;
    }
    emit(local) { return local; }
}
exports.Mediation = Mediation;
class Emission extends LocalInformation {
    constructor(parent, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.position = position;
        this.velocity = velocity;
    }
    emit(local) { return local; }
    add(emission) { this.infoValue += emission.infoValue; }
}
exports.Emission = Emission;
// an emitter is an environment that emits information. emissive, radiative, listener, mediative, executive are all types of emitters.
class Emitter extends Environment {
    constructor(parent, informations, information) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    emit(local) {
        const emission = new Emission(this, local.position, local.velocity);
        emission.infoValue = local;
        return emission;
    }
}
exports.Emitter = Emitter;
// an absorber is an environment that absorbs information. absorptive, radiative, listener, mediative, executive are all types of absorbers.
class Absorber extends Environment {
    constructor(parent, informations, information) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    absorb(local) {
        const absorption = new Absorption(this, local.position, local.velocity);
        absorption.infoValue = local;
        return absorption;
    }
}
exports.Absorber = Absorber;
class Executive extends Environment {
    constructor(parent, informations, information) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    execute(local) {
        const execution = new Execution(this, local.position, local.velocity);
        execution.infoValue = local;
        return execution;
    }
}
exports.Executive = Executive;
class Mediative extends Environment {
    constructor(parent, informations, information) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    mediate(local) {
        const mediation = new Mediation(this, local.position, local.velocity);
        mediation.infoValue = local;
        return mediation;
    }
}
exports.Mediative = Mediative;
class Listener extends Environment {
    constructor(parent, informations, information) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    listen(local) {
        const listening = new Listening(this, local.position, local.velocity);
        listening.infoValue = local;
        return listening;
    }
}
exports.Listener = Listener;
class Pole extends Environment {
    constructor(parent, localInformations, globalInformation) {
        super(parent, localInformations, globalInformation);
        this.parent = parent;
        this.localInformations = localInformations;
        this.globalInformation = globalInformation;
        this.absorber = new Absorber(parent, localInformations, globalInformation);
        this.listener = new Listener(parent, localInformations, globalInformation);
        this.executor = new Executive(parent, localInformations, globalInformation);
        this.mediator = new Mediative(parent, localInformations, globalInformation);
        this.radiator = new Emitter(parent, localInformations, globalInformation);
    }
    getglobalInformation() {
        return this.getLocalInformation(this.globalInformation.position, this.globalInformation.velocity);
    }
    absorb(local) { return this.absorber.absorb(local); }
    listen(local) { return this.listener.listen(local); }
    execute(local) { return this.executor.execute(local); }
    mediate(local) { return this.mediator.mediate(local); }
    emit(local) { return this.radiator.emit(local); }
    getLocalInformation(position, velocity) {
        let localInformation = new LocalInformation(this, position, velocity);
        localInformation = this.absorber.absorb(localInformation);
        localInformation = this.listener.listen(localInformation);
        localInformation = this.executor.execute(localInformation);
        localInformation = this.mediator.mediate(localInformation);
        localInformation = this.radiator.emit(localInformation);
        return localInformation;
    }
    update() { this.globalInformation = this.getglobalInformation(); }
    updateLocalInformation(localInformation) {
        this.localInformations.push(localInformation);
        this.update();
    }
}
exports.Pole = Pole;
class Dipole extends Pole {
    constructor(parent, localInformations, globalInformation) {
        super(parent, localInformations, globalInformation);
        this.parent = parent;
        this.localInformations = localInformations;
        this.globalInformation = globalInformation;
    }
    getLocalInformation(position, velocity) {
        let localInformation = new LocalInformation(this, position, velocity);
        localInformation = this.absorber.absorb(localInformation);
        localInformation = this.listener.listen(localInformation);
        localInformation = this.executor.execute(localInformation);
        localInformation = this.mediator.mediate(localInformation);
        localInformation = this.radiator.emit(localInformation);
        return localInformation;
    }
}
exports.Dipole = Dipole;
function randomDipoles(environment, maxX, maxY, maxZ, randomVal) {
    // add several local informations
    for (let x = 0; x < maxX; x++) {
        // add local informations to the dipole
        for (let y = 0; y < maxY; y++) {
            for (let z = 0; z < maxZ; z++) {
                if (Math.random() > randomVal) {
                    continue;
                }
                // create a dipole 
                const dipole = new Dipole(environment, [], new LocalInformation(environment, new vector3_1.default(x, y, z), new vector3_1.default(x, y, z)));
                const localInformation = new LocalInformation(dipole, new vector3_1.default(x, y, z), new vector3_1.default(x, y, z));
                dipole.updateLocalInformation(localInformation);
            }
        }
    }
}
exports.randomDipoles = randomDipoles;
