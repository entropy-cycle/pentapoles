// test coverage for vector.ts - covers the Vector2 and Vector3 classes. Uses mocha and chai for testing. test coverage written in typescript.
import { Vector2, Vector3 } from '../src/vector';
import { expect } from 'chai';
import 'mocha';

describe('Vector2', () => {
    describe('constructor', () => {
        it('should create a new Vector2 with the given x and y values', () => {
            const v = new Vector2(1, 2);
            expect(v.x).to.equal(1);
            expect(v.y).to.equal(2);
        });
    });
    describe('add', () => {
        it('should add the given vector to the current vector', () => {
            const v = new Vector2(1, 2);
            const v2 = new Vector2(3, 4);
            const v3 = v.add(v2);
            expect(v3.x).to.equal(4);
            expect(v3.y).to.equal(6);
        });
    });
    describe('sub', () => {
        it('should subtract the given vector from the current vector', () => {
            const v = new Vector2(1, 2);
            const v2 = new Vector2(3, 4);
            const v3 = v.sub(v2);
            expect(v3.x).to.equal(-2);
            expect(v3.y).to.equal(-2);
        });
    });
    describe('multiply', () => {
        it('should multiply the given vector by the current vector', () => {
            const v = new Vector2(1, 2);
            const v2 = new Vector2(3, 4);
            const v3 = v.multiply(v2);
            expect(v3.x).to.equal(3);
            expect(v3.y).to.equal(8);
        });
    });
    describe('divide', () => {
        it('should divide the given vector by the current vector', () => {
            const v = new Vector2(1, 2);
            const v2 = new Vector2(3, 4);
            const v3 = v.divide(v2);
            expect(v3.x).to.equal(1 / 3);
            expect(v3.y).to.equal(0.5);
        });
    });
    describe('dot', () => {
        it('should return the dot product of the current vector and the given vector', () => {
            const v = new Vector2(1, 2);
            const v2 = new Vector2(3, 4);
            const dot = v.dot(v2);
            expect(dot).to.equal(11);
        });
    });
    describe('multiplyScalar', () => {
        it('should multiply the current vector by the given scalar', () => {
            const v = new Vector2(1, 2);
            const v2 = v.multiplyScalar(3);
            expect(v2.x).to.equal(3);
            expect(v2.y).to.equal(6);
        });
    });
    describe('divideScalar', () => {
        it('should divide the current vector by the given scalar', () => {
            const v = new Vector2(1, 2);
            const v2 = v.divideScalar(3);
            expect(v2.x).to.equal(1 / 3);
            expect(v2.y).to.equal(2 / 3);
        });
    });
    describe('length', () => {
        it('should return the length of the current vector', () => {
            const v = new Vector2(3, 4);
            const len = v.length();
            expect(len).to.equal(5);
        });
    });
    describe('distanceTo', () => {
        it('should return the distance between the current vector and the given vector', () => {
            const v = new Vector2(1, 2);
            const v2 = new Vector2(3, 4);
            const distance = v.distanceTo(v2);
            expect(distance).to.equal(2 * Math.sqrt(2));
        });
    });
    describe('directionTo', () => {
        it('should return the direction vector from the current vector to the given vector', () => {
            const v = new Vector2(1, 2);
            const v2 = new Vector2(3, 4);
            const v3 = v.directionTo(v2);
            expect(v3.x).to.equal(1 / Math.sqrt(2));
            expect(v3.y).to.equal(1 / Math.sqrt(2));
        });
    });
    describe('angleTo', () => {
        it('should return the angle between the current vector and the given vector', () => {
            const v = new Vector2(1, 2);
            const v2 = new Vector2(3, 4);
            const angle = v.angleTo(v2);
            expect(angle).to.equal(1 - Math.PI / 4);
        });
    });
    describe('normalize', () => {
        it('should return the normalized vector of the current vector', () => {
            const v = new Vector2(1, 2);
            const v2 = v.normalize();
            expect(v2.x).to.equal(1 / Math.sqrt(5));
            expect(v2.y).to.equal(2 / Math.sqrt(5));
        });
    });
    describe('normal', () => {
        it('should return the normal vector of the current vector', () => {
            const v = new Vector2(1, 2);
            const v2 = v.normal();
            expect(v2.x).to.equal(1 / Math.sqrt(5));
        });
    });
    describe('clone', () => {
        it('should return a clone of the current vector', () => {
            const v = new Vector2(1, 2);
            const v2 = v.clone();
            expect(v2.x).to.equal(v.x);
            expect(v2.y).to.equal(v.y);
        });
    });
    describe('toString', () => {
        it('should return the string representation of the current vector', () => {
            const v = new Vector2(1, 2);
            const str = v.toString();
            expect(str).to.equal('(1,2)');
        });
    });
})

describe('Vector3', () => {
    describe('add', () => {
        it('should return the sum of the current vector and the given vector', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = new Vector3(3, 4, 5);
            const v3 = v.add(v2);
            expect(v3.x).to.equal(4);
            expect(v3.y).to.equal(6);
            expect(v3.z).to.equal(8);
        });
    });
    describe('sub', () => {
        it('should return the difference of the current vector and the given vector', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = new Vector3(3, 4, 5);
            const v3 = v.sub(v2);
            expect(v3.x).to.equal(-2);
            expect(v3.y).to.equal(-2);
            expect(v3.z).to.equal(-2);
        });
    });
    describe('multiply', () => {
        it('should return the product of the current vector and the given vector', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = new Vector3(3, 4, 5);
            const v3 = v.multiply(v2);
            expect(v3.x).to.equal(3);
            expect(v3.y).to.equal(8);
            expect(v3.z).to.equal(15);
        });
    });
    describe('divide', () => {
        it('should return the quotient of the current vector and the given vector', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = new Vector3(3, 4, 5);
            const v3 = v.divide(v2);
            expect(v3.x).to.equal(1 / 3);
            expect(v3.y).to.equal(1 / 2);
            expect(v3.z).to.equal(3 / 5);
        });
    });
    describe('dot', () => {
        it('should return the dot product of the current vector and the given vector', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = new Vector3(3, 4, 5);
            const dot = v.dot(v2);
            expect(dot).to.equal(26);
        });
    });
    describe('multiplyScalar', () => {
        it('should return the product of the current vector and the given scalar', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = v.multiplyScalar(2);
            expect(v2.x).to.equal(2);
            expect(v2.y).to.equal(4);
            expect(v2.z).to.equal(6);
        });
    });
    describe('divideScalar', () => {
        it('should return the quotient of the current vector and the given scalar', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = v.divideScalar(2);
            expect(v2.x).to.equal(1 / 2);
            expect(v2.y).to.equal(2 / 2);
            expect(v2.z).to.equal(3 / 2);
        });
    });
    describe('length', () => {
        it('should return the length of the current vector', () => {
            const v = new Vector3(1, 2, 3);
            const length = v.length();
            expect(length).to.equal(Math.sqrt(14));
        });
    });
    describe('distanceTo', () => {
        it('should return the distance between the current vector and the given vector', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = new Vector3(3, 4, 5);
            const distance = v.distanceTo(v2);
            expect(distance).to.equal(Math.sqrt(12));
        });
    });
    describe('directionTo', () => {
        it('should return the direction from the current vector to the given vector', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = new Vector3(3, 4, 5);
            const direction = v.directionTo(v2);
            expect(direction.x).to.equal(2 / Math.sqrt(12));
        });
    });
    describe('angleTo', () => {
        it('should return the angle between the current vector and the given vector', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = new Vector3(3, 4, 5);
            const angle = v.angleTo(v2);
            expect(angle).to.equal(Math.acos(26 / (Math.sqrt(14) * Math.sqrt(50))));
        });
    });
    describe('normalize', () => {
        it('should return the current vector normalized', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = v.normalize();
            expect(v2.x).to.equal(1 / Math.sqrt(14));
            expect(v2.y).to.equal(2 / Math.sqrt(14));
            expect(v2.z).to.equal(3 / Math.sqrt(14));
        });
    });
    describe('normal', () => {
        it('should return the current vector normalized', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = v.normal();
            expect(v2.x).to.equal(1 / Math.sqrt(14));
            expect(v2.y).to.equal(2 / Math.sqrt(14));
            expect(v2.z).to.equal(3 / Math.sqrt(14));
        });
    });
    describe('clone', () => {
        it('should return a copy of the current vector', () => {
            const v = new Vector3(1, 2, 3);
            const v2 = v.clone();
            expect(v2.x).to.equal(1);
            expect(v2.y).to.equal(2);
            expect(v2.z).to.equal(3);
        });
    });
    describe('projectTo2d', () => {
        it('should return the 2d projection of the current vector', () => {
            const v = new Vector3(1, 2, 3);
            const camera = new Vector3(1, 1, 1);
            const screen = new Vector2(1, 1);
            const rotation = new Vector3(1, 1, 1);
            const scale = 1;
            const v2 = v.projectTo2d(camera, screen, rotation, scale);
            expect(v2.x).to.equal(1);
        });
    });
    describe('toString', () => {
        it('should return a string representation of the current vector', () => {
            const v = new Vector3(1, 2, 3);
            const str = v.toString();
            expect(str).to.equal('(1,2,3)');
        });
    })
})