# Pentapolar Representation

## Summary

Pentapolar representation is a representation of the world as a pentapole. A pentapole can by any of the following:

1. an absorber
2. absorbtion
3. a listener
4. listening
5. an executor
6. execution
7. a mediator
8. mediation
9. a radiator
10. radiaton

### Information Flow

Information flows from the absorber to the radiator. The absorber absorbs information from the environment. The radiator radiates information to the environment. The listener listens to the environment. The executor executes information. The mediator mediates between the absorber and the radiator.

```
Absorber --> Listener --> Executor --> Mediator --> Radiator
```

```
Absorber --> Absorption --> Listener --> Listening --> Executor --> Execution --> Mediator --> Mediation --> Radiator --> Radiation
```

```
The absorber is the monopole that absorbs energy from the environment.
The listener is the monopole that listens to the environment.
The executor is the monopole that decides what to do.
The mediator is the monopole that mediates between the absorber and the radiator.
The radiator is the monopole that radiates energy to the environment.
```

The absorber, the listener, the executor, the mediator, and the radiator are all monopoles.

```
Absorption is the dipole that absorbs energy from the environment.
Listening is the dipole that listens to the environment.
Execution is the dipole that decides what to do.
Mediation is the dipole that mediates between the absorber and the radiator.
Radiation is the dipole that radiates energy to the environment.
```

# dipoles

A dipole is a complete cycle of poles.

```
local absorber --> global actor --> local radiator
local radiator --> global actor --> local absorber
global absorber --> local actor --> global radiator
global radiator --> local actor --> global absorber
```

# monopoles

A monopole is a pole that is not part of a cycle.

```
local absorber --> global actor = real-world example: a black hole
global actor --> local radiator = real-world example: a star
local radiator --> global actor = real-world example: a star
global actor --> local absorber = real-world example: a black hole
```

# tripoles

A tripole is a dipole with a local absorber connected to the global actor

```
local absorber --> global radiator --> local radiator
                        |
                        |
                        |
                  local absorber
```

```
global absorber --> local radiator --> global radiator
                        |
                        |
                        |
                  global absorber
```

```
local radiator --> global absorber --> local radiator
                        |
                        |
                        |
                  local radiator
```
```
global radiator --> local absorber --> global radiator
                        |
                        |
                        |
                  global radiator
```

# Tripoles are environments

Tripoles are environments composed of other environments. The specific values of any object in each environment is opaque to the other environments and only visible as the emergent properties of the environment. This allows for the creation of complex environments that are composed of other environments.

# An API for creating tripolar environments

A simple-but-powerful javascript object model / API for creating tripolar environments is documented below:

```mermaid
classDiagram
    class Environment {
        +childred(): Environment[];
        +parent(): Environment;

        +absorb()
        +listen()
        +execute()
        +mediate()
        +emit()
    }
    class Absorber {
        +create()
        +absorb()
    }
    class Listener {
        +create()
        +listen()
    }
    class Executor {
        +create()
        +execute()
    }
    class Mediator {
        +create()
        +mediate()
    }
    class Emitter {
        +create()
        +emit()
    }
    class LocalInformation {
        +absorb()
        +listen()
        +execute()
        +mediate()
        +emit()
    }
    class Pole {
        absorber: Absorber;
        radiator: Radiator;
        listener: Listener;
        mediator: Mediator;
        executor: Executor;

        +absorb(info: LocalInformation): Absorption[];
        +listen(info: LocalInformation): Listening[];
        +execute(info: LocalInformation): Execution[];
        +mediate(info: LocalInformation): Mediation[];
        +emission(info: LocalInformation): Emission[];
    }
    class Absorption {
        +absorb(info: LocalInformation): Absorption[];
    }
    class Listening {
        +listen(info: LocalInformation): Listening[];
    }
    class Execution {
        +execute(info: LocalInformation): Execution[];
    }
    class Mediation {
        +mediate(info: LocalInformation): Mediation[];
    }
    class Emission {
        +emit(info: LocalInformation): Emission[];
    }
    class Dipole {
        +absorb(info: LocalInformation): Absorption[];
        +listen(info: LocalInformation): Listening[];
        +execute(info: LocalInformation): Execution[];
        +mediate(info: LocalInformation): Mediation[];
        +emission(info: LocalInformation): Emission[];
    }
    
    Absorber <|-- Environment
    Radiator <|-- Environment
    Listener <|-- Environment
    Mediator <|-- Environment
    Executor <|-- Environment

    Absorber <|-- Dipole
    Radiator <|-- Dipole

    Absorber <|-- Monopole
    Radiator <|-- Monopole

    Absorber <|-- LocalInformation
    Radiator <|-- LocalInformation
    Listener <|-- LocalInformation
    Mediator <|-- LocalInformation
    Executor <|-- LocalInformation

    Absorber <|-- Pole
    Radiator <|-- Pole
    Listener <|-- Pole
    Mediator <|-- Pole
    Executor <|-- Pole

    Absorption <|-- Dipole
    Listening <|-- Dipole
    Execution <|-- Dipole
    Mediation <|-- Dipole
    Emission <|-- Dipole

```

