# Pentapolar Fundamentals

## The Five Poles

The pentapolar representation system is built on five fundamental pole types. Each pole represents a specific function in the information processing cycle.

| Pole Type | Function | Vector Representation |
|-----------|----------|----------------------|
| Absorber  | Absorbs information from the environment | (1, 0, 0) |
| Listener  | Processes incoming information | (1, 0, 1) |
| Executor  | Makes decisions based on processed information | (0, 1, 0) |
| Mediator  | Coordinates between processing and output | (0, 0, 1) |
| Radiator  | Outputs information to the environment | (1, 1, 0) |

## Pole Functions

Each pole performs a specific function in the information processing cycle:

### Absorber

The absorber pole is responsible for gathering information from the environment. It acts as an input mechanism, capturing data for processing.

**Examples:**
- A microphone absorbing sound waves
- A camera capturing light
- A sensor collecting environmental data
- An API endpoint receiving requests

### Listener

The listener pole processes the absorbed information. It transforms raw data into a form that can be evaluated and acted upon.

**Examples:**
- A signal processor analyzing audio data
- An image processing system interpreting visual data
- A data parser converting raw input to structured data
- An event handler managing incoming requests

### Executor

The executor pole makes decisions based on the processed information. It determines the appropriate action to take in response to the input.

**Examples:**
- A logic controller executing decision trees
- A rules engine applying business logic
- A neural network making classifications
- A state machine transitioning between states

### Mediator

The mediator pole coordinates between the decision-making process and the output. It ensures coherent transitions and manages interaction between components.

**Examples:**
- A transaction coordinator ensuring data consistency
- A message broker routing between systems
- An orchestration layer managing workflow
- A protocol adapter translating between systems

### Radiator

The radiator pole outputs the processed information back to the environment. It acts as the system's response mechanism.

**Examples:**
- A speaker emitting sound
- A display showing visual information
- An actuator producing physical movement
- An API response delivering data

## Information Flow

The natural information flow in a pentapolar system follows this sequence:

```
Absorber → Listener → Executor → Mediator → Radiator
```

This represents the complete cycle of:
1. Information input (absorption)
2. Information processing (listening)
3. Decision making (execution)
4. Coordination (mediation)
5. Information output (radiation)

This cycle can be represented as discrete poles or as processes connecting those poles:

```
Absorber → Absorption → Listener → Listening → Executor → Execution → Mediator → Mediation → Radiator → Radiation
```

## Poles as Environments

Each pole can be viewed as an environment that contains its own pentapolar system. This recursive structure allows for complex, nested information processing systems.

In the pentapolar framework, all computational units are modeled as poles with specific orientations relative to their parent environments, creating a unified approach to system modeling.