# Pentapolar Class Diagrams

This document contains class diagrams that visually represent the structure and relationships between classes in the pentapolar system.

## Core Class Hierarchy

The following diagram illustrates the inheritance relationships between the main classes in the pentapolar system:

```mermaid
classDiagram
    class Environment {
        +children(): Environment[]
        +parent(): Environment
        +absorb()
        +listen()
        +execute()
        +mediate()
        +emit()
    }
    
    class Information {
        +Polarity polarity
        +polarityBetween(other: Information): Polarity
        +static NULL: Information
        +toString(): string
        +clone(): Information
    }
    
    class LocaleInformation {
        +Vector3 position
        +Vector3 velocity
        +Vector3 rotation
        +number mass
        +number time
        +update(): void
        +clearQueue(): void
        +forceBetween(other: LocaleInformation): Vector3
        +visibleObjects(): LocaleInformation[]
        +updateLocaleInformation(info: LocaleInformation): void
        +removeLocaleInformation(info: LocaleInformation): void
        +has(info): boolean
        +get(info): LocaleInformation
        +set(info, value): void
        +values(): LocaleInformation[]
        +on(event, eventHandler): void
        +off(event, eventHandler): void
        +once(event, eventHandler): void
        +emit(event, info): void
        +toString(): string
        +clone(): LocaleInformation
    }
    
    class Polarity {
        +number absorb
        +number listen
        +number execute
        +number mediate
        +number emit
        +setAbsorb(listen, execute, mediate, emit): void
        +get(): number[]
        +toString(): string
        +clone(): Polarity
    }
    
    class Handler {
        +target: Environment
        +constructor(event, callback, executeOnce): void
        +handle(event, info): void
    }
    
    class Ray {
        +intersectsSphere(ray: Ray, radius: number): boolean
    }
    
    class Renderer {
        +render(position, direction, radius): void
    }
    
    Environment <|-- Information
    Environment <|-- LocaleInformation
    Environment <|-- Polarity
    Environment <|-- Handler
    Environment <|-- Ray
    Environment <|-- Renderer
    
    Information <|-- LocaleInformation
```

## Specialized Pole Classes

The following diagram shows the relationship between the Environment class and the specialized pole classes:

```mermaid
classDiagram
    class Environment {
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
    
    Absorber <|-- Environment
    Listener <|-- Environment
    Executor <|-- Environment
    Mediator <|-- Environment
    Emitter <|-- Environment
```

## Information and Pole Relationships

This diagram illustrates the relationships between information types and pole functions:

```mermaid
classDiagram
    class Pole {
        +absorber: Absorber
        +listener: Listener
        +executor: Executor
        +mediator: Mediator
        +radiator: Radiator
        +absorb(info: LocalInformation): Absorption[]
        +listen(info: LocalInformation): Listening[]
        +execute(info: LocalInformation): Execution[]
        +mediate(info: LocalInformation): Mediation[]
        +emit(info: LocalInformation): Emission[]
    }
    
    class LocalInformation {
        +absorb()
        +listen()
        +execute()
        +mediate()
        +emit()
    }
    
    class Absorption {
        +absorb(info: LocalInformation): Absorption[]
    }
    
    class Listening {
        +listen(info: LocalInformation): Listening[]
    }
    
    class Execution {
        +execute(info: LocalInformation): Execution[]
    }
    
    class Mediation {
        +mediate(info: LocalInformation): Mediation[]
    }
    
    class Emission {
        +emit(info: LocalInformation): Emission[]
    }
    
    class Dipole {
        +absorb(info: LocalInformation): Absorption[]
        +listen(info: LocalInformation): Listening[]
        +execute(info: LocalInformation): Execution[]
        +mediate(info: LocalInformation): Mediation[]
        +emit(info: LocalInformation): Emission[]
    }
    
    LocalInformation <|-- Pole
    
    Absorption <|-- Dipole
    Listening <|-- Dipole
    Execution <|-- Dipole
    Mediation <|-- Dipole
    Emission <|-- Dipole
```

## Entity-Relationship Diagram

This diagram visualizes the relationships between the major components in the pentapolar system:

```mermaid
erDiagram
    Environment ||--o{ Environment : contains
    Environment ||--o{ Information : contains
    Environment ||--o{ LocaleInformation : contains
    Environment ||--o{ Polarity : contains
    Environment ||--o{ Handler : contains
    
    Information ||--|| Polarity : has
    LocaleInformation ||--o{ LocaleInformation : references
    
    Environment ||--|| Absorber : has
    Environment ||--|| Listener : has
    Environment ||--|| Executor : has
    Environment ||--|| Mediator : has
    Environment ||--|| Radiator : has
    
    Pole ||--|| Absorber : contains
    Pole ||--|| Listener : contains
    Pole ||--|| Executor : contains
    Pole ||--|| Mediator : contains
    Pole ||--|| Radiator : contains
```

## Component Interaction Flow

This diagram illustrates how the different components interact in the pentapolar system:

```mermaid
graph LR
    E[Environment] --> I[Information]
    E --> L[LocaleInformation]
    E --> P[Polarity]
    E --> H[Handler]
    E --> R[Ray]
    E --> RD[Renderer]
    
    I --> L
    I --> P
    
    L --> V1[Vector3 position]
    L --> V2[Vector3 velocity]
    L --> V3[Vector3 rotation]
    
    A[Absorber] --> |absorb| B[Listener]
    B --> |listen| C[Executor]
    C --> |execute| D[Mediator]
    D --> |mediate| F[Radiator]
    F --> |emit| A
```

These diagrams provide a comprehensive visual representation of the pentapolar system's structure, helping to understand the relationships between components and the flow of information through the system.