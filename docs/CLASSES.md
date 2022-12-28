# Class Diagrams
This document contains class diagrams for the various classes in the library. The class diagrams are generated using [Mermaid](http://mermaid.live/). The source code for the class diagrams is in this file. The main description for the system is in the [README.md](../README.md) file.

## Class Diagrams

### Class Diagram

```mermaid
classDiagram
    class Environment
    class Information
    class LocaleInformation
    class Polarity
    class Handler
    class Ray
    class Renderer

    Environment <|-- Information
    Environment <|-- LocaleInformation
    Environment <|-- Polarity
    Environment <|-- Handler
    Environment <|-- Ray
    Environment <|-- Renderer

    class information {
        +Polarity polarity;
        +polarityBetween(other: Information): Polarity
        +static NULL: Information
        +toString(): string
        +clone(): Information
    }
    class localeInformation {
        +Vector3 position;
        +Vector3 velocity;
        +Vector3 rotation;
        +number mass;
        +number time;
        +update(): void
        +clearQueue(): void
        +forceBetween(other: LocaleInformation): Vector3
        +visibleObjects(): LocaleInformation[]
        +updateLocaleInformation(info: LocaleInformation): void
        +removeLocaleInformation(info: LocaleInformation): void
        +has_info_LocaleInformation___Environment_: boolean
        +get_info_LocaleInformation___Environment_: LocaleInformation
        +set_info_LocaleInformation__value_LocaleInformation_: void
        +values: LocaleInformation[]
        +on(event: string, eventHandler: Handler): void
        +off(event: string, eventHandler: Handler): void
        +once(event: string, eventHandler: Handler): void
        +emit(event: string, info: LocaleInformation): void
        +toString(): string
        +clone(): LocaleInformation
    }
    class polarity {
        +number absorb;
        +number listen;
        +number execute;
        +number mediate;
        +number emit;
        +setAbsorb(number listen, number execute, number mediate, number emit): void
        +get(): number[]
        +toString(): string
        +clone(): Polarity
    }
    class handler {
        +target: Environment;
        +constructor(event: string, callback: Function, executeOnce: boolean): void
        +handle(event: string, info: LocaleInformation): void
    }
    class ray {
        +intersectsSphere(ray: Ray, radius: number): boolean
    }
    class renderer {
        +render(position: Vector3, direction: Vector3, radius: Vector3): void
    }

    Information <|-- information
    LocaleInformation <|-- localeInformation
    Polarity <|-- polarity
    Handler <|-- handler
    Ray <|-- ray
    Renderer <|-- renderer

    Information <.. LocaleInformation
    Information <.. Polarity
    Information <.. Handler
    Information <.. Ray
    Information <.. Renderer

    Information <|-- Environment
    LocaleInformation <|-- Environment
    Polarity <|-- Environment
    Handler <|-- Environment
    Ray <|-- Environment
    Renderer <|-- Environment
```

### ER Diagram

```mermaid
erDiagram
    Environment ||..|| Information : contains
    Environment ||..|| LocaleInformation : contains
    Environment ||..|| Polarity : contains
    Environment ||..|| Handler : contains
    Environment ||..|| Ray : contains
    Environment ||..|| Renderer : contains
    Information ||--|| LocaleInformation : contains
    Information ||--|| Polarity : contains
    Information ||--|| Handler : contains
    Information ||--|| Ray : contains
    Information ||--|| Renderer : contains
    LocaleInformation ||--|| Polarity : contains
    LocaleInformation ||--|| Handler : contains
    LocaleInformation ||--|| Ray : contains
    LocaleInformation ||--|| Renderer : contains
    Polarity ||--|| Handler : contains
    Polarity ||--|| Ray : contains
    Polarity ||--|| Renderer : contains
    Handler ||--|| Ray : contains
    Handler ||--|| Renderer : contains
    Ray ||--|| Renderer : contains
```