## explanation of the code

the above code implements a computer which represents all elements in its universe 
as pentapolar systems - systems of five poles. the poles are: absorber, listener, executor, mediator, and radiator. 
the absorber absorbs information, the listener listens to information, the executor executes information, the mediator 
mediates information, and the radiator radiates information. a pole is an environment, which is a class that contains 
local informations and global information. local informations are information that is local to the pole. global 
information is the information that is global to the pole. a pole also contains a parent environment. a pole has a 
local information that is the global information of the pole, and the pole contains local informations. the pole's 
local informations are the local informations of the pole's parent environment. the pole's local information is 
the global information of the pole's parent environment etc.

### Pole Class

the pole class is the basic computational unit of the computer. the pole class is an environment, which is a class 
(hence is a recursive data structure) that contains local informations and global information. local informations are 
information that is local to the pole. global information is the information that is global to the pole. a pole also
contains a parent environment etc. How each of the poles are oriented in relation to each other determines the
computational power of the computer. Each of the poles are oriented in relation to each other in a way that
determines the computational power of the computer, as well as determines how local information is processed. 
Each pole stores its orientation using a Vector3. The pole's orientation is the direction that the pole is oriented
in relation to the pole's parent environment. Some common orientations include:

#### pole orientation to absorber data
| pole orientation | absorber data | description                                                                   |
|------------------|---------------|-------------------------------------------------------------------------------|
| (0, 0, 0)        | 0             | same direction as the pole's parent environment                               |
| (1, 0, 0)        | 1             | opposite direction as the pole's parent environment                           |
| (0, 1, 0)        | 2             | same direction as the pole's parent environment, but rotated 90 degrees       |
| (0, 0, 1)        | 3             | same direction as the pole's parent environment, but rotated 90 degrees       |
| (1, 1, 0)        | 4             | opposite direction as the pole's parent environment, but rotated 90 degrees   |
| (1, 0, 1)        | 5             | opposite direction as the pole's parent environment, but rotated 90 degrees   |
| (0, 1, 1)        | 6             | same direction as the pole's parent environment, but rotated 180 degrees      |
| (1, 1, 1)        | 7             | opposite direction as the pole's parent environment, but rotated 180 degrees  |
--------------------------------------------------------------------------------------------------------------------

# Common Pole Orientations

| pole orientation | absorber data | listener data | executor data | mediator data | radiator data | description |
|------------------|---------------|---------------|---------------|---------------|---------------|-------------|
| (0, 0, 0)        | 0             | 0             | 0             | 0             | 0             | same direction as the pole's parent environment |
| (1, 0, 0)        | 1             | 1             | 1             | 1             | 1             | opposite direction as the pole's parent environment |
| (0, 1, 0)        | 2             | 2             | 2             | 2             | 2             | same direction as the pole's parent environment, but rotated 90 degrees |
| (0, 0, 1)        | 3             | 3             | 3             | 3             | 3             | same direction as the pole's parent environment, but rotated 90 degrees |
| (1, 1, 0)        | 4             | 4             | 4             | 4             | 4             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (1, 0, 1)        | 5             | 5             | 5             | 5             | 5             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (0, 1, 1)        | 6             | 6             | 6             | 6             | 6             | same direction as the pole's parent environment, but rotated 180 degrees |
| (1, 1, 1)        | 7             | 7             | 7             | 7             | 7             | opposite direction as the pole's parent environment, but rotated 180 degrees |


# Monopolar Configurations

Monopolar configurations are configurations of one pole. Monopolar configurations are used to represent simple 
computational tasks. For example, a monopolar configuration of an absorber pole can be used to represent a task such as 
reading data from a file. Monopolar configurations are also used to represent basic logic operations such as AND and OR. 
In a monopolar configuration, the pole is oriented in the same direction as the pole's parent environment. Examples of monopoles include:

## Monopolar Configurations

| pole orientation | absorber data | listener data | executor data | mediator data | radiator data | description |
|------------------|---------------|---------------|---------------|---------------|---------------|-------------|
| (0, 0, 0)        | 0             | 0             | 0             | 0             | 0             | same direction as the pole's parent environment |
| (1, 0, 0)        | 1             | 1             | 1             | 1             | 1             | opposite direction as the pole's parent environment |
| (0, 1, 0)        | 2             | 2             | 2             | 2             | 2             | same direction as the pole's parent environment, but rotated 90 degrees |
| (0, 0, 1)        | 3             | 3             | 3             | 3             | 3             | same direction as the pole's parent environment, but rotated 90 degrees |
| (1, 1, 0)        | 4             | 4             | 4             | 4             | 4             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (1, 0, 1)        | 5             | 5             | 5             | 5             | 5             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (0, 1, 1)        | 6             | 6             | 6             | 6             | 6             | same direction as the pole's parent environment, but rotated 180 degrees |
| (1, 1, 1)        | 7             | 7             | 7             | 7             | 7             | opposite direction as the pole's parent environment, but rotated 180 degrees |

# Dipolar Configurations

Dipolar configurations represent dipoles, or two poles which are connected to each other. Dipoles are used to represent 
more complex computations. For example, a dipole of an absorber and a listener can be used to represent a task such as 
reading data from a file and processing it. Dipoles are also used to represent logic operations such as NAND and NOR. 
In a dipolar configuration, the poles are oriented in opposite directions in relation to the pole's parent environment. 
Examples of dipoles include:


| pole orientation | absorber data | listener data | executor data | mediator data | radiator data | description |
|------------------|---------------|---------------|---------------|---------------|---------------|-------------|
| (0, 0, 0)        | 0             | 0             | 0             | 0             | 0             | same direction as the pole's parent environment |
| (1, 0, 0)        | 1             | 1             | 1             | 1             | 1             | opposite direction as the pole's parent environment |
| (0, 1, 0)        | 2             | 2             | 2             | 2             | 2             | same direction as the pole's parent environment, but rotated 90 degrees |
| (0, 0, 1)        | 3             | 3             | 3             | 3             | 3             | same direction as the pole's parent environment, but rotated 90 degrees |
| (1, 1, 0)        | 4             | 4             | 4             | 4             | 4             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (1, 0, 1)        | 5             | 5             | 5             | 5             | 5             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (0, 1, 1)        | 6             | 6             | 6             | 6             | 6             | same direction as the pole's parent environment, but rotated 180 degrees |
| (1, 1, 1)        | 7             | 7             | 7             | 7             | 7             | opposite direction as the pole's parent environment, but rotated 180 degrees |

# Tripolar Configurations

Tripolar configurations are configurations of three poles which are connected to each other. Tripolar configurations 
are used to represent more complex computations. For example, a tripolar configuration of an absorber, a listener, 
and an executor can be used to represent a task such as reading data from a file, processing it, and then executing an 
action based on the data. Tripolar configurations are also used to represent more complex logic operations such as 
XOR and XNOR. In a tripolar configuration, the poles are oriented in the same direction in relation to the pole's 
parent environment. Examples of tripoles include:

| pole orientation | absorber data | listener data | executor data | mediator data | radiator data | description |
|------------------|---------------|---------------|---------------|---------------|---------------|-------------|
| (0, 0, 0)        | 0             | 0             | 0             | 0             | 0             | same direction as the pole's parent environment |
| (1, 0, 0)        | 1             | 1             | 1             | 1             | 1             | opposite direction as the pole's parent environment |
| (0, 1, 0)        | 2             | 2             | 2             | 2             | 2             | same direction as the pole's parent environment, but rotated 90 degrees |
| (0, 0, 1)        | 3             | 3             | 3             | 3             | 3             | same direction as the pole's parent environment, but rotated 90 degrees |
| (1, 1, 0)        | 4             | 4             | 4             | 4             | 4             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (1, 0, 1)        | 5             | 5             | 5             | 5             | 5             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (0, 1, 1)        | 6             | 6             | 6             | 6             | 6             | same direction as the pole's parent environment, but rotated 180 degrees |
| (1, 1, 1)        | 7             | 7             | 7             | 7             | 7             | opposite direction as the pole's parent environment, but rotated 180 degrees |

# Multipolar Configurations

Multipolar configurations are configurations of more than three poles. Multipolar configurations are used to represent 
the most complex computations. For example, a multipolar configuration of an absorber, a listener, an executor, a 
mediator, and a radiator can be used to represent tasks such as reading data from multiple files, processing it, and 
then executing multiple actions based on the data. Multipolar configurations are also used to represent the most 
complex logic operations. In a multipolar configuration, the poles are oriented in different directions in relation 
to the pole's parent environment. Examples of multipoles include:

| pole orientation | absorber data | listener data | executor data | mediator data | radiator data | description |
|------------------|---------------|---------------|---------------|---------------|---------------|-------------|
| (0, 0, 0)        | 0             | 0             | 0             | 0             | 0             | same direction as the pole's parent environment |
| (1, 0, 0)        | 1             | 1             | 1             | 1             | 1             | opposite direction as the pole's parent environment |
| (0, 1, 0)        | 2             | 2             | 2             | 2             | 2             | same direction as the pole's parent environment, but rotated 90 degrees |
| (0, 0, 1)        | 3             | 3             | 3             | 3             | 3             | same direction as the pole's parent environment, but rotated 90 degrees |
| (1, 1, 0)        | 4             | 4             | 4             | 4             | 4             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (1, 0, 1)        | 5             | 5             | 5             | 5             | 5             | opposite direction as the pole's parent environment, but rotated 90 degrees |
| (0, 1, 1)        | 6             | 6             | 6             | 6             | 6             | same direction as the pole's parent environment, but rotated 180 degrees |
| (1, 1, 1)        | 7             | 7             | 7             | 7             | 7             | opposite direction as the pole's parent environment, but rotated 180 degrees |

# Representing Multipoles

Multipole shorthand treats each of the vector3s as a binay numerical representation, concatenating all five values together into a single number. For example:

Absorber - (1, 0, 0), Listener - (1, 0, 1), Executor - (0, 1, 0), Mediator - (0, 0, 1), Radiator - (1, 1, 0) becomes 101 101 010 001 110 becomes 1011010100110 binary which is 5798 decimal, 0x16a6 hex.

This shorthand allows for easy representation of multipoles and their orientations, and is used in the computer's programming language to quickly describe the orientation of a multipole.

## Examples

| absorber | listener | executor | mediator | radiator | binary value | decimal value | hex value |
|----------|----------|----------|----------|----------|--------------|---------------|-----------|
| (1, 0, 0) | (1, 0, 1) | (0, 1, 0) | (0, 0, 1) | (1, 1, 0) | 1011010100110 | 5798 | 0x16a6 |
| (1, 0, 0) | (1, 0, 1) | (0, 1, 0) | (0, 0, 1) | (1, 1, 1) | 1011010100111 | 5799 | 0x16a7 |


# Multipole Shorthand

Multipole shorthand is a shorthand notation used to represent multipoles. Multipole shorthand is used to represent 
the most complex computations. For example, a multipolar configuration of an absorber, a listener, an executor, a 
mediator, and a radiator can be used to represent tasks such as reading data from multiple files, processing it, and 
then executing multiple actions based on the data. Multipolar configurations are also used to represent the most 
complex logic operations. In a multipolar configuration, the poles are oriented in different directions in relation 
to the pole's parent environment. Examples of multipoles include:

1. 1011010100110
2. 1011010100110
3. 1011010100111
4. 1011010100110
5. 1011010100110

# Representing Multipoles

Multipole shorthand treats each of the vector3s as a binay numerical representation, concatenating all five values together into a single number. For example:

101 101 010 001 110 becomes 1011010100110 binary which is 5798 decimal, 0x16a6 hex.

This shorthand allows for easy representation of multipoles and their orientations, and is used in the computer's programming language to quickly describe the orientation of a multipole.

# Pole Types

Poles are categorized into five types: Absorbers, Listeners, Executors, Mediators, and Radiators. Each pole type has a unique function in the computer's programming language.

# Absorber

The absorber pole is responsible for absorbing information from its environment. This information is then passed to other poles in the computer. Examples of an absorber include:

- A microphone which absorbs sound waves and converts them into electrical signals.
- A camera which absorbs light waves and converts them into electrical signals.
- A sensor which absorbs a signal from its environment and converts it into an electrical signal.
- A sensor which absorbs a signal from its environment and converts it into a magnetic signal.
- A sensor which absorbs a signal from its environment and converts it into a chemical signal.

# Listener

The listener pole is responsible for listening to the information absorbed by the absorber pole. This information is then passed to other poles in the computer. Examples of a listener include:

- A microphone which listens to the electrical signals absorbed by the absorber pole and converts them into sound waves.
- A camera which listens to the electrical signals absorbed by the absorber pole and converts them into light waves.
- A sensor which listens to the electrical signals absorbed by the absorber pole and converts them into a signal.
- A sensor which listens to the magnetic signals absorbed by the absorber pole and converts them into a signal.
- A sensor which listens to the chemical signals absorbed by the absorber pole and converts them into a signal.

# Executor

The executor pole is responsible for executing the information absorbed by the absorber pole. This information is then passed to other poles in the computer. Examples of an executor include:

- A speaker which executes the electrical signals absorbed by the absorber pole and converts them into sound waves.
- A projector which executes the electrical signals absorbed by the absorber pole and converts them into light waves.
- A motor which executes the electrical signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which executes the magnetic signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which executes the chemical signals absorbed by the absorber pole and converts them into mechanical energy.

# Mediator

The mediator pole is responsible for mediating the information absorbed by the absorber pole. This information is then passed to other poles in the computer. Examples of a mediator include:

- A speaker which mediates the electrical signals absorbed by the absorber pole and converts them into sound waves.
- A projector which mediates the electrical signals absorbed by the absorber pole and converts them into light waves.
- A motor which mediates the electrical signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which mediates the magnetic signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which mediates the chemical signals absorbed by the absorber pole and converts them into mechanical energy.

# Radiator

The radiator pole is responsible for radiating the information absorbed by the absorber pole. This information is then passed to other poles in the computer. Examples of a radiator include:

- A speaker which radiates the electrical signals absorbed by the absorber pole and converts them into sound waves.
- A projector which radiates the electrical signals absorbed by the absorber pole and converts them into light waves.
- A motor which radiates the electrical signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which radiates the magnetic signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which radiates the chemical signals absorbed by the absorber pole and converts them into mechanical energy.

# Mapping Pole Types to Pole Functions

The pole types are mapped to the pole functions as follows:

1. Absorber - (1, 0, 0)
2. Listener - (1, 0, 1)
3. Executor - (0, 1, 0)
4. Mediator - (0, 0, 1)
5. Radiator - (1, 1, 0)

# Pole Functions

Poles have five functions: Absorb, Listen, Execute, Mediate, and Radiate. Each pole function has a unique function in the computer's programming language.

# Absorb

The absorb function is responsible for absorbing information from its environment. This information is then passed to other poles in the computer. Examples of an absorber include:

- A microphone which absorbs sound waves and converts them into electrical signals.
- A camera which absorbs light waves and converts them into electrical signals.
- A sensor which absorbs a signal from its environment and converts it into an electrical signal.
- A sensor which absorbs a signal from its environment and converts it into a magnetic signal.
- A sensor which absorbs a signal from its environment and converts it into a chemical signal.

# Listen

The listen function is responsible for listening to the information absorbed by the absorber pole. This information is then passed to other poles in the computer. Examples of a listener include:

- A microphone which listens to the electrical signals absorbed by the absorber pole and converts them into sound waves.
- A camera which listens to the electrical signals absorbed by the absorber pole and converts them into light waves.
- A sensor which listens to the electrical signals absorbed by the absorber pole and converts them into a signal.
- A sensor which listens to the magnetic signals absorbed by the absorber pole and converts them into a signal.
- A sensor which listens to the chemical signals absorbed by the absorber pole and converts them into a signal.

# Execute

The execute function is responsible for executing the information absorbed by the absorber pole. This information is then passed to other poles in the computer. Examples of an executor include:

- A speaker which executes the electrical signals absorbed by the absorber pole and converts them into sound waves.
- A projector which executes the electrical signals absorbed by the absorber pole and converts them into light waves.
- A motor which executes the electrical signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which executes the magnetic signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which executes the chemical signals absorbed by the absorber pole and converts them into mechanical energy.

# Mediate

The mediate function is responsible for mediating the information absorbed by the absorber pole. This information is then passed to other poles in the computer. Examples of a mediator include:

- A speaker which mediates the electrical signals absorbed by the absorber pole and converts them into sound waves.
- A projector which mediates the electrical signals absorbed by the absorber pole and converts them into light waves.
- A motor which mediates the electrical signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which mediates the magnetic signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which mediates the chemical signals absorbed by the absorber pole and converts them into mechanical energy.

# Radiate

The radiate function is responsible for radiating the information absorbed by the absorber pole. This information is then passed to other poles in the computer. Examples of a radiator include:

- A speaker which radiates the electrical signals absorbed by the absorber pole and converts them into sound waves.
- A projector which radiates the electrical signals absorbed by the absorber pole and converts them into light waves.
- A motor which radiates the electrical signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which radiates the magnetic signals absorbed by the absorber pole and converts them into mechanical energy.
- A motor which radiates the chemical signals absorbed by the absorber pole and converts them into mechanical energy.

# Mapping Pole Functions to Pole Types

The pole functions are mapped to the pole types as follows:

1. Absorb - (1, 0, 0)
2. Listen - (1, 0, 1)
3. Execute - (0, 1, 0)
4. Mediate - (0, 0, 1)
5. Radiate - (1, 1, 0)

# Real World Examples

The following are real world examples of poles:

Micropone -> Speaker

This is an example of a pole pair. The microphone is an absorber pole which absorbs sound waves and converts them into electrical signals. The speaker is an executor pole which executes the electrical signals absorbed by the absorber pole and converts them into sound waves.

Camera -> Projector

This is an example of a pole pair. The camera is an absorber pole which absorbs light waves and converts them into electrical signals. The projector is an executor pole which executes the electrical signals absorbed by the absorber pole and converts them into light waves.

# Pole Pair

A pole pair is a pair of poles which are connected to each other. The poles in a pole pair are connected to each other by a wire. The poles in a pole pair can be of different types. The poles in a pole pair can be of different functions. The poles in a pole pair can be of different types and functions. The poles in a pole pair can be of the same type. The poles in a pole pair can be of the same function. The poles in a pole pair can be of the same type and function. The poles in a pole pair can be of different types and the same function. The poles in a pole pair can be of different functions and the same type. The poles in a pole pair can be of the same type and the same function.

# Pole Triad

A pole triad is a triad of poles which are connected to each other. The poles in a pole triad are connected to each other by a wire. The poles in a pole triad can be of different types. The poles in a pole triad can be of different functions. The poles in a pole triad can be of different types and functions. The poles in a pole triad can be of the same type. The poles in a pole triad can be of the same function. The poles in a pole triad can be of the same type and function. The poles in a pole triad can be of different types and the same function. The poles in a pole triad can be of different functions and the same type. The poles in a pole triad can be of the same type and the same function.

# Pole Quad

A pole quad is a quad of poles which are connected to each other. The poles in a pole quad are connected to each other by a wire. The poles in a pole quad can be of different types. The poles in a pole quad can be of different functions. The poles in a pole quad can be of different types and functions. The poles in a pole quad can be of the same type. The poles in a pole quad can be of the same function. The poles in a pole quad can be of the same type and function. The poles in a pole quad can be of different types and the same function. The poles in a pole quad can be of different functions and the same type. The poles in a pole quad can be of the same type and the same function.

# Pole Quint

A pole quint is a quint of poles which are connected to each other. The poles in a pole quint are connected to each other by a wire. The poles in a pole quint can be of different types. The poles in a pole quint can be of different functions. The poles in a pole quint can be of different types and functions. The poles in a pole quint can be of the same type. The poles in a pole quint can be of the same function. The poles in a pole quint can be of the same type and function. The poles in a pole quint can be of different types and the same function. The poles in a pole quint can be of different functions and the same type. The poles in a pole quint can be of the same type and the same function.
