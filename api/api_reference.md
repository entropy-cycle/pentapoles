# Pentapolar API Reference

## Core Classes Overview

The pentapolar system is built around the following core classes:

- **Environment**: The foundational class that represents a pentapolar environment
- **Information**: Base class for all information entities in the system
- **LocaleInformation**: Class that represents information with spatial properties
- **Polarity**: Class that manages the orientation and polarity of pentapolar components
- **Handler**: Class that manages event handling in the pentapolar system
- **Ray**: Class for ray casting and intersection operations
- **Renderer**: Class for rendering pentapolar structures

## Environment Class

The Environment class is the central component of the pentapolar system, representing a complete pentapolar environment.

```typescript
class Environment {
    // Properties
    children(): Environment[];
    parent(): Environment;
    
    // Core pentapolar methods
    absorb(): void;
    listen(): void;
    execute(): void;
    mediate(): void;
    emit(): void;
}
```

### Methods

#### `children()`
Returns an array of all child environments contained within this environment.

#### `parent()`
Returns the parent environment that contains this environment.

#### `absorb()`
Executes the absorption phase of the pentapolar cycle, gathering information from the environment.

#### `listen()`
Executes the listening phase, processing absorbed information.

#### `execute()`
Executes the execution phase, making decisions based on processed information.

#### `mediate()`
Executes the mediation phase, coordinating between processing and output.

#### `emit()`
Executes the radiation phase, outputting processed information to the environment.

## Information Class

The Information class represents the base information entity in the pentapolar system.

```typescript
class Information {
    // Properties
    polarity: Polarity;
    
    // Methods
    polarityBetween(other: Information): Polarity;
    toString(): string;
    clone(): Information;
    
    // Static properties
    static NULL: Information;
}
```

### Methods

#### `polarityBetween(other: Information)`
Calculates the polarity relationship between this information entity and another.

#### `toString()`
Returns a string representation of the information entity.

#### `clone()`
Creates a deep copy of the information entity.

### Static Properties

#### `NULL`
A predefined null information entity, used as a placeholder.

## LocaleInformation Class

The LocaleInformation class extends Information with spatial properties and event handling capabilities.

```typescript
class LocaleInformation extends Information {
    // Spatial properties
    position: Vector3;
    velocity: Vector3;
    rotation: Vector3;
    mass: number;
    time: number;
    
    // Object management
    update(): void;
    clearQueue(): void;
    forceBetween(other: LocaleInformation): Vector3;
    visibleObjects(): LocaleInformation[];
    updateLocaleInformation(info: LocaleInformation): void;
    removeLocaleInformation(info: LocaleInformation): void;
    
    // Collection operations
    has(info: LocaleInformation | Environment): boolean;
    get(info: LocaleInformation | Environment): LocaleInformation | undefined;
    set(info: LocaleInformation, value: LocaleInformation): void;
    values(): LocaleInformation[];
    
    // Event handling
    on(event: string, eventHandler: Handler): void;
    off(event: string, eventHandler: Handler): void;
    once(event: string, eventHandler: Handler): void;
    emit(event: string, info: LocaleInformation): void;
    
    // Utility methods
    toString(): string;
    clone(): LocaleInformation;
}
```

### Methods

#### Spatial Operations

- **`update()`**: Updates the state of the locale information based on physics calculations
- **`clearQueue()`**: Clears any pending operations in the update queue
- **`forceBetween(other: LocaleInformation)`**: Calculates the force vector between this and another LocaleInformation entity
- **`visibleObjects()`**: Returns an array of all LocaleInformation entities visible from this entity's position

#### Object Management

- **`updateLocaleInformation(info: LocaleInformation)`**: Updates a specific locale information entity
- **`removeLocaleInformation(info: LocaleInformation)`**: Removes a specific locale information entity

#### Collection Operations

- **`has(info)`**: Checks if a specific information entity exists in this environment
- **`get(info)`**: Retrieves a specific information entity from this environment
- **`set(info, value)`**: Sets a specific information entity in this environment
- **`values()`**: Returns all information entities in this environment

#### Event Handling

- **`on(event, eventHandler)`**: Registers an event handler for a specific event
- **`off(event, eventHandler)`**: Removes an event handler for a specific event
- **`once(event, eventHandler)`**: Registers an event handler that will be executed only once
- **`emit(event, info)`**: Emits an event with specified information

## Polarity Class

The Polarity class manages the orientation and polarity of pentapolar components.

```typescript
class Polarity {
    // Properties
    absorb: number;
    listen: number;
    execute: number;
    mediate: number;
    emit: number;
    
    // Methods
    setAbsorb(listen: number, execute: number, mediate: number, emit: number): void;
    get(): number[];
    toString(): string;
    clone(): Polarity;
}
```

### Methods

#### `setAbsorb(listen, execute, mediate, emit)`
Sets the polarity values for all five poles.

#### `get()`
Returns an array of the five polarity values.

#### `toString()`
Returns a string representation of the polarity.

#### `clone()`
Creates a deep copy of the polarity.

## Handler Class

The Handler class manages event handling in the pentapolar system.

```typescript
class Handler {
    // Properties
    target: Environment;
    
    // Constructor
    constructor(event: string, callback: Function, executeOnce: boolean): void;
    
    // Methods
    handle(event: string, info: LocaleInformation): void;
}
```

### Methods

#### `constructor(event, callback, executeOnce)`
Creates a new handler for a specific event with the given callback function.

#### `handle(event, info)`
Handles an event with the specified information.

## Ray Class

The Ray class provides functionality for ray casting and intersection operations.

```typescript
class Ray {
    // Methods
    intersectsSphere(ray: Ray, radius: number): boolean;
}
```

### Methods

#### `intersectsSphere(ray, radius)`
Determines if this ray intersects with a sphere of the specified radius.

## Renderer Class

The Renderer class provides functionality for rendering pentapolar structures.

```typescript
class Renderer {
    // Methods
    render(position: Vector3, direction: Vector3, radius: Vector3): void;
}
```

### Methods

#### `render(position, direction, radius)`
Renders a pentapolar structure at the specified position, with the given direction and radius.

## Environment Operations

The Environment class implements the following key operations defined in the algorithm documentation:

### Observation and State Management

- **`observe()`**: Returns the current state of the environment
- **`step()`**: Advances the environment's state by one timestep
- **`reset()`**: Resets the environment's state to its initial state

### Information Transformation

The environment performs the following information transformation processes:

1. **Absorption**: Converting energy (local, global) to particles (local, global)
2. **Vibration/Listening**: Processing and transforming information
3. **Execution**: Making decisions based on processed information
4. **Mediation**: Coordinating between different components
5. **Emission**: Outputting processed information

## Event System

The pentapolar system includes a comprehensive event system that enables communication between components:

```typescript
// Register an event handler
environment.on('absorb', (info) => {
    console.log('Absorption occurred:', info);
});

// Emit an event
environment.emit('absorb', someInformation);

// Register a one-time event handler
environment.once('execute', (info) => {
    console.log('Execution occurred once:', info);
});

// Remove an event handler
environment.off('absorb', handlerReference);
```

## Vector Operations

The system uses Vector3 objects for representing positions, velocities, and orientations:

```typescript
// Create a vector
const position = new Vector3(1, 0, 0);

// Add vectors
const result = position.add(new Vector3(0, 1, 0));

// Calculate distance
const distance = position.distanceTo(anotherVector);

// Normalize a vector
const direction = position.normalize();
```

This comprehensive API provides the foundation for building complex pentapolar systems with well-defined information flow, state management, and event handling capabilities.