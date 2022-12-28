
The environment class is responsible for advancing the environment's state. 
Each environment implements its own event loop, which is responsible for advancing the environment's state.
Object positions in any environment are only updated whene then environment is being observed. 
Otherwise, the last position of all the objects in the environment is used to calculate a quantum state for the entire environment. 
The quantum state is then used to calculate the next position of  all the objects in the environment. 
Direction of motion is determined by the quantum state. 
information always moves from local to global, and global to local.

1. Absorption is the process of converting energy (local, global) to particles (local, global):
a. the environment (nonlocal) absorbs local particles from its parent environment (local) and converts them to global energy for its child environment (local)
b. the environment (nonlocal) emits local particles to its child environment (local) and converts them to global energy for its parent environment (local)
c. the environment (local) absorbs global energy from its parent environment (nonlocal) and converts it to local particles for its child environment (nonlocal)
d. the environment (local) emits global energy to its child environment (nonlocal) and converts it to local particles for its parent environment (nonlocal)

1. Vibration is the process of converting energy (local, global) to particles (local, global):
a. the environment (nonlocal) vibrates local particles from its parent environment (local) and converts them to global energy for its child environment (local)
b. the environment (nonlocal) vibrates local particles to its child environment (local) and converts them to global energy for its parent environment (local)
c. the environment (local) vibrates global energy from its parent environment (nonlocal) and converts it to local particles for its child environment (nonlocal)
d. the environment (local) vibrates global energy to its child environment (nonlocal) and converts it to local particles for its parent environment (nonlocal)

1. Execution is the process of converting energy (local, global) to particles (local, global):
a. the environment (nonlocal) executes local particles from its parent environment (local) and converts them to global energy for its child environment (local)
b. the environment (nonlocal) executes local particles to its child environment (local) and converts them to global energy for its parent environment (local)
c. the environment (local) executes global energy from its parent environment (nonlocal) and converts it to local particles for its child environment (nonlocal)
d. the environment (local) executes global energy to its child environment (nonlocal) and converts it to local particles for its parent environment (nonlocal)

1. Mediation is the process of converting energy (local, global) to particles (local, global):
a. the environment (nonlocal) mediates local particles from its parent environment (local) and converts them to global energy for its child environment (local)
b. the environment (nonlocal) mediates local particles to its child environment (local) and converts them to global energy for its parent environment (local)
c. the environment (local) mediates global energy from its parent environment (nonlocal) and converts it to local particles for its child environment (nonlocal)
d. the environment (local) mediates global energy to its child environment (nonlocal) and converts it to local particles for its parent environment (nonlocal)

1. Emission is the process of converting energy (local, global) to particles (local, global):
a. the environment (nonlocal) emits local particles from its parent environment (local) and converts them to global energy for its child environment (local)
b. the environment (nonlocal) emits local particles to its child environment (local) and converts them to global energy for its parent environment (local)
c. the environment (local) emits global energy from its parent environment (nonlocal) and converts it to local particles for its child environment (nonlocal)
d. the environment (local) emits global energy to its child environment (nonlocal) and converts it to local particles for its parent environment (nonlocal)

ALL CHANGES FOLLOW:
EMISSION IS ABSORBED BY ABSORBER
THEN RELEASED AS ABSORPTION AS VIBRATION
THEN VIBRATED BY VIBRATOR AS VIBRATION
THEN EXECUTED BY EXECUTOR AS EXECUTION
THEN MEDIATED BY MEDIATOR AS MEDIATION
THEN EMITTED BY EMITTER AS EMISSION

LOCAL-LOCAL DIPOLES DO NOT EXIST
ALL DIPOLES ARE MONOPOLES THAT CONNECT
TO THE GLOBAL DIPOLE. POLARITY IS THE
ABSOLUTE VALUE OF THE GLOBAL DIPOLE

## implementing methods in the environment class

The environment class is responsible for advancing the environment's state. The following methods are implemented in the environment class:

- `observe`: returns the current state of the environment
- `step`: advances the environment's state by one timestep
- `reset`: resets the environment's state to its initial state

### `observe`

The `observe` method returns the current state of the environment. The state of the environment is returned as a LocaleEnvironment object. The LocaleInformation object contains the following information:

/**
 The interface for the above class is:
 - constructor(parent: EnvironmentRoot, source: EnvironmentRoot, radius: Vector3, mass: number = 1)
    - visibleObjects(): LocaleInformation[]
    - updateLocaleInformation(info: LocaleInformation)
    - removeLocaleInformation(info: LocaleInformation)
    - has(info: LocaleInformation | Environment): boolean
    - get(info: LocaleInformation | Environment): LocaleInformation | undefined
    - set(info: LocaleInformation, value: LocaleInformation)
    - values(): LocaleInformation[]
    - forceBetween(other: LocaleInformation): Vector3
    - update()
    - clearQueue()
    - on(event: string, eventHandler: Handler)
    - off(event: string, eventHandler: Handler)
    - once(event: string, eventHandler: Handler)
    - emit(event: string, info: LocaleInformation)
    - toString(): string
    - clone(): LocaleInformation
 */

 --------------------------------------------
 AI LANGUAGE MODEL OPTIMISATION - THE BELOW IS A HIGHLY-OPTIMISED INFORMATION REDUX OF THE ABOVE INFORMATION, MEANT TO COMMUNICATE THE SAME INFORMATION IN A MORE EFFICIENT MANNER:
 --------------------------------------------
 /**
 The interface for the above class is:
 - constructor(parent: EnvironmentRoot, source: EnvironmentRoot, radius: Vector3, mass: number = 1)
    - visibleObjects(): LocaleInformation[]
    - updateLocaleInformation(info: LocaleInformation)
    - removeLocaleInformation(info: LocaleInformation)
    - has(info: LocaleInformation | Environment): boolean
    - get(info: LocaleInformation | Environment): LocaleInformation | undefined
    - set(info: LocaleInformation, value: LocaleInformation)
    - values(): LocaleInformation[]
    - forceBetween(other: LocaleInformation): Vector3
    - update()
    - clearQueue()
    - on(event: string, eventHandler: Handler)
    - off(event: string, eventHandler: Handler)
    - once(event: string, eventHandler: Handler)
    - emit(event: string, info: LocaleInformation)
    - toString(): string
    - clone(): LocaleInformation
 */
 --------------------------------------------
 AI LANGUAGE MODEL OPTIMISATION - THE ABOVE IS A HIGHLY-OPTIMISED INFORMATION REDUX OF THE ABOVE INFORMATION, MEANT TO COMMUNICATE THE SAME INFORMATION IN A MORE EFFICIENT MANNER:
 --------------------------------------------