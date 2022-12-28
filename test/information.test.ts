/*
Information
    - polarity: Polarity
    - domain: 'local' | 'global'
    - state: 'emission' | 'absorption' | 'vibration' | 'execution' | 'mediation'
    - position: Vector3
    - radius: Vector3
    - parent: Environment
    - source: Environment
    - constructor(parent: Environment, source: Environment, position: Vector3, radius?: Vector3)
    - setPolarity(polarity: Polarity): Polarity
    - setDomain(domain: 'local' | 'global'): 'local' | 'global'
    - setState(state: 'emission' | 'absorption' | 'vibration' | 'execution' | 'mediation'): 'emission' | 'absorption' | 'vibration' | 'execution' | 'mediation'
    - setPosition(position: Vector3): Vector3
    - setRadius(radius: Vector3): Vector3
    - setParent(parent: Environment): Environment
    - setSource(source: Environment): Environment
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
Description: This class represents information in the environment. It has a polarity, a domain, a state, a position, a radius, a parent, and a source. The polarity is the polarity of the information. The domain is the domain in which the information exists. The state is the state of the information. The position is the position of the information. The radius is the radius of the information. The parent is the parent environment of the information. The source is the source environment of the information. The constructor takes a parent environment, a source environment, a position, and an optional radius. The setPolarity method takes a polarity and sets the polarity of the information. The setDomain method takes a domain and sets the domain of the information. The setState method takes a state and sets the state of the information. The setPosition method takes a position and sets the position of the information. The setRadius method takes a radius and sets the radius of the information. The setParent method takes a parent and sets the parent of the information. The setSource method takes a source and sets the source of the information. The quantizeState method quantizes the state of the information. The unQuantizeState method un-quantizes the state of the information. The polarityBetween method takes another information and returns the polarity between the information and the other information. The visibleObjects method returns all the information that is within the radius of the information and not blocked by another information. The has method takes another information and returns true if the information has the other information. The get method takes another information and returns the information if the information has the other information. The set method takes another information and a new information and sets the information to the new information if the information has the other information. The all method returns all the information that is within the radius of the information. The clearQueue method clears the queue of the information. The advanceState method advances the state of the information. The static NULL property is the null information. The toString method returns a string representation of the information. The clone method returns a clone of the information.

Environment constructor: constructor(public parent: EnvironmentRoot, public radius: Vector3)
Infortmation constructor: constructor(public parent: Environment, public source: Environment, public position: Vector3, public radius?: Vector3)

The below test coverage fully covers the above class.

*/
import { expect } from 'chai';
import { Environment } from '../src/environment';
import { Information } from '../src/information';
import { Polarity } from '../src/polarity';
import { Handler } from '../src/handler';
import { Vector3 } from '../src/vector';

describe('Information', () => {
    const environment = new Environment(null, new Vector3(0, 0, 0));
    const position = new Vector3(0, 0, 0);
    const radius = new Vector3(0, 0, 0);
    const information = new Information(environment, environment, position, radius);

    describe('constructor', () => {
        it('should create an information', () => {
            expect(information).to.not.be.null;
        });
    });

    describe('setPolarity', () => {
        it('should set the polarity of the information', () => {
            information.polarity = (Polarity.POSITIVE;
            expect(information.polarity).to.equal(Polarity.POSITIVE);
        });
    });

    describe('setDomain', () => {
        it('should set the domain of the information', () => {
            information.setDomain('local');
            expect(information.domain).to.equal('local');
        });
    });

    describe('setState', () => {
        it('should set the state of the information', () => {
            information.setState('emission');
            expect(information.state).to.equal('emission');
        });
    });

    describe('setPosition', () => {
        it('should set the position of the information', () => {
            information.setPosition(new Vector3(0, 0, 0));
            expect(information.position).to.deep.equal(new Vector3(0, 0, 0));
        });
    });

    describe('setRadius', () => {
        it('should set the radius of the information', () => {
            information.setRadius(new Vector3(0, 0, 0));
            expect(information.radius).to.deep.equal(new Vector3(0, 0, 0));
        });
    });

    describe('setParent', () => {
        it('should set the parent of the information', () => {
            information.setParent(environment);
            expect(information.parent).to.equal(environment);
        });
    });

    describe('setSource', () => {
        it('should set the source of the information', () => {
            information.setSource(environment);
            expect(information.source).to.equal(environment);
        });
    });

    describe('quantizeState', () => {
        it('should quantize the state of the information', () => {
            information.quantizeState();
            expect(information.state).to.equal('emission');
        });
    });