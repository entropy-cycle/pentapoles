import { EnvironmentBase, EnvironmentRoot } from './envbase';
import { LocaleInformation } from './localeinfo';
import { Vector3 } from './vector';
export declare class Environment extends EnvironmentBase {
    parent: EnvironmentRoot;
    radius: Vector3;
    constructor(parent: EnvironmentRoot, radius: Vector3);
    /**
     * get the locale information for this environment. Locale information is information that is relative to
     * the environment's position and rotation.
     * @param position
     * @param radius
     * @returns
     */
    getLocaleInformation(position: Vector3, radius: Vector3): LocaleInformation[];
    /**
     * get the global information for this environment. Global information is information that is not relative to
     * the environment's position and rotation. global information is the sum of the information from all of the
     * children of the environment.
     * @returns
     */
    getGlobalInformation(): LocaleInformation;
    /**
     * add a child to the environment in a specific position and radius as a physical environment
     * @param info
     * @param position
     * @param radius
     */
    addLocality(info: Environment, position: Vector3, radius: Vector3): void;
    /**
     * called when the passed locale information is absorbed by this environment. The passed locale information
     * is absorbed by this environment when the passed locale information is within the radius of this environment
     * and the passed locale information is not blocked by another environment in the line of sight between this
     * environment and the passed locale information. Absorbed locale information interacts with the environment,
     * @param info
     */
    absorbed(info: LocaleInformation): void;
    /**
     * add locale information to the environment in a specific position and radius. locale information is information
     * that is relative to the environment's position and rotation.
     * @param info
     * @param position
     * @param radius
     */
    addLocaleInformation(info: LocaleInformation, position: Vector3, radius: Vector3): void;
    /**
     * update the locale information for this environment. locale information is information that is relative to
     * the environment's position and rotation.
     * @param info
     */
    updateLocaleInformation(info: LocaleInformation): void;
    /**
     * remove locale information from the environment
     * @param info
     */
    removeLocaleInformation(info: LocaleInformation): void;
    /**
     * update the state of the environment, including the state of the children. To advance the state, the environment
     * must be updated with the new information. We do this in two steps to allow the environment to process all of the
     * information before updating the children. Step 1: update the environment with the new information. Step 2: update
     * the children with the new information.
     */
    update(): void;
    /**
     * clear the queue of information to be processed
     */
    clearQueue(): void;
    toString(): any;
}
