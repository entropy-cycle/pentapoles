"use strict";
// mocha tests for ../src/new.ts. tests the following: 
//
// Environment class:
// - constructor(parent: EnvironmentRoot, radius: Vector3)
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
//
// LocaleInformation class:
// - constructor()
// - addLocaleInformation(info: LocaleInformation, position: Vector3, radius: Vector3)
// - updateLocaleInformation(info: LocaleInformation)
// - removeLocaleInformation(info: LocaleInformation)
// - update()
// - clearQueue()
// - on(event: string, eventHandler: Handler)
// - off(event: string, eventHandler: Handler)
// - once(event: string, eventHandler: Handler)
// - toString()
// 
// Information class:
// - polarity: Polarity
// - polarityBetween(other: Information): Polarity
// - static NULL: Information
// - toString(): string
// - clone(): Information
//
// Polarity class:
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
//
// Handler class:
// - constructor(callback: Function, context: any)
// - callback: Function
// - context: any
// - call(...args: any[]): void
// - toString(): string
// - clone(): Handler
//
//
// this test coverage is implemented using the mocha testing framework.
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const environment_1 = require("../src/environment");
const localeinfo_1 = require("../src/localeinfo");
const information_1 = require("../src/information");
const polarity_1 = require("../src/polarity");
const handler_1 = require("../src/handler");
const vector_1 = require("../src/vector");
describe('Environment', () => {
    let info;
    let position;
    let radius;
    beforeEach(() => {
        info = new environment_1.Environment();
        position = new vector_1.Vector3(0, 0, 0);
        radius = new vector_1.Vector3(0, 0, 0);
    });
    describe('addLocality(info: Environment, position: Vector3, radius: Vector3)', () => {
        it('should add a locality to the environment', () => {
            info.addLocality(info, position, radius);
            (0, chai_1.expect)(info.localities.length).to.equal(1);
        });
    });
    describe('addLocaleInformation(info: LocaleInformation, position: Vector3, radius: Vector3)', () => {
        it('should add a locale information to the environment', () => {
            info.addLocaleInformation(info, position, radius);
            (0, chai_1.expect)(info.localeInformations.length).to.equal(1);
        });
    });
    describe('updateLocaleInformation(info: LocaleInformation)', () => {
        it('should update a locale information in the environment', () => {
            info.addLocaleInformation(info, position, radius);
            info.updateLocaleInformation(info);
            (0, chai_1.expect)(info.localeInformations.length).to.equal(1);
        });
    });
    describe('removeLocaleInformation(info: LocaleInformation)', () => {
        it('should remove a locale information from the environment', () => {
            info.addLocaleInformation(info, position, radius);
            info.removeLocaleInformation(info);
            (0, chai_1.expect)(info.localeInformations.length).to.equal(0);
        });
    });
    describe('update()', () => {
        it('should update the environment', () => {
            info.update();
            (0, chai_1.expect)(info.localities.length).to.equal(0);
            (0, chai_1.expect)(info.localeInformations.length).to.equal(0);
        });
    });
    describe('clearQueue()', () => {
        it('should clear the queue', () => {
            info.clearQueue();
            (0, chai_1.expect)(info.localities.length).to.equal(0);
            (0, chai_1.expect)(info.localeInformations.length).to.equal(0);
        });
    });
    describe('on(event: string, eventHandler: Handler)', () => {
        it('should add an event handler to the environment', () => {
            info.on("test", new handler_1.Handler(() => { }, null));
            (0, chai_1.expect)(info.eventHandlers.length).to.equal(1);
        });
    });
    describe('off(event: string, eventHandler: Handler)', () => {
        it('should remove an event handler from the environment', () => {
            info.on("test", new handler_1.Handler(() => { }, null));
            info.off("test", new handler_1.Handler(() => { }, null));
            (0, chai_1.expect)(info.eventHandlers.length).to.equal(0);
        });
    });
    describe('once(event: string, eventHandler: Handler)', () => {
        it('should add an event handler to the environment', () => {
            info.once("test", new handler_1.Handler(() => { }, null));
            (0, chai_1.expect)(info.eventHandlers.length).to.equal(1);
        });
    });
    describe('toString()', () => {
        it('should return a string', () => {
            (0, chai_1.expect)(info.toString()).to.be.a('string');
        });
    });
});
describe('Handler', () => {
    let handler;
    beforeEach(() => {
        handler = new handler_1.Handler(() => { }, null);
    });
    describe('call(...args: any[])', () => {
        it('should call the handler', () => {
            handler.call();
        });
    });
    describe('toString()', () => {
        it('should return a string', () => {
            (0, chai_1.expect)(handler.toString()).to.be.a('string');
        });
    });
    describe('clone()', () => {
        it('should return a new handler', () => {
            (0, chai_1.expect)(handler.clone()).to.be.a('Handler');
        });
    });
});
describe('Polarity', () => {
    let polarity;
    beforeEach(() => {
        polarity = new polarity_1.Polarity();
    });
    describe('get absorb(): number', () => {
        it('should return a number', () => {
            (0, chai_1.expect)(polarity.absorb).to.be.a('number');
        });
    });
    describe('set absorb(value: number)', () => {
        it('should set the absorb value', () => {
            polarity.absorb = 1;
            (0, chai_1.expect)(polarity.absorb).to.equal(1);
        });
    });
    describe('get listen(): number', () => {
        it('should return a number', () => {
            (0, chai_1.expect)(polarity.listen).to.be.a('number');
        });
    });
    describe('set listen(value: number)', () => {
        it('should set the listen value', () => {
            polarity.listen = 1;
            (0, chai_1.expect)(polarity.listen).to.equal(1);
        });
    });
    describe('get execute(): number', () => {
        it('should return a number', () => {
            (0, chai_1.expect)(polarity.execute).to.be.a('number');
        });
    });
    describe('set execute(value: number)', () => {
        it('should set the execute value', () => {
            polarity.execute = 1;
            (0, chai_1.expect)(polarity.execute).to.equal(1);
        });
    });
    describe('get mediate(): number', () => {
        it('should return a number', () => {
            (0, chai_1.expect)(polarity.mediate).to.be.a('number');
        });
    });
    describe('set mediate(value: number)', () => {
        it('should set the mediate value', () => {
            polarity.mediate = 1;
            (0, chai_1.expect)(polarity.mediate).to.equal(1);
        });
    });
    describe('get emit(): number', () => {
        it('should return a number', () => {
            (0, chai_1.expect)(polarity.emit).to.be.a('number');
        });
    });
    describe('set emit(value: number)', () => {
        it('should set the emit value', () => {
            polarity.emit = 1;
            (0, chai_1.expect)(polarity.emit).to.equal(1);
        });
    });
    describe('set(absorb: number, listen: number, execute: number, mediate: number, emit: number)', () => {
        it('should set the polarity values', () => {
            polarity.set(1, 1, 1, 1, 1);
            (0, chai_1.expect)(polarity.absorb).to.equal(1);
            (0, chai_1.expect)(polarity.listen).to.equal(1);
            (0, chai_1.expect)(polarity.execute).to.equal(1);
            (0, chai_1.expect)(polarity.mediate).to.equal(1);
            (0, chai_1.expect)(polarity.emit).to.equal(1);
        });
    });
});
describe('Information', () => {
    let info;
    beforeEach(() => {
        info = new information_1.Information();
    });
    describe('polarity: Polarity', () => {
        it('should return a polarity', () => {
            (0, chai_1.expect)(info.polarity).to.be.an.instanceof(polarity_1.Polarity);
        });
    });
    describe('polarityBetween(other: Information): Polarity', () => {
        it('should return a polarity', () => {
            (0, chai_1.expect)(info.polarityBetween(info)).to.be.an.instanceof(polarity_1.Polarity);
        });
    });
    describe('static NULL: Information', () => {
        it('should return an information', () => {
            (0, chai_1.expect)(information_1.Information.NULL).to.be.an.instanceof(information_1.Information);
        });
    });
    describe('toString(): string', () => {
        it('should return a string', () => {
            (0, chai_1.expect)(info.toString()).to.be.a('string');
        });
    });
    describe('clone(): Information', () => {
        it('should return an information', () => {
            (0, chai_1.expect)(info.clone()).to.be.an.instanceof(information_1.Information);
        });
    });
});
describe('LocaleInformation', () => {
    let info;
    let position;
    let radius;
    beforeEach(() => {
        info = new localeinfo_1.LocaleInformation();
        position = new vector_1.Vector3(0, 0, 0);
        radius = new vector_1.Vector3(0, 0, 0);
    });
    describe('addLocaleInformation(info: LocaleInformation, position: Vector3, radius: Vector3)', () => {
        it('should add a locale information to the locale information', () => {
            info.addLocaleInformation(info, position, radius);
            (0, chai_1.expect)(info.localeInformations.length).to.equal(1);
        });
    });
    describe('updateLocaleInformation(info: LocaleInformation)', () => {
        it('should update a locale information in the locale information', () => {
            info.addLocaleInformation(info, position, radius);
            info.updateLocaleInformation(info);
            (0, chai_1.expect)(info.localeInformations.length).to.equal(1);
        });
    });
    describe('removeLocaleInformation(info: LocaleInformation)', () => {
        it('should remove a locale information from the locale information', () => {
            info.addLocaleInformation(info, position, radius);
            info.removeLocaleInformation(info);
            (0, chai_1.expect)(info.localeInformations.length).to.equal(0);
        });
    });
    describe('update()', () => {
        it('should update the locale information', () => {
            info.update();
            (0, chai_1.expect)(info.localeInformations.length).to.equal(0);
        });
    });
    describe('clearQueue()', () => {
        it('should clear the queue', () => {
            info.clearQueue();
            (0, chai_1.expect)(info.localeInformations.length).to.equal(0);
        });
    });
    describe('on(event: string, eventHandler: Handler)', () => {
        it('should add an event handler to the locale information', () => {
            info.on("test", new handler_1.Handler(() => { }, null));
            (0, chai_1.expect)(info.eventHandlers.length).to.equal(1);
        });
    });
    describe('off(event: string, eventHandler: Handler)', () => {
        it('should remove an event handler from the locale information', () => {
            info.on("test", new handler_1.Handler(() => { }, null));
            info.off("test", new handler_1.Handler(() => { }, null));
            (0, chai_1.expect)(info.eventHandlers.length).to.equal(0);
        });
    });
    describe('once(event: string, eventHandler: Handler)', () => {
        it('should add an event handler to the locale information', () => {
            info.once("test", new handler_1.Handler(() => { }, null));
            (0, chai_1.expect)(info.eventHandlers.length).to.equal(1);
        });
    });
    describe('toString()', () => {
        it('should return a string', () => {
            (0, chai_1.expect)(info.toString()).to.be.a('string');
        });
    });
});
/*
The following is a condensed abstract for test writers. The below should give anyone writing test coverage for the above class enough information to write the tests.

*/
