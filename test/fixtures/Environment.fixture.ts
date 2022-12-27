// a fixture for creating a pentapoles environment for testing
import { Environment, Pole } from '../../src';
import { Vector3 } from '../../src/vector'

export default function createFixture() {
    const environment = new Environment(null, []);
    const ginfo = environment.globalInformation;
    if(!ginfo) throw new Error('global information is null');
    const poles = [];
    for (let i = 0; i < 5; i++) {
        const localInformation = environment.getLocalInformation(new Vector3(i * 100, 0, 0), new Vector3(0, 0, 0));
        const pole = new Pole(ginfo, localInformation.source.children, localInformation);
        // tweak the alignments of the poles
        pole.absorber.alignment = new Vector3(0, 0, 0);
        pole.listener.alignment = new Vector3(0, 0, 0);
        pole.executor.alignment = new Vector3(0, 0, 0);
        pole.mediator.alignment = new Vector3(0, 0, 0);
        pole.emitter.alignment = new Vector3(0, 0, 0);
        poles.push(pole);
    }
    return environment;
}