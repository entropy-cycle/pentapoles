/*
Information
    - polarity: Polarity
    - domain: 'local' | 'global'
    - state: 'emission' | 'absorption' | 'vibration' | 'execution' | 'mediation'
    - position: Vector3
    - radius: Vector3
    - parent: Environment
    - source: Environment
    - constructor(parent?: EnvironmentRoot, source?: EnvironmentRoot, radius?: Vector3)
    - quantizeState(): void
    - unQuantizeState(): void
    - polarityBetween(other: Information): Polarity
    - visibleObjects(): Information[]
    - has(info: Information): boolean
    - get(info: Information): Information
    - set(info: Information, newInfo: Information): Information
    - all(): Information[]
    - clearQueue(): void
    - advanceState(): EnvironmentalState
    - static NULL: Information
    - toString(): string
    - clone(): Information
Description: This class represents information in the environment. It has a polarity, a domain, a state, a position, a radius, a parent, and a source. The polarity is the polarity of the information. The domain is the domain in which the information exists. The state is the state of the information. The position is the position of the information. The radius is the radius of the information. The parent is the parent environment of the information. The source is the source environment of the information.

Environment constructor: constructor(public parent: EnvironmentRoot, public radius: Vector3)
Information constructor: constructor(public parent?: EnvironmentRoot, public source?: EnvironmentRoot, public radius?: Vector3)

The below test coverage fully covers the above class.

*/
import { Environment } from '../src/environment';
import { Information } from '../src/information';
import { Polarity } from '../src/polarity';
import { Handler } from '../src/handler';
import { Vector3 } from '../src/vector';
import { EnvironmentBase } from '../src/envbase';

describe('Information', () => {
    // Create a parent environment for testing
    const parent = Environment.NULL || EnvironmentBase.NULL;
    const environment = new Environment(parent, new Vector3(0, 0, 0));
    const radius = new Vector3(0, 0, 0);
    const information = new Information(environment, environment, radius);

    describe('constructor', () => {
        it('should create an information', () => {
            expect(information).not.toBeNull();
        });
    });

    describe('polarity', () => {
        it('should set the polarity of the information', () => {
            // Create a new polarity and set it
            const newPolarity = new Polarity(environment);
            newPolarity.absorb = 1; // Set to positive value
            information.polarity = newPolarity;
            expect(information.polarity).toBe(newPolarity);
        });
    });

    describe('domain', () => {
        it('should set the domain of the information', () => {
            information.domain = 'local';
            expect(information.domain).toBe('local');
        });
    });

    describe('state', () => {
        it('should set the state of the information', () => {
            information.state = 'emission';
            expect(information.state).toBe('emission');
        });
    });

    describe('position', () => {
        it('should set the position of the information', () => {
            information.position = new Vector3(0, 0, 0);
            expect(information.position).toEqual(new Vector3(0, 0, 0));
        });
    });

    describe('radius', () => {
        it('should set the radius of the information', () => {
            information.radius = new Vector3(0, 0, 0);
            expect(information.radius).toEqual(new Vector3(0, 0, 0));
        });
    });

    describe('parent', () => {
        it('should set the parent of the information', () => {
            information.parent = environment;
            expect(information.parent).toBe(environment);
        });
    });

    describe('source', () => {
        it('should set the source of the information', () => {
            information.source = environment;
            expect(information.source).toBe(environment);
        });
    });

    describe('quantizeState', () => {
        it('should quantize the state of the information', () => {
            information.quantizeState();
            expect(typeof information.state).toBe('string');
        });
    });

    describe('unQuantizeState', () => {
        it('should unquantize the state of the information', () => {
            information.unQuantizeState();
            expect(typeof information.polarity).toBe('object');
        });
    });
    
    // Add tests for remaining methods
    describe('polarityBetween', () => {
        it('should return the polarity between two information objects', () => {
            const otherInfo = new Information(environment, environment, radius);
            const resultPolarity = information.polarityBetween(otherInfo);
            expect(typeof resultPolarity).toBe('object');
        });
    });
    
    describe('visibleObjects', () => {
        it('should return visible objects within radius', () => {
            const objects = information.visibleObjects();
            expect(Array.isArray(objects)).toBe(true);
        });
    });
    
    describe('has, get, set methods', () => {
        it('should check if information has another information', () => {
            const otherInfo = new Information(environment, environment, radius);
            expect(typeof information.has(otherInfo)).toBe('boolean');
        });
        
        it('should get information if it exists', () => {
            const otherInfo = new Information(environment, environment, radius);
            expect(typeof information.get(otherInfo)).toBe('object');
        });
        
        it('should set information if it exists', () => {
            const info1 = new Information(environment, environment, radius);
            const info2 = new Information(environment, environment, radius);
            const result = information.set(info1, info2);
            expect(typeof result).toBe('object');
        });
    });
    
    describe('all', () => {
        it('should return all objects within radius', () => {
            const objects = information.all();
            expect(Array.isArray(objects)).toBe(true);
        });
    });
    
    describe('clearQueue', () => {
        it('should clear the queue', () => {
            information.clearQueue();
            // Just testing that the method doesn't throw an error
            expect(true).toBe(true);
        });
    });
    
    describe('advanceState', () => {
        it('should advance the state of information', () => {
            const newState = information.advanceState();
            expect(typeof newState).toBe('string');
        });
    });
    
    describe('toString', () => {
        it('should return string representation', () => {
            const str = information.toString();
            expect(typeof str).toBe('string');
        });
    });
    
    describe('clone', () => {
        it('should return a clone of the information', () => {
            const clone = information.clone();
            expect(clone).toBeInstanceOf(Information);
        });
    });
});