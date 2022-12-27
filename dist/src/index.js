"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldLine = exports.EnvironmentRenderer = exports.randomDipoles = exports.Dipole = exports.Pole = exports.Emission = exports.Emitter = exports.Mediation = exports.Mediative = exports.Execution = exports.Executive = exports.Listening = exports.Listener = exports.Absorption = exports.Absorber = exports.LocalInformation = exports.Environment = exports.Vector3 = exports.Vector2 = void 0;
const vector_1 = require("./vector");
Object.defineProperty(exports, "Vector2", { enumerable: true, get: function () { return vector_1.Vector2; } });
Object.defineProperty(exports, "Vector3", { enumerable: true, get: function () { return vector_1.Vector3; } });
class Environment {
    children() { return this._children; }
    constructor(parent, localInformations = [], globalInformation) {
        this.parent = parent;
        this.globalInformation = globalInformation;
        this._children = [];
        if (parent) {
            parent.source.children().push(this);
        }
        this.absorber = new Absorber(parent, localInformations, globalInformation);
        this.listener = new Listener(parent, localInformations, globalInformation);
        this.executor = new Executive(parent, localInformations, globalInformation);
        this.mediator = new Mediative(parent, localInformations, globalInformation);
        this.emitter = new Emitter(parent, localInformations, globalInformation);
        localInformations.forEach((localInformation) => {
            this.absorber.addLocalInformation(localInformation, localInformation.position, localInformation.radius);
        });
    }
    getGlobalInformation() { return this.globalInformation ? this.globalInformation : this.getGlobalInformation(); }
    absorb(local) { return this.absorber.absorb(local.source); }
    listen(local) { return this.listener.listen(local.source); }
    execute(local) { return this.executor.execute(local.source); }
    mediate(local) { return this.mediator.mediate(local.source); }
    emit(local) { return this.emitter.emit(local.source); }
    observeLocalInformation(position, radius) {
        const compressedInfo = this.compress(position, radius);
        const absorptions = this.absorber.absorb(compressedInfo.convert("emission"));
        const listenings = absorptions.forEach(absorption => this.listener.listen(absorption));
        const listFlat = listenings.reduce((a, b) => a.concat(b), []);
        const executions = listFlat.forEach((listening) => this.executor.execute(listening));
        const execFlat = executions.reduce((a, b) => a.concat(b), []);
        const mediations = execFlat.forEach((execution) => this.mediator.mediate(execution));
        const medFlat = mediations.reduce((a, b) => a.concat(b), []);
        const emissions = medFlat.forEach((mediation) => this.emitter.emit(mediation));
        const emiFlat = emissions.reduce((a, b) => a.concat(b), []);
        const localInformation = new LocalInformation(null, new vector_1.Vector3(0, 0, 0), new vector_1.Vector3(0, 0, 0));
        for (let info of emiFlat) {
            localInformation.position.add(info.position);
        }
        localInformation.position.divideScalar(emiFlat.length);
        localInformation.visibleObjects = emiFlat;
        return localInformation;
    }
    // gets the local information from the point of view of the environment, not affecting the environment
    getLocalInformation(position, radius) {
        const compressedInfo = this.compress(position, radius);
        for (let child of this.children()) {
            const childLocalInformation = child.getLocalInformation(position, radius);
            compressedInfo.position.add(childLocalInformation.position);
            compressedInfo.visibleObjects.push(...childLocalInformation.visibleObjects);
        }
        compressedInfo.position.divideScalar(this.children().length);
        return compressedInfo;
    }
    addLocalInformation(information, position, radius) {
        const localInformation = this.getLocalInformation(position, radius);
        localInformation.add(information);
        return localInformation;
    }
    updateLocalInformation(information, position) {
        const localInformation = this.getLocalInformation(position, information.radius);
        localInformation.subtract(information);
        return localInformation;
    }
    removeLocalInformation(information, position) {
        const localInformation = this.getLocalInformation(position, information.radius);
        localInformation.subtract(information);
        return localInformation;
    }
    addPole(pole, position, radius) {
        const localInformation = this.getLocalInformation(position, radius);
        localInformation.source = pole;
        return localInformation;
    }
    getPoles(position, radius) {
        const localInformation = this.getLocalInformation(position, radius);
        return localInformation.visibleObjects.filter((local) => local.source instanceof Pole);
    }
    getVisibleObjects(local, position, radius) {
        // get the visible objects from the point od view of the local information
        const visibleObjects = [];
        for (let child of this.children()) {
            const childVisibleObjects = child.getVisibleObjects(local, position, radius);
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
        const our = `Environment: ${this.getGlobalInformation().infoType} ${this.getGlobalInformation().infoValue} ${this.getGlobalInformation().position} ${this.getGlobalInformation().radius} ${this.getGlobalInformation().source} ${this.getGlobalInformation().visibleObjects.length} ${this.getGlobalInformation().visibleObjects.map((visibleObject) => visibleObject.infoType).join(' ')}\n`;
        const children = this.children().map((child) => child.toString()).join("\n");
        return our + children;
    }
    clone() {
        const clone = new Environment(this.parent, this.getGlobalInformation().visibleObjects, this.getGlobalInformation().infoValue);
        for (let child of this.children()) {
            clone.children().push(child.clone());
        }
        return clone;
    }
    // compress the local information of the given area. This will remove all the 
    // local information that is not needed to describe the area. this aggregates the
    // local information into a single local information object
    compress(position, radius) {
        const localInformation = this.getLocalInformation(position, radius);
        // we will now remove all the local information that is not needed to describe the area
        const visibleObjects = localInformation.visibleObjects;
        const visibleObjectsFiltered = [];
        for (let visibleObject of visibleObjects) {
            let blocked = false;
            for (let visibleObjectFiltered of visibleObjectsFiltered) {
                if (visibleObjectFiltered.position.distanceTo(localInformation.position) < visibleObject.position.distanceTo(localInformation.position)) {
                    blocked = true;
                    break;
                }
            }
            if (!blocked) {
                visibleObjectsFiltered.push(visibleObject);
            }
        }
        localInformation.visibleObjects = visibleObjectsFiltered;
        return localInformation;
    }
    render(canvas, position, direction) {
        const localInformation = this.getLocalInformation(position, new vector_1.Vector3(1, 1, 1));
        const visibleObjects = localInformation.visibleObjects;
        const visibleObjectsFiltered = [];
        for (let visibleObject of visibleObjects) {
            let blocked = false;
            for (let visibleObjectFiltered of visibleObjectsFiltered) {
                if (visibleObjectFiltered.position.distanceTo(localInformation.position) < visibleObject.position.distanceTo(localInformation.position)) {
                    blocked = true;
                    break;
                }
            }
            if (!blocked) {
                visibleObjectsFiltered.push(visibleObject);
            }
        }
        const canvasContext = canvas.getContext('2d');
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const canvasCenter = new vector_1.Vector3(canvasWidth / 2, canvasHeight / 2, 0);
        const canvasRadius = new vector_1.Vector3(canvasWidth / 2, canvasHeight / 2, 0);
        const canvasLocalInformation = this.getLocalInformation(canvasCenter, canvasRadius);
        const canvasVisibleObjects = canvasLocalInformation.visibleObjects;
        const canvasVisibleObjectsFiltered = [];
        for (let visibleObject of canvasVisibleObjects) {
            let blocked = false;
            for (let visibleObjectFiltered of canvasVisibleObjectsFiltered) {
                if (visibleObjectFiltered.position.distanceTo(canvasLocalInformation.position) < visibleObject.position.distanceTo(canvasLocalInformation.position)) {
                    blocked = true;
                    break;
                }
            }
            if (!blocked) {
                canvasVisibleObjectsFiltered.push(visibleObject);
            }
        }
        const canvasVisibleObjectsFilteredSorted = canvasVisibleObjectsFiltered.sort((a, b) => {
            const distanceA = a.position.distanceTo(canvasLocalInformation.position);
            const distanceB = b.position.distanceTo(canvasLocalInformation.position);
            return distanceA - distanceB;
        });
        for (let visibleObject of canvasVisibleObjectsFilteredSorted) {
            const visibleObjectPosition = visibleObject.position.clone().multiply(canvasRadius).add(canvasCenter);
            const visibleObjectRadius = visibleObject.radius.clone().multiply(canvasRadius);
            const visibleObjectColor = visibleObject.infoType === 'emitter' ? 'red' : 'blue';
            canvasContext.beginPath();
            canvasContext.arc(visibleObjectPosition.x, visibleObjectPosition.y, visibleObjectRadius.x, 0, 2 * Math.PI, false);
            canvasContext.fillStyle = visibleObjectColor;
            canvasContext.fill();
            canvasContext.lineWidth = 5;
            canvasContext.strokeStyle = '#003300';
            canvasContext.stroke();
        }
        const canvasPosition = position.clone().multiply(canvasRadius).add(canvasCenter);
        const canvasDirection = direction.clone().multiply(canvasRadius);
        canvasContext.beginPath();
        canvasContext.moveTo(canvasPosition.x, canvasPosition.y);
        canvasContext.lineTo(canvasPosition.x + canvasDirection.x, canvasPosition.y + canvasDirection.y);
        canvasContext.lineWidth = 5;
        canvasContext.strokeStyle = '#003300';
        canvasContext.stroke();
    }
}
exports.Environment = Environment;
class LocalInformation {
    constructor(parent, position, radius) {
        this.parent = parent;
        this.position = position;
        this.radius = radius;
        this.source = parent ? parent.source : null;
        this.visibleObjects = [];
        this.infoType = 'emitter';
        this.visibleObjects = parent ? parent.source ? parent.source.getVisibleObjects(this, position, radius) : parent.visibleObjects : [];
    }
    distanceTo(local) { return this.position.distanceTo(local.position); }
    angleTo(local) { return this.position.angleTo(local.position); }
    directionTo(local) { return this.position.directionTo(local.position); }
    add(local) { this.visibleObjects.push(local); }
    subtract(local) { this.visibleObjects = this.visibleObjects.filter((visibleObject) => visibleObject !== local); }
    convert(toType) {
        LocalInformation.convert(this, toType);
    }
    static convert(self, toType) {
        const source = self.source ? self.source : this;
        switch (toType) {
            case 'absorber': return new Absorber(source, self.visibleObjects, self);
            case 'absorption': return new Absorption(self.parent, source, self.position, self.radius);
            case 'listener': return new Listener(source, self.visibleObjects, self);
            case 'listening': return new Listening(self.parent, source, self.position, self.radius);
            case 'executive': return new Executive(source, self.visibleObjects, self);
            case 'execution': return new Execution(self.parent, source, self.position, self.radius);
            case 'mediative': return new Mediative(source, self.visibleObjects, self);
            case 'mediation': return new Mediation(self.parent, source, self.position, self.radius);
            case 'emitter': return new Emitter(source, self.visibleObjects, self);
            case 'emission': return new Emission(self.parent, source, self.position, self.radius);
        }
    }
    update() {
        this.visibleObjects = this.parent
            ? this.parent.source
                ? this.parent.source.getVisibleObjects(this, this.position, this.radius) : this.parent.visibleObjects : [];
        this.infoValue = this.visibleObjects.length;
    }
    toString() {
        return `${this.infoType} ${this.infoValue} ${this.position} ${this.radius} ${this.source} ${this.visibleObjects.length} ${this.visibleObjects.map((visibleObject) => visibleObject.infoType).join(' ')}`;
    }
    clone() {
        const clone = new LocalInformation(this.parent, this.position, this.radius);
        clone.infoType = this.infoType;
        clone.infoValue = this.infoValue;
        clone.source = this.source;
        clone.visibleObjects = this.visibleObjects;
        return clone;
    }
    quantumState() { return this.infoValue; }
}
exports.LocalInformation = LocalInformation;
// Absorber -> Absorption -> Listener -> Listening -> Executive -> Execution -> Mediative -> Mediation -> Emitter -> Emission -< Absorber ...
// an absorber is an environment that absorbs information. absorptive poles absorb Emission and emit Absorption
class Absorber extends Environment {
    constructor(parent, informations, information, alignment = new vector_1.Vector3(0, 0, 0)) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
        this.alignment = alignment;
        this.information.infoType = 'absorber';
        this.information.infoValue = this.informations.length;
        this.alignment = new vector_1.Vector3(0, 0, 0);
    }
    absorb(local) {
        // attract the local information to the absorber and then absorb it
        local.position = this.information.position;
        local.radius = this.information.radius;
        const visibleObjects = local.visibleObjects;
        // if the absorber is local, then the absorption is global. If the absorber is global, then the absorption is local.
        const absorberIsLocal = local.source !== undefined;
        if (absorberIsLocal) { // local absorber's output is global - thus, the absorption is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("absorption")];
            } // if there is no parent, then the absorption is global
            return this.parent.source.absorb(local); // if there is a parent, then the absorption is local
        }
        // else the absorber is global, so the absorption is local, meaning it is emitted by all absorbers as local information
        // iterate through the visible objects and attract the appropriate information to the absorber
        const emissions = visibleObjects.filter((visibleObject) => visibleObject.infoType === 'emission');
        const absorbedEmissions = emissions.map((emission) => {
            const e = emission.clone();
            e.position = this.information.position.clone();
            e.radius = this.information.radius.clone();
            return e;
        });
        // emit absorptions for each absorbed emission
        const absorptions = [], absorbedEmns = [];
        for (const emission1 of absorbedEmissions) {
            for (const emission2 of emissions) {
                if (emission1 === emission2) {
                    continue;
                }
                const distance = emission1.distanceTo(emission2);
                const force = this.information.quantumState() * emission1.quantumState() * emission2.quantumState() / distance;
                // if the emission2 are colliding, then emit a local absorption
                if (distance < 1) {
                    const absorption = emission1.convert('absorption');
                    absorptions.push(absorption);
                    absorbedEmns.push(emission1);
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
                absorptions.push(this._doAbsorption(emission, emission.position, emission.radius));
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
        this.source = self.source;
        this.visibleObjects = self.visibleObjects;
        if (this.parent) {
            this.infoValue = self.quantumState();
        }
        else {
            this.infoValue = self.quantumState() / this.visibleObjects.length;
        } // not sure
    }
    add(absorption) {
        this.infoValue += absorption.quantumState();
        this.visibleObjects = this.visibleObjects.concat(absorption.visibleObjects);
    }
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
    constructor(parent, informations, information, alignment = new vector_1.Vector3(0, 0, 0)) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
        this.alignment = alignment;
        this.information.infoType = 'listener';
        this.alignment = new vector_1.Vector3(0, 0, 0);
    }
    listen(local) {
        // attract the local information to the listener and then listen to it
        local.position = this.information.position;
        local.radius = this.information.radius;
        const visibleObjects = local.visibleObjects;
        local.visibleObjects = visibleObjects;
        // if the listener is local, then the listening is global. If the listener is global, then the listening is local.
        const listenerIsLocal = local.source !== undefined;
        if (listenerIsLocal) { // local listener's output is global - thus, the listening is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("listening")];
            } // if there is no parent, then the listening is global
            return this.parent.source.listen(local); // if there is a parent, then the listening is local
        }
        // else the listener is global, so the listening is local, meaning it is emitted by all listeners as local information
        // iterate through the visible objects and attract the appropriate information to the listener
        const absorptions = visibleObjects.filter((visibleObject) => visibleObject.infoType === 'absorption');
        const listenedAbsorptions = absorptions.map((absorption) => {
            const a = absorption.clone();
            a.position = this.information.position.clone();
            a.radius = this.information.radius.clone();
            return a;
        });
        // iterate through the absorptions and emit the local listenings
        const listenings = [], listenedAbs = [];
        for (const absorption1 of listenedAbsorptions) {
            for (const absorption2 of absorptions) {
                if (absorption1 === absorption2) {
                    continue;
                }
                const distance = absorption1.distanceTo(absorption2);
                const direction = absorption1.directionTo(absorption2);
                const force = this.information.quantumState() * absorption1.quantumState() * absorption2.quantumState() / distance;
                const acceleration = force / absorption1.quantumState();
                // if the absorption2 are colliding, then emit a local listening
                if (distance < 1) {
                    absorption2.add(absorption1);
                    listenings.push(this._doListening(absorption2, absorption2.position, absorption2.radius));
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
            listenings.push(this._doListening(absorption, absorption.position, absorption.radius));
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
        this.source = self;
        // if the listener is local, then the listening is global. If the listener is global, then the listening is local.
        // if the listener is a dipole, then the listening is monopolar (for example: a speaker listens to sound, which is monopolar)
        // if the listener is a monopole, then the listening is dipolar (for example: a microphone listens to sound, which is dipolar)
        if (this.parent) {
            this.infoValue = self.quantumState();
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
    constructor(parent, informations, information, alignment = new vector_1.Vector3(0, 0, 0)) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
        this.alignment = alignment;
        this.information.infoType = 'executive';
        this.alignment = new vector_1.Vector3(0, 0, 0);
    }
    execute(local) {
        // attract the local information to the executive and then execute it
        local.position = this.information.position;
        local.radius = this.information.radius;
        const visibleObjects = local.visibleObjects;
        local.visibleObjects = visibleObjects;
        // if the executive is local, then the execution is global. If the executive is global, then the execution is local.
        const executiveIsLocal = local.source !== undefined;
        if (executiveIsLocal) { // local executive's output is global - thus, the execution is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("execution")];
            } // if there is no parent, then the execution is global
            return this.parent.source.execute(local); // if there is a parent, then the execution is local
        }
        // else the executive is global, so the execution is local, meaning it is emitted by all executives as local information
        // iterate through the visible objects and attract the appropriate information to the executive
        const listenings = visibleObjects.filter((visibleObject) => visibleObject.infoType === 'listening');
        const absorbedListenings = listenings.map((listening) => {
            const l = listening.clone();
            l.position = this.information.position.clone();
            l.radius = this.information.radius.clone();
            return l;
        });
        // iterate through the absorptions and emit the local listenings
        const executions = [], absorbedLis = [];
        for (const listening1 of absorbedListenings) {
            for (const listening2 of listenings) {
                if (listening1 === listening2) {
                    continue;
                }
                const distance = listening1.distanceTo(listening2);
                const direction = listening1.directionTo(listening2);
                const force = this.information.quantumState() * listening1.quantumState() * listening2.quantumState() / distance;
                const acceleration = force / listening1.quantumState();
                // if the listening2 are colliding, then emit a local execution
                if (distance < 1) {
                    listening2.add(listening1);
                    executions.push(this._doExecution(listening2, listening2.position, listening2.radius));
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
            executions.push(this._doExecution(listening, listening.position, listening.radius));
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
            this.infoValue = self.quantumState();
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
    constructor(parent, informations, information, alignment = new vector_1.Vector3(0, 0, 0)) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
        this.alignment = alignment;
        this.information.infoType = 'mediative';
        this.alignment = new vector_1.Vector3(0, 0, 0);
    }
    mediate(local) {
        // attract the local information to the mediative and then mediate it
        local.position = this.information.position;
        local.radius = this.information.radius;
        const visibleObjects = local.visibleObjects;
        local.visibleObjects = visibleObjects;
        // if the mediative is local, then the mediation is global. If the mediative is global, then the mediation is local.
        const mediativeIsLocal = local.source !== undefined;
        if (mediativeIsLocal) { // local mediative's output is global - thus, the mediation is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("mediation")];
            } // if there is no parent, then the mediation is global
            return this.parent.source.mediate(local); // if there is a parent, then the mediation is local
        }
        // else the mediative is global, so the mediation is local, meaning it is emitted by all mediatives as local information
        // iterate through the visible objects and attract the appropriate information to the mediative
        const executings = visibleObjects.filter((visibleObject) => visibleObject.infoType === 'execution');
        const absorbedExecutings = executings.map((executing) => {
            const l = executing.clone();
            l.position = this.information.position.clone();
            l.radius = this.information.radius.clone();
            return l;
        });
        // iterate through the absorptions and emit the local listenings
        const mediations = [], absorbedLis = [];
        for (const execution1 of absorbedExecutings) {
            for (const execution2 of executings) {
                if (execution1 === execution2) {
                    continue;
                }
                const distance = execution1.distanceTo(execution2);
                // if the execution2 are colliding, then emit a local listening
                if (distance < 1) {
                    execution2.add(execution1);
                    mediations.push(this._doMediation(execution2, execution2.position, execution2.radius));
                    absorbedLis.push(execution2);
                }
            }
        }
        // remove the absorbed listenings
        for (const absorbedLi of absorbedLis) {
            const index = executings.indexOf(absorbedLi);
            if (index > -1) {
                executings.splice(index, 1);
            }
        }
        // emit the remaining listenings as global executions
        for (const execution of executings) {
            mediations.push(this._doMediation(execution, execution.position, execution.radius));
        }
        // return the mediations
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
            this.infoValue = self.quantumState();
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
    constructor(parent, informations, information, alignment = new vector_1.Vector3(0, 0, 0)) {
        super(parent, informations, information);
        this.parent = parent;
        this.informations = informations;
        this.information = information;
        this.alignment = alignment;
        this.information.infoType = 'emitter';
        this.alignment = new vector_1.Vector3(0, 0, 0);
    }
    emit(local) {
        // attract the local information to the emitter and then execute it
        local.position = this.information.position;
        local.radius = this.information.radius;
        const visibleObjects = local.visibleObjects;
        local.visibleObjects = visibleObjects;
        // if the emitter is local, then the emission is global. If the emitter is global, then the emission is local.
        const emitterIsLocal = local.source !== undefined;
        if (emitterIsLocal) { // local emitter's output is global - thus, the emission is global, meaning it is emitted by the environment
            if (!this.parent) {
                return [local.convert("emission")];
            } // if there is no parent, then the emission is global
            return this.parent.source.emit(local); // if there is a parent, then the emission is local
        }
        // else the emitter is global, so the emission is local, meaning it is emitted by all emitters as local information
        // iterate through the visible objects and attract the appropriate information to the emitter
        const emissions = [], absorbedEms = [];
        for (const visibleObject of visibleObjects) {
            const distance = this.information.distanceTo(visibleObject);
            if (distance < 1) {
                visibleObject.add(this.information);
                emissions.push(...this._doEmission(visibleObject.source, visibleObject.position, visibleObject.radius));
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
            emissions.push(...this._doEmission(visibleObject.source, visibleObject.position, visibleObject.radius));
        }
        // return the emission
        return emissions;
    }
    _doEmission(emission, position, velocity) {
        // get the local information
        const e = this.getLocalInformation(position, velocity);
        e.parent = emission.parent;
        e.position = emission.position;
        e.radius = emission.radius;
        e.infoType = emission.infoType;
        e.infoValue = emission.infoValue;
        e.source = emission.source;
        e.visibleObjects = emission.visibleObjects;
        // if the emission is local, then the emission is global. If the emission is global, then the emission is local.
        const emissionIsLocal = emission.parent !== null && emission.parent.source !== undefined;
        if (emissionIsLocal) { // local emission's output is global - thus, the emission is global, meaning it is emitted by the environment
            if (!this.parent) {
                return e.source;
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
                const force = e.quantumState() * visibleObject.quantumState() / distance;
                const acceleration = force / e.quantumState();
                // if the visibleObject are colliding, then emit a local emission
                if (distance < 1) {
                    visibleObject.add(e);
                    emissions.push(...this._doEmission(visibleObject.source, visibleObject.position, visibleObject.radius));
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
            emissions.push(...this._doEmission(visibleObject.source, visibleObject.position, visibleObject.radius));
        }
        // return the emission
        return emissions;
    }
    _doMediation(mediation, position, velocity) {
        const m = this.getLocalInformation(position, velocity);
        m.parent = mediation.parent;
        m.position = mediation.position;
        m.radius = mediation.radius;
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
                const force = this.information.quantumState() * visibleObject.quantumState() / distance;
                const acceleration = force / this.information.quantumState();
                // if the mediation is colliding, then emit a local mediation
                if (distance < 1) {
                    this.information.add(visibleObject);
                    this.mediate(this._doMediation(visibleObject.source, this.information.position, this.information.radius));
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
                return [local.source];
            } // if there is no parent, then the emission is global
            return this.parent.source.listen(local.source); // if there is a parent, then the emission is local
        }
        // else the emitter is global, so the emission is local, meaning it is emitted by all emitters as local information
        // iterate through the visible objects and attract the appropriate information to the emitter
        const mediations = [], absorbedMediations = [];
        for (const visibleObject of this.getVisibleObjects(local, local.position, local.radius)) {
            if (visibleObject.infoType === 'mediation') {
                const mediation = visibleObject.clone();
                const distance = this.information.position.distanceTo(mediation.position);
                // if the mediation is colliding, then emit a local mediation
                if (distance < 1) {
                    this.information.add(mediation);
                    mediations.push(this._doMediation(mediation.source, this.information.position, this.information.radius));
                    absorbedMediations.push(mediation);
                }
            }
        }
        // remove the absorbed mediations
        for (const absorbedMediation of absorbedMediations) {
            const visibleObjects = this.getVisibleObjects(local, local.position, local.radius);
            const index = this.getVisibleObjects(local, local.position, local.radius).indexOf(absorbedMediation);
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
            this.infoValue = self.quantumState();
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
/*
# Representing Multipoles
Multipole shorthand treats each of the vector3s as a binay numerical representation, concatenating all five values together into a single number. For example:
Absorber - (1, 0, 0), Listener - (1, 0, 1), Executor - (0, 1, 0), Mediator - (0, 0, 1), Radiator - (1, 1, 0) becomes 101 101 010 001 110 becomes 1011010100110 binary which is 5798 decimal, 0x16a6 hex.
This shorthand allows for easy representation of multipoles and their orientations, and is used in the computer's programming language to quickly describe the orientation of a multipole.
## Examples
| absorber | listener | executor | mediator | radiator | binary value | decimal value | hex value |
|----------|----------|----------|----------|----------|--------------|---------------|-----------|
| (1, 0, 0) | (1, 0, 1) | (0, 1, 0) | (0, 0, 1) | (1, 1, 0) | 1011010100110 | 5798 | 0x16a6 |
| (1, 0, 0) | (1, 0, 1) | (0, 1, 0) | (0, 0, 1) | (1, 1, 1) | 1011010100111 | 5799 | 0x16a7 |
 */
class Pole extends Environment {
    constructor(parent, localInformation, polarConfiguration) {
        super(parent, [], localInformation);
        this.parent = parent;
        this.localInformation = localInformation;
        this.poleType = 'pole';
        // decompose polar configuration into binary
        const binary = polarConfiguration.toString(2);
        // extract the binary values as vector3s
        const absorber = new vector_1.Vector3(parseInt(binary[0]), parseInt(binary[1]), parseInt(binary[2]));
        const listener = new vector_1.Vector3(parseInt(binary[3]), parseInt(binary[4]), parseInt(binary[5]));
        const executor = new vector_1.Vector3(parseInt(binary[6]), parseInt(binary[7]), parseInt(binary[8]));
        const mediator = new vector_1.Vector3(parseInt(binary[9]), parseInt(binary[10]), parseInt(binary[11]));
        const emitter = new vector_1.Vector3(parseInt(binary[12]), parseInt(binary[13]), parseInt(binary[14]));
        this.absorber = new Absorber(parent, [], this.getGlobalInformation(), absorber);
        this.listener = new Listener(parent, [], this.getGlobalInformation(), listener);
        this.executor = new Executive(parent, [], this.getGlobalInformation(), executor);
        this.mediator = new Mediative(parent, [], this.getGlobalInformation(), mediator);
        this.emitter = new Emitter(parent, [], this.getGlobalInformation(), emitter);
    }
    static createPoles(parent, localInformations, polarConfigurations) {
        const poles = [];
        for (const polarConfiguration of polarConfigurations) {
            poles.push(new Pole(parent, localInformations, polarConfiguration));
        }
        return poles;
    }
    createRandomPoles(parent, localInformations, maxPoles) {
        const poles = [];
        for (let i = 0; i < maxPoles; i++) {
            // get a random binary string 12 characters long
            const rrnd = ~~(Math.random() * 1000000000000);
            const randomBinaryString = rrnd.toString(2);
            // convert the binary string to a number
            const polarConfiguration = parseInt(randomBinaryString);
            poles.push(new Pole(parent, localInformations, polarConfiguration));
        }
        return poles;
    }
}
exports.Pole = Pole;
class Dipole extends Pole {
    constructor(parent, localInformation, polarConfiguration) {
        super(parent, localInformation, polarConfiguration);
        this.parent = parent;
        this.localInformation = localInformation;
        this.poleType = 'dipole';
    }
    static createDipoles(parent, localInformations, polarConfigurations) {
        const dipoles = [];
        for (const polarConfiguration of polarConfigurations) {
            dipoles.push(new Dipole(parent, localInformations, polarConfiguration));
        }
        return dipoles;
    }
    createRandomDipoles(parent, localInformations, maxDipoles) {
        const dipoles = [];
        for (let i = 0; i < maxDipoles; i++) {
            // get a random binary string 15 characters long
            const rrnd = ~~(Math.random() * 100000000000000);
            const randomBinaryString = rrnd.toString(2);
            // convert the binary string to a number
            const polarConfiguration = parseInt(randomBinaryString);
            dipoles.push(new Dipole(parent, localInformations, polarConfiguration));
        }
        return dipoles;
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
                // add  a random dipole
                const localInformation = new LocalInformation(environment.getLocalInformation(new vector_1.Vector3(x, y, z), new vector_1.Vector3(0, 0, 0)), new vector_1.Vector3(x, y, z), new vector_1.Vector3(0, 0, 0));
                const rrnd = ~~(Math.random() * 100000000000000);
                const randomBinaryString = rrnd.toString(2);
                const polarConfiguration = parseInt(randomBinaryString);
                const dipole = new Dipole(localInformation, localInformation, polarConfiguration);
                environment.addPole(dipole, new vector_1.Vector3(x, y, z), new vector_1.Vector3(0, 0, 0));
            }
        }
    }
}
exports.randomDipoles = randomDipoles;
class EnvironmentRenderer {
    constructor(canvas, environment, position, radius) {
        this.canvas = canvas;
        this.environment = environment;
        this.position = position;
        this.radius = radius;
        // render the environment onto the canvas from the position and velocity and looking in the direction of
        // reposition the canvas origin to the canvas center
        canvas.getContext('2d').translate(canvas.width / 2, canvas.height / 2);
    }
    // raycast the environment from the position looking in the direction of. The radius is the distance from the
    render(position, direction) {
        // clear the canvas
        this.canvas.getContext('2d').clearRect(-this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height);
        // render the environment
        this.environment.render(this.canvas, position, direction);
    }
}
exports.EnvironmentRenderer = EnvironmentRenderer;
class FieldLine {
    constructor(position, localInformationPosition) {
        this.position = position;
        this.localInformationPosition = localInformationPosition;
    }
    render(canvas) {
        const context = canvas.getContext('2d');
        context.beginPath();
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.localInformationPosition.x, this.localInformationPosition.y);
        context.stroke();
    }
}
exports.FieldLine = FieldLine;
