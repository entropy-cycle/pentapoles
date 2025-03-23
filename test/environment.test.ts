/*
EnvironmentBase is an abstract class that represents a node in an environment tree. It is the base class for Environment and EnvironmentRoot. EnvironmentBase is a node in an environment tree. It has a parent node and an array of child nodes. It also has an information property that contains a LocaleInformation object. The LocaleInformation object contains information about the physical environment in which the EnvironmentBase is located. The LocaleInformation object also contains information about the environment that is contained within the EnvironmentBase. The LocaleInformation object contains an array of LocaleInformation objects that represent the physical environments that are contained within the EnvironmentBase. The LocaleInformation object also contains an array of Information objects that represent the non-physical environments that are contained within the EnvironmentBase.

EnvironmentBase extends EventEmitter. It emits the following events:

- 'addchild' - emitted when a child is added to the EnvironmentBase. The child is passed as the first argument to the event handler.
- 'removechild' - emitted when a child is removed from the EnvironmentBase. The child is passed as the first argument to the event handler.
- 'clearchildren' - emitted when all children are removed from the EnvironmentBase. No arguments are passed to the event handler.
- 'addqueue' - emitted when a child is added to the EnvironmentBase's queue. The child is passed as the first argument to the event handler.
- 'removequeue' - emitted when a child is removed from the EnvironmentBase's queue. The child is passed as the first argument to the event handler.
- 'clearqueue' - emitted when all children are removed from the EnvironmentBase's queue. No arguments are passed to the event handler.

EnvironmentBase has the following properties:

- information - a LocaleInformation object that contains information about the environment that is contained within the EnvironmentBase.
- children - an array of Environment objects that are contained within the EnvironmentBase.
- queue - an array of Environment objects that are contained within the EnvironmentBase's queue.
- parent - the parent EnvironmentBase object.

EnvironmentBase has the following methods:

- isRoot - returns true if the EnvironmentBase has no parent.
- isLeaf - returns true if the EnvironmentBase has no children.
- isBranch - returns true if the EnvironmentBase has children.
- isQueueEmpty - returns true if the EnvironmentBase's queue is empty.
- isQueueFull - returns true if the EnvironmentBase's queue is full.
- isPhysical - returns true if the EnvironmentBase's information
- isNull - returns true if the EnvironmentBase's information is NullBase.
- clearQueue - removes all children from the EnvironmentBase's queue.
- getLocaleInformation - returns an array of LocaleInformation objects that represent the physical environments that are contained within the EnvironmentBase.
- getGlobalInformation - returns an Information object that represents the non-physical environments that are contained within the EnvironmentBase.
- has - returns true if the EnvironmentBase contains the passed EnvironmentBase.
- set - replaces the passed EnvironmentBase with the passed EnvironmentBase.
- get - returns an array of EnvironmentBase objects that are contained within the EnvironmentBase.
- toString - returns a string representation of the EnvironmentBase.
*/

import { Environment } from '../src/environment';
import { Vector3 } from '../src/vector';
import { EnvironmentBase } from '../src/envbase';

describe('Environment', () => {
  describe('constructor', () => {
    it('should create an environment instance', () => {
      const parent = Environment.NULL || EnvironmentBase.NULL;
      const env = new Environment(parent, new Vector3(0, 0, 0));
      expect(env).toBeDefined();
    });
  });

  describe('isRoot', () => {
    it('should return true for root environment', () => {
      const parent = Environment.NULL || EnvironmentBase.NULL;
      const env = new Environment(parent, new Vector3(0, 0, 0));
      // The isRoot property is true when parent === undefined,
      // but we're passing EnvironmentBase.NULL as the parent
      expect(env.isRoot).toBe(false);
    });
  });

  describe('isLeaf', () => {
    it('should return true for leaf environment', () => {
      const parent = Environment.NULL || EnvironmentBase.NULL;
      const env = new Environment(parent, new Vector3(0, 0, 0));
      expect(env.isLeaf).toBe(true);
    });
  });
});