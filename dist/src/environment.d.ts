import { EnvironmentBase, EnvironmentRoot } from './envbase';
import { LocaleInformation } from './localeinfo';
import { Vector3 } from './vector';
export declare class Environment extends EnvironmentBase {
    parent: EnvironmentRoot;
    radius: Vector3;
    constructor(parent: EnvironmentRoot, radius: Vector3);
    /**
     * called when the passed locale information is absorbed by this environment. The passed locale information
     * is absorbed by this environment when the passed locale information is within the radius of this environment
     * and the passed locale information is not blocked by another environment in the line of sight between this
     * environment and the passed locale information. Absorbed locale information interacts with the environment,
     * @param info
     */
    absorbed(info: LocaleInformation): void;
    /**
     * update the state of the environment, including the state of the children. To advance the state, the environment
     * must be updated with the new information. We do this in two steps to allow the environment to process all of the
     * information before updating the children. Step 1: update the environment with the new information. Step 2: update
     * the children with the new information.
     */
    update(): void;
}
