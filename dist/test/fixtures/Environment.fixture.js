"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// a fixture for creating a pentapoles environment for testing
const src_1 = require("../../src");
const vector_1 = require("../../src/vector");
function createFixture() {
    const environment = new src_1.Environment(null, [], new src_1.LocalInformation(null, new vector_1.Vector3(0, 0, 0), new vector_1.Vector3(0, 0, 0)));
    const ginfo = environment.globalInformation;
    if (!ginfo)
        throw new Error('global information is null');
    const poles = [];
    for (let i = 0; i < 5; i++) {
        const localInformation = environment.getLocalInformation(new vector_1.Vector3(i * 100, 0, 0), new vector_1.Vector3(0, 0, 0));
        const pole = new src_1.Pole(ginfo, localInformation.source.children, 0x191e);
        // tweak the alignments of the poles
        pole.absorber.alignment = new vector_1.Vector3(0, 0, 0);
        pole.listener.alignment = new vector_1.Vector3(0, 0, 0);
        pole.executor.alignment = new vector_1.Vector3(0, 0, 0);
        pole.mediator.alignment = new vector_1.Vector3(0, 0, 0);
        pole.emitter.alignment = new vector_1.Vector3(0, 0, 0);
        poles.push(pole);
    }
    return environment;
}
exports.default = createFixture;
