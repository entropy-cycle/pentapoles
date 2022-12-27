"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomDipoles = exports.Dipole = exports.Pole = exports.Emission = exports.Emitter = exports.Mediation = exports.Mediative = exports.Execution = exports.Executive = exports.Listening = exports.Listener = exports.Absorption = exports.Absorber = exports.LocalInformation = exports.Environment = void 0;
class Environment {
    children() { return this._children; }
    constructor(parent, localInformations = [], globalInformation) {
        this.parent = parent;
        this.localInformations = localInformations;
        this.globalInformation = globalInformation;
        this._children = [];
        if (parent) {
            parent.source.children().push(this);
        }
    }
    getGlobalInformation() { return this.globalInformation; }
    absorb(local) { return [new Absorption(this.parent, local.source, this.globalInformation.position, this.globalInformation.velocity)]; }
    listen(local) { return [new Listening(this.parent, local.source, this.globalInformation.position, this.globalInformation.velocity)]; }
    execute(local) { return [new Execution(this.parent, local.source, this.globalInformation.position, this.globalInformation.velocity)]; }
    mediate(local) { return [new Mediation(this.parent, local.source, this.globalInformation.position, this.globalInformation.velocity)]; }
    emit(local) { return [new Emission(this.parent, local.source, this.globalInformation.position, this.globalInformation.velocity)]; }
    getLocalInformation(position, velocity) {
        const localInformation = new LocalInformation(this.parent ? this.parent.source.getGlobalInformation() : null, position, velocity);
        for (let child of localInformation.visibleObjects) {
            localInformation.add(child);
        }
        return localInformation;
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
    toString() {
        const our = `Environment: ${this.globalInformation.infoType} ${this.globalInformation.infoValue} ${this.globalInformation.position} ${this.globalInformation.velocity} ${this.globalInformation.source} ${this.globalInformation.visibleObjects.length} ${this.globalInformation.visibleObjects.map((visibleObject) => visibleObject.infoType).join(' ')}\n`;
        const children = this.children().map((child) => child.toString()).join("\n");
        return our + children;
    }
    clone() {
        const clone = new Environment(this.parent, this.localInformations, this.globalInformation);
        for (let child of this.children()) {
            clone.children().push(child.clone());
        }
        return clone;
    }
}
exports.Environment = Environment;
class LocalInformation {
    constructor(parent, position, velocity) {
        this.parent = parent;
        this.position = position;
        this.velocity = velocity;
        this.source = parent ? parent.source : null;
        this.visibleObjects = [];
        this.infoType = 'emitter';
        this.visibleObjects = parent ? parent.source ? parent.source.getVisibleObjects(this, position, velocity) : parent.visibleObjects : [];
    }
    distanceTo(local) { return this.position.distanceTo(local.position); }
    angleTo(local) { return this.position.angleTo(local.position); }
    directionTo(local) { return this.position.directionTo(local.position); }
    velocityTo(local) { return this.velocity.directionTo(local.velocity); }
    add(local) { this.visibleObjects.push(local); }
    subtract(local) { this.visibleObjects = this.visibleObjects.filter((visibleObject) => visibleObject !== local); }
    convert(toType) {
        const source = this.source ? this.source : this;
        switch (toType) {
            case 'absorber': return new Absorber(source, this.visibleObjects, this);
            case 'absorption': return new Absorption(this.parent, source, this.position, this.velocity);
            case 'listener': return new Listener(source, this.visibleObjects, this);
            case 'listening': return new Listening(this.parent, source, this.position, this.velocity);
            case 'executive': return new Executive(source, this.visibleObjects, this);
            case 'execution': return new Execution(this.parent, source, this.position, this.velocity);
            case 'mediative': return new Mediative(source, this.visibleObjects, this);
            case 'mediation': return new Mediation(this.parent, source, this.position, this.velocity);
            case 'emitter': return new Emitter(source, this.visibleObjects, this);
            case 'emission': return new Emission(this.parent, source, this.position, this.velocity);
        }
    }
    update() {
        this.visibleObjects = this.parent
            ? this.parent.source
                ? this.parent.source.getVisibleObjects(this, this.position, this.velocity) : this.parent.visibleObjects : [];
        this.infoValue = this.visibleObjects.length;
    }
    value() {
        this.update();
        return this.infoValue;
    }
    toString() {
        return `${this.infoType} ${this.infoValue} ${this.position} ${this.velocity} ${this.source} ${this.visibleObjects.length} ${this.visibleObjects.map((visibleObject) => visibleObject.infoType).join(' ')}`;
    }
    clone() {
        const clone = new LocalInformation(this.parent, this.position, this.velocity);
        clone.infoType = this.infoType;
        clone.infoValue = this.infoValue;
        clone.source = this.source;
        clone.visibleObjects = this.visibleObjects;
        return clone;
    }
}
exports.LocalInformation = LocalInformation;
// Absorber -> Absorption -> Listener -> Listening -> Executive -> Execution -> Mediative -> Mediation -> Emitter -> Emission -< Absorber ...
// an absorber is an environment that absorbs information. absorptive poles absorb Emission and emit Absorption
class Absorber extends Environment {
    constructor(parent, informations, information) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    absorb(local) {
        // attract the local information to the absorber and then absorb it
        local.position = this.information.position;
        local.velocity = this.information.velocity;
        const visibleObjects = local.visibleObjects;
        local.visibleObjects = visibleObjects;
        // if the absorber is local, then the absorption is global. If the absorber is global, then the absorption is local.
        const absorberIsLocal = local.source !== undefined;
        if (absorberIsLocal) { // local absorber's output is global - thus, the absorption is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("absorption")]; // if there is no parent, then the absorption is global
            } // if there is no parent, then the absorption is global
            return this.parent.source.absorb(local.convert("emission")); // if there is a parent, then the absorption is local
        }
        // else the absorber is global, so the absorption is local, meaning it is emitted by all absorbers as local information
        // iterate through the visible objects and attract the appropriate information to the absorber
        const emissions = visibleObjects.filter((visibleObject) => visibleObject.infoType === 'emission');
        const absorbedEmissions = emissions.map((emission) => {
            const e = emission.clone();
            e.position = this.information.position.clone();
            e.velocity = this.information.velocity.clone();
            return e;
        });
        const absorptions = [], absorbedEmns = [];
        for (const emission1 of absorbedEmissions) {
            for (const emission2 of emissions) {
                if (emission1 === emission2) {
                    continue;
                }
                const distance = emission1.distanceTo(emission2);
                const direction = emission1.directionTo(emission2);
                const force = this.information.value() * emission1.value() * emission2.value() / distance;
                const acceleration = force / emission1.value();
                emission1.velocity = emission1.velocity.add(direction.multiplyScalar(acceleration));
                emission2.velocity = emission2.velocity.sub(direction.multiplyScalar(acceleration));
                // if the emission2 are colliding, then emit a local absorption
                if (distance < 1) {
                    emission2.add(emission1);
                    absorptions.push(this._doAbsorption(emission2, emission2.position, emission2.velocity));
                    absorbedEmns.push(emission2);
                }
            }
        }
        // remove the absorbed emissions from the visible objects
        for (const absorbedEmn of absorbedEmns) {
            const index = visibleObjects.indexOf(absorbedEmn);
            if (index > -1) {
                visibleObjects.splice(index, 1);
            }
        }
        // emit the local absorptions
        for (const emission of visibleObjects) {
            if (emission.infoType === 'emission') {
                absorptions.push(this._doAbsorption(emission, emission.position, emission.velocity));
            }
        }
        // return the absorption
        return absorptions;
    }
    // actually do the absorption
    _doAbsorption(emission, position, velocity) {
        const absorption = emission.convert("absorption");
        absorption.position = position;
        absorption.velocity = velocity;
        return absorption;
    }
    clone() {
        const clone = new Absorber(this.parent, this.informations, this.information);
        clone.parent = this.parent;
        clone.informations = this.informations;
        clone.information = this.information;
        return clone;
    }
}
exports.Absorber = Absorber;
class Absorption extends LocalInformation {
    constructor(parent, self, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.self = self;
        this.position = position;
        this.velocity = velocity;
        this.infoType = 'absorption';
        this.infoValue = 0;
        // if the absorber is local, then the absorption is global. If the absorber is global, then the absorption is local.
        // if the absorber is a dipole, then the absorption is monopolar (for example: a speaker absorbs sound, which is monopolar)
        // if the absorber is a monopole, then the absorption is dipolar (for example: a microphone absorbs sound, which is dipolar)
        if (this.parent) {
            this.infoValue = self.value();
        }
    }
    add(absorption) { this.infoValue += absorption.infoValue; }
    clone() {
        const clone = new Absorption(this.parent, this.self, this.position, this.velocity);
        clone.parent = this.parent;
        clone.position = this.position;
        clone.velocity = this.velocity;
        clone.infoType = this.infoType;
        clone.infoValue = this.infoValue;
        clone.source = this.source;
        clone.visibleObjects = this.visibleObjects;
        return clone;
    }
}
exports.Absorption = Absorption;
class Listener extends Environment {
    constructor(parent, informations, information) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    listen(local) {
        // attract the local information to the listener and then listen to it
        local.position = this.information.position;
        local.velocity = this.information.velocity;
        const visibleObjects = local.visibleObjects;
        local.visibleObjects = visibleObjects;
        // if the listener is local, then the listening is global. If the listener is global, then the listening is local.
        const listenerIsLocal = local.source !== undefined;
        if (listenerIsLocal) { // local listener's output is global - thus, the listening is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("listening")]; // if there is no parent, then the listening is global
            } // if there is no parent, then the listening is global
            return this.parent.source.listen(local.convert("emission")); // if there is a parent, then the listening is local
        }
        // else the listener is global, so the listening is local, meaning it is emitted by all listeners as local information
        // iterate through the visible objects and attract the appropriate information to the listener
        const absorptions = visibleObjects.filter((visibleObject) => visibleObject.infoType === 'absorption');
        const listenedAbsorptions = absorptions.map((absorption) => {
            const a = absorption.clone();
            a.position = this.information.position.clone();
            a.velocity = this.information.velocity.clone();
            return a;
        });
        const listenings = [], listenedAbs = [];
        for (const absorption1 of listenedAbsorptions) {
            for (const absorption2 of absorptions) {
                if (absorption1 === absorption2) {
                    continue;
                }
                const distance = absorption1.distanceTo(absorption2);
                const direction = absorption1.directionTo(absorption2);
                const force = this.information.value() * absorption1.value() * absorption2.value() / distance;
                const acceleration = force / absorption1.value();
                absorption1.velocity = absorption1.velocity.add(direction.multiplyScalar(acceleration));
                absorption2.velocity = absorption2.velocity.sub(direction.multiplyScalar(acceleration));
                // if the absorption2 are colliding, then emit a local listening
                if (distance < 1) {
                    absorption2.add(absorption1);
                    listenings.push(this._doListening(absorption2, absorption2.position, absorption2.velocity));
                    listenedAbs.push(absorption2);
                }
            }
        }
        // remove the listened absorptions
        for (const listenedAbsorption of listenedAbs) {
            const index = absorptions.indexOf(listenedAbsorption);
            absorptions.splice(index, 1);
        }
        // emit the remaining absorptions as global listenings
        for (const absorption of absorptions) {
            listenings.push(this._doListening(absorption, absorption.position, absorption.velocity));
        }
        // return the listening
        return listenings;
    }
    // actually do the listening
    _doListening(emission, position, velocity) {
        const listening = emission.convert("listening");
        listening.position = position;
        listening.velocity = velocity;
        return listening;
    }
    clone() {
        const clone = new Listener(this.parent, this.informations, this.information);
        clone.parent = this.parent;
        clone.informations = this.informations;
        clone.information = this.information;
        return clone;
    }
}
exports.Listener = Listener;
class Listening extends LocalInformation {
    constructor(parent, self, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.self = self;
        this.position = position;
        this.velocity = velocity;
        this.infoType = 'listening';
        this.infoValue = 0;
        // if the listener is local, then the listening is global. If the listener is global, then the listening is local.
        // if the listener is a dipole, then the listening is monopolar (for example: a speaker listens to sound, which is monopolar)
        // if the listener is a monopole, then the listening is dipolar (for example: a microphone listens to sound, which is dipolar)
        if (this.parent) {
            this.infoValue = self.value();
        }
    }
    add(listening) { this.infoValue += listening.infoValue; }
    clone() {
        const clone = new Listening(this.parent, this.self, this.position, this.velocity);
        clone.parent = this.parent;
        clone.position = this.position;
        clone.velocity = this.velocity;
        clone.infoType = this.infoType;
        clone.infoValue = this.infoValue;
        clone.source = this.source;
        clone.visibleObjects = this.visibleObjects;
        return clone;
    }
}
exports.Listening = Listening;
class Executive extends Environment {
    constructor(parent, informations, information) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    execute(local) {
        // attract the local information to the executive and then execute it
        local.position = this.information.position;
        local.velocity = this.information.velocity;
        const visibleObjects = local.visibleObjects;
        local.visibleObjects = visibleObjects;
        // if the executive is local, then the execution is global. If the executive is global, then the execution is local.
        const executiveIsLocal = local.source !== undefined;
        if (executiveIsLocal) { // local executive's output is global - thus, the execution is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("execution")]; // if there is no parent, then the execution is global
            } // if there is no parent, then the execution is global
            return this.parent.source.execute(local.convert("emission")); // if there is a parent, then the execution is local
        }
        // else the executive is global, so the execution is local, meaning it is emitted by all executives as local information
        // iterate through the visible objects and attract the appropriate information to the executive
        const listenings = visibleObjects.filter((visibleObject) => visibleObject.infoType === 'listening');
        const absorbedListenings = listenings.map((listening) => {
            const l = listening.clone();
            l.position = this.information.position.clone();
            l.velocity = this.information.velocity.clone();
            return l;
        });
        const executions = [], absorbedLis = [];
        for (const listening1 of absorbedListenings) {
            for (const listening2 of listenings) {
                if (listening1 === listening2) {
                    continue;
                }
                const distance = listening1.distanceTo(listening2);
                const direction = listening1.directionTo(listening2);
                const force = this.information.value() * listening1.value() * listening2.value() / distance;
                const acceleration = force / listening1.value();
                listening1.velocity = listening1.velocity.add(direction.multiplyScalar(acceleration));
                listening2.velocity = listening2.velocity.sub(direction.multiplyScalar(acceleration));
                // if the listening2 are colliding, then emit a local execution
                if (distance < 1) {
                    listening2.add(listening1);
                    executions.push(this._doExecution(listening2, listening2.position, listening2.velocity));
                    absorbedLis.push(listening2);
                }
            }
        }
        // remove the absorbed listenings
        for (const absorbedLi of absorbedLis) {
            const index = listenings.indexOf(absorbedLi);
            if (index > -1) {
                listenings.splice(index, 1);
            }
        }
        // emit the remaining listenings as global executions
        for (const listening of listenings) {
            executions.push(this._doExecution(listening, listening.position, listening.velocity));
        }
        // return the execution
        return executions;
    }
    // actually do the execution
    _doExecution(listening, position, velocity) {
        const execution = listening.convert("execution");
        execution.position = position;
        execution.velocity = velocity;
        return execution;
    }
    clone() {
        const clone = new Executive(this.parent, this.informations, this.information);
        clone.parent = this.parent;
        clone.informations = this.informations;
        clone.information = this.information;
        return clone;
    }
}
exports.Executive = Executive;
class Execution extends LocalInformation {
    constructor(parent, self, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.self = self;
        this.position = position;
        this.velocity = velocity;
        this.infoType = 'execution';
        this.infoValue = 0;
        // if the executive is local, then the execution is global. If the executive is global, then the execution is local.
        // if the executive is a dipole, then the execution is monopolar (for example: a speaker executes sound, which is monopolar)
        // if the executive is a monopole, then the execution is dipolar (for example: a microphone executes sound, which is dipolar)
        if (this.parent) {
            this.infoValue = self.value();
        }
    }
    add(execution) { this.infoValue += execution.infoValue; }
    clone() {
        const clone = new Execution(this.parent, this.self, this.position, this.velocity);
        clone.parent = this.parent;
        clone.position = this.position;
        clone.velocity = this.velocity;
        clone.infoType = this.infoType;
        clone.infoValue = this.infoValue;
        clone.source = this.source;
        clone.visibleObjects = this.visibleObjects;
        return clone;
    }
}
exports.Execution = Execution;
class Mediative extends Environment {
    constructor(parent, informations, information) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    mediate(local) {
        // attract the local information to the mediative and then execute it
        local.position = this.information.position;
        local.velocity = this.information.velocity;
        const visibleObjects = local.visibleObjects;
        local.visibleObjects = visibleObjects;
        // if the mediative is local, then the mediation is global. If the mediative is global, then the mediation is local.
        const mediativeIsLocal = local.source !== undefined;
        if (mediativeIsLocal) { // local mediative's output is global - thus, the mediation is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("mediation")]; // if there is no parent, then the mediation is global
            } // if there is no parent, then the mediation is global
            return this.parent.source.mediate(local.convert("emission")); // if there is a parent, then the mediation is local
        }
        // else the mediative is global, so the mediation is local, meaning it is emitted by all mediatives as local information
        // iterate through the visible objects and attract the appropriate information to the mediative
        const listenings = visibleObjects.filter((visibleObject) => visibleObject.infoType === 'listening');
        const absorbedListenings = listenings.map((listening) => {
            const l = listening.clone();
            l.position = this.information.position.clone();
            l.velocity = this.information.velocity.clone();
            return l;
        });
        const mediations = [], absorbedLis = [];
        for (const listening1 of absorbedListenings) {
            for (const listening2 of listenings) {
                if (listening1 === listening2) {
                    continue;
                }
                const distance = listening1.distanceTo(listening2);
                const direction = listening1.directionTo(listening2);
                const force = this.information.value() * listening1.value() * listening2.value() / distance;
                const acceleration = force / listening1.value();
                listening1.velocity = listening1.velocity.add(direction.multiplyScalar(acceleration));
                listening2.velocity = listening2.velocity.sub(direction.multiplyScalar(acceleration));
                // if the listening2 are colliding, then emit a local mediation
                if (distance < 1) {
                    listening2.add(listening1);
                    mediations.push(this._doMediation(listening2, listening2.position, listening2.velocity));
                    absorbedLis.push(listening2);
                }
            }
        }
        // remove the absorbed listenings
        for (const absorbedLi of absorbedLis) {
            const index = listenings.indexOf(absorbedLi);
            if (index > -1) {
                listenings.splice(index, 1);
            }
        }
        // emit the remaining listenings as global mediations
        for (const listening of listenings) {
            mediations.push(this._doMediation(listening, listening.position, listening.velocity));
        }
        // return the mediation
        return mediations;
    }
    // actually do the mediation
    _doMediation(listening, position, velocity) {
        const mediation = listening.convert("mediation");
        mediation.position = position;
        mediation.velocity = velocity;
        return mediation;
    }
    clone() {
        const clone = new Mediative(this.parent, this.informations, this.information);
        clone.parent = this.parent;
        clone.informations = this.informations;
        clone.information = this.information;
        return clone;
    }
}
exports.Mediative = Mediative;
class Mediation extends LocalInformation {
    constructor(parent, self, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.self = self;
        this.position = position;
        this.velocity = velocity;
        this.infoType = 'mediation';
        this.infoValue = 0;
        // if the mediative is local, then the mediation is global. If the mediative is global, then the mediation is local.
        // if the mediative is a dipole, then the mediation is monopolar (for example: a speaker mediates sound, which is monopolar)
        // if the mediative is a monopole, then the mediation is dipolar (for example: a microphone mediates sound, which is dipolar)
        if (this.parent) {
            this.infoValue = self.value();
        }
    }
    add(mediation) { this.infoValue += mediation.infoValue; }
    clone() {
        const clone = new Mediation(this.parent, this.self, this.position, this.velocity);
        clone.parent = this.parent;
        clone.position = this.position;
        clone.velocity = this.velocity;
        clone.infoType = this.infoType;
        clone.infoValue = this.infoValue;
        clone.source = this.source;
        clone.visibleObjects = this.visibleObjects;
        return clone;
    }
}
exports.Mediation = Mediation;
// an emitter is an environment that emits information. emissive, radiative, listener, mediative, executive are all types of emitters.
class Emitter extends Environment {
    constructor(parent, informations, information) {
        super(information.source, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
    }
    emit(local) {
        // attract the local information to the emitter and then execute it
        local.position = this.information.position;
        local.velocity = this.information.velocity;
        const visibleObjects = local.visibleObjects;
        local.visibleObjects = visibleObjects;
        // if the emitter is local, then the emission is global. If the emitter is global, then the emission is local.
        const emitterIsLocal = local.source !== undefined;
        if (emitterIsLocal) { // local emitter's output is global - thus, the emission is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("emission")]; // if there is no parent, then the emission is global
            } // if there is no parent, then the emission is global
            return this.parent.source.emit(local.convert("emission")); // if there is a parent, then the emission is local
        }
        // else the emitter is global, so the emission is local, meaning it is emitted by all emitters as local information
        // iterate through the visible objects and attract the appropriate information to the emitter
        const emissions = [], absorbedEms = [];
        for (const visibleObject of visibleObjects) {
            const distance = this.information.distanceTo(visibleObject);
            const direction = this.information.directionTo(visibleObject);
            const force = this.information.value() * visibleObject.value() / distance;
            const acceleration = force / this.information.value();
            this.information.velocity = this.information.velocity.add(direction.multiplyScalar(acceleration));
            visibleObject.velocity = visibleObject.velocity.sub(direction.multiplyScalar(acceleration));
            // if the visibleObject are colliding, then emit a local emission
            if (distance < 1) {
                visibleObject.add(this.information);
                emissions.push(...this._doEmission(visibleObject.source, visibleObject.position, visibleObject.velocity));
                absorbedEms.push(visibleObject);
            }
        }
        // remove the absorbed emissions
        for (const absorbedEm of absorbedEms) {
            const index = visibleObjects.indexOf(absorbedEm);
            if (index > -1) {
                visibleObjects.splice(index, 1);
            }
        }
        // emit the remaining visible objects as local emissions
        for (const visibleObject of visibleObjects) {
            emissions.push(...this._doEmission(visibleObject.source, visibleObject.position, visibleObject.velocity));
        }
        // return the emission
        return emissions;
    }
    _doEmission(emission, position, velocity) {
        const e = this.getLocalInformation(position, velocity);
        e.parent = emission.parent;
        e.position = emission.position;
        e.velocity = emission.velocity;
        e.infoType = emission.infoType;
        e.infoValue = emission.infoValue;
        e.source = emission.source;
        e.visibleObjects = emission.visibleObjects;
        // if the emission is local, then the emission is global. If the emission is global, then the emission is local.
        const emissionIsLocal = emission.parent !== null && emission.parent.source !== undefined;
        if (emissionIsLocal) { // local emission's output is global - thus, the emission is global, meaning it is emitted by the environment
            if (!this.parent) {
                return e.source; // if there is no parent, then the emission is global
            } // if there is no parent, then the emission is global
            return this.parent.source.emit(e.source); // if there is a parent, then the emission is local
        }
        // else the emission is global, so the emission is local, meaning it is emitted by all emitters as local information
        // iterate through the visible objects and attract the appropriate information to the emitter
        const visibleObjects = emission.visibleObjects, emissions = [], absorbedEms = [];
        for (const visibleObject of visibleObjects) {
            if (visibleObject.infoType === 'emission') {
                const distance = e.distanceTo(visibleObject);
                const direction = e.directionTo(visibleObject);
                const force = e.value() * visibleObject.value() / distance;
                const acceleration = force / e.value();
                e.velocity = e.velocity.add(direction.multiplyScalar(acceleration));
                visibleObject.velocity = visibleObject.velocity.sub(direction.multiplyScalar(acceleration));
                // if the visibleObject are colliding, then emit a local emission
                if (distance < 1) {
                    visibleObject.add(e);
                    emissions.push(...this._doEmission(visibleObject.source, visibleObject.position, visibleObject.velocity));
                    absorbedEms.push(visibleObject);
                }
            }
        }
        // remove the absorbed emissions
        for (const absorbedEm of absorbedEms) {
            const index = visibleObjects.indexOf(absorbedEm);
            if (index > -1) {
                visibleObjects.splice(index, 1);
            }
        }
        // emit the remaining visible objects as local emissions
        for (const visibleObject of visibleObjects) {
            emissions.push(...this._doEmission(visibleObject.source, visibleObject.position, visibleObject.velocity));
        }
        // return the emission
        return emissions;
    }
    _doMediation(mediation, position, velocity) {
        const m = this.getLocalInformation(position, velocity);
        m.parent = mediation.parent;
        m.position = mediation.position;
        m.velocity = mediation.velocity;
        m.infoType = mediation.infoType;
        m.infoValue = mediation.infoValue;
        m.source = mediation.source;
        m.visibleObjects = mediation.visibleObjects;
        // if the mediation is local, then the mediation is global. If the mediation is global, then the mediation is local.
        const mediationIsLocal = mediation.parent !== null && mediation.parent.source !== undefined;
        if (mediationIsLocal) { // local mediation's output is global - thus, the mediation is global, meaning it is emitted by the environment
            if (!this.parent) {
                return m.source; // if there is no parent, then the mediation is global
            } // if there is no parent, then the mediation is global
        }
        // else the mediation is global, so the mediation is local, meaning it is emitted by all emitters as local information
        // iterate through the visible objects and attract the appropriate information to the emitter
        const visibleObjects = mediation.visibleObjects;
        for (const visibleObject of visibleObjects) {
            if (visibleObject.infoType === 'mediation') {
                const distance = this.information.position.distanceTo(visibleObject.position);
                const direction = this.information.position.directionTo(visibleObject.position);
                const force = this.information.value() * visibleObject.value() / distance;
                const acceleration = force / this.information.value();
                this.information.velocity = this.information.velocity.add(direction.multiplyScalar(acceleration));
                visibleObject.velocity = visibleObject.velocity.sub(direction.multiplyScalar(acceleration));
                // if the mediation is colliding, then emit a local mediation
                if (distance < 1) {
                    this.information.add(visibleObject);
                    this.mediate(this._doMediation(visibleObject.source, this.information.position, this.information.velocity));
                }
            }
        }
        // return the mediation
        return m.convert("mediation");
    }
    listen(local) {
        // if the emitter is local, then the emission is global. If the emitter is global, then the emission is local.
        const emitterIsLocal = local !== null && local.source !== undefined;
        if (emitterIsLocal) { // local emitter's output is global - thus, the emission is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.source]; // if there is no parent, then the emission is global
            } // if there is no parent, then the emission is global
            return this.parent.source.listen(local.source); // if there is a parent, then the emission is local
        }
        // else the emitter is global, so the emission is local, meaning it is emitted by all emitters as local information
        // iterate through the visible objects and attract the appropriate information to the emitter
        const mediations = [], absorbedMediations = [];
        for (const visibleObject of this.getVisibleObjects(local, local.position, local.velocity)) {
            if (visibleObject.infoType === 'mediation') {
                const mediation = visibleObject.clone();
                const distance = this.information.position.distanceTo(mediation.position);
                const direction = this.information.position.directionTo(mediation.position);
                const force = this.information.value() * mediation.value() / distance;
                const acceleration = force / this.information.value();
                this.information.velocity = this.information.velocity.add(direction.multiplyScalar(acceleration));
                mediation.velocity = mediation.velocity.sub(direction.multiplyScalar(acceleration));
                // if the mediation is colliding, then emit a local mediation
                if (distance < 1) {
                    this.information.add(mediation);
                    mediations.push(this._doMediation(mediation.source, this.information.position, this.information.velocity));
                    absorbedMediations.push(mediation);
                }
            }
        }
        // remove the absorbed mediations
        for (const absorbedMediation of absorbedMediations) {
            const visibleObjects = this.getVisibleObjects(local, local.position, local.velocity);
            const index = this.getVisibleObjects(local, local.position, local.velocity).indexOf(absorbedMediation);
            if (index > -1) {
                visibleObjects.splice(index, 1);
            }
        }
        // return the mediation
        return mediations;
    }
}
exports.Emitter = Emitter;
class Emission extends LocalInformation {
    constructor(parent, self, position, velocity) {
        super(parent, position, velocity);
        this.parent = parent;
        this.self = self;
        this.position = position;
        this.velocity = velocity;
        this.infoType = 'emission';
        this.infoValue = 0;
        // if the executive is a dipole, then the execution is monopolar (for example: a speaker executes sound, which is monopolar)
        // if the executive is a monopole, then the execution is dipolar (for example: a microphone executes sound, which is dipolar)
        if (this.parent) {
            this.infoValue = self.value();
        }
    }
    add(emission) { this.infoValue += emission.infoValue; }
    clone() {
        const clone = new Emission(this.parent, this.self, this.position, this.velocity);
        clone.parent = this.parent;
        clone.position = this.position;
        clone.velocity = this.velocity;
        clone.infoType = this.infoType;
        clone.infoValue = this.infoValue;
        clone.source = this.source;
        clone.visibleObjects = this.visibleObjects;
        return clone;
    }
}
exports.Emission = Emission;
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
    absorb(local) { return this.absorber.absorb(local.source); }
    listen(local) { return this.listener.listen(local.source); }
    execute(local) { return this.executor.execute(local.source); }
    mediate(local) { return this.mediator.mediate(local.source); }
    emit(local) { return this.radiator.emit(local.source); }
    getLocalInformation(position, velocity) {
        const localInformation = new LocalInformation(this.globalInformation, position, velocity);
        const absorptions = this.absorber.absorb(localInformation.convert("emission"));
        const listenings = absorptions.forEach(absorption => this.listener.listen(absorption));
        const listFlat = listenings.reduce((a, b) => a.concat(b), []);
        const executions = listFlat.forEach((listening) => this.executor.execute(listening));
        const execFlat = executions.reduce((a, b) => a.concat(b), []);
        const mediations = execFlat.forEach((execution) => this.mediator.mediate(execution));
        const medFlat = mediations.reduce((a, b) => a.concat(b), []);
        const emissions = medFlat.forEach((mediation) => this.radiator.emit(mediation));
        const emiFlat = emissions.reduce((a, b) => a.concat(b), []);
        return emiFlat.reduce((a, b) => a.add(b), localInformation);
    }
    update() { this.globalInformation = this.getglobalInformation(); }
    updateLocalInformation(localInformation) {
        this.localInformations.push(localInformation);
        this.update();
    }
    measureQuantumState() {
        // aggregate all the local information into a global information
        this.globalInformation = this.getglobalInformation();
        const gi = this.globalInformation.value(); // measure the global information
        this.localInformations.forEach(localInformation => localInformation.value());
        return gi;
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
    updateLocalInformation(localInformation) {
        this.localInformations.push(localInformation);
        this.update();
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
                // add 
            }
        }
    }
}
exports.randomDipoles = randomDipoles;
class EnvironmentRenderer {
    constructor(canvas, environment, position, velocity) {
        this.canvas = canvas;
        this.environment = environment;
        this.position = position;
        this.velocity = velocity;
        // render the environment onto the canvas from the position and velocity and looking in the direction of
        // reposition the canvas origin to the canvas center
        canvas.getContext('2d').translate(canvas.width / 2, canvas.height / 2);
    }
    render(position, direction) {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // render the environment onto the canvas from the position and velocity and looking in the direction of
        const visibleObjects = this.environment.getVisibleObjects(this.environment.getLocalInformation(position, this.velocity), position, direction);
        visibleObjects.forEach(visibleObject => {
            const pos = visibleObject.position;
            // is this position within the frame of the canvas?
            if (pos.x < 0 || pos.x > this.canvas.width) {
                return;
            }
            if (pos.y < 0 || pos.y > this.canvas.height) {
                return;
            }
            if (pos.z < 0 || pos.z > this.canvas.depth) {
                return;
            }
            if (visibleObject instanceof Absorber) { // an absorber is a pole that absorbs information from the environment
                // render the absorber
                context.fillStyle = "rgba(0, 0, 0, 1.0)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof Absorption) { // an absorption is the absorption of information from the environment
                // render the absorption
                context.fillStyle = "rgba(0, 0, 0, 0.01)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof Listener) { // a listener is a pole that listens to information from the environment
                // render the listener
                context.fillStyle = "rgba(0, 0, 255, 1.0)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof Listening) { // a listening is the listening of information from the environment
                // render the listening
                context.fillStyle = "rgba(0, 0, 255, 0.01)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof Executive) { // an executive is a pole that executes information from the environment
                // render the executive
                context.fillStyle = "rgba(255, 0, 0, 1.0)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof Execution) { // an execution is the execution of information from the environment
                // render the execution
                context.fillStyle = "rgba(255, 0, 0, 0.01)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof Mediative) { // a mediative is a pole that mediates information from the environment
                // render the mediative
                context.fillStyle = "rgba(255, 0, 255, 1.0)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof Mediation) { // a mediation is the mediation of information from the environment
                // render the mediation
                context.fillStyle = "rgba(255, 0, 255, 0.01)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof Emitter) { // an emitter is a pole that emits information from the environment
                // render the emitter
                context.fillStyle = "rgba(0, 255, 0, 1.0)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof Emission) { // an emission is the emission of information from the environment
                // render the emission
                context.fillStyle = "rgba(0, 255, 0, 0.01)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
            if (visibleObject instanceof LocalInformation) { // a local information is a pole that emits information from the environment
                // render the emission
                context.fillStyle = "rgba(255, 255, 255, 0.01)";
                context.fillRect(pos.x, pos.y, 5, 5);
            }
        });
        // render the position
        context.fillStyle = "rgba(255, 255, 255, 1.0)";
        context.fillRect(position.x, position.y, 5, 5);
        // render the direction
        context.fillStyle = "rgba(255, 255, 255, 1.0)";
        context.fillRect(position.x + direction.x, position.y + direction.y, 5, 5);
        // render the velocity
        context.fillStyle = "rgba(255, 255, 255, 1.0)";
        context.fillRect(position.x + this.velocity.x, position.y + this.velocity.y, 5, 5);
    }
}
