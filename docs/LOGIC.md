# Logic Diagrams

The following diagrams show the logic of the system. The logic diagrams are generated using [Mermaid](http://mermaid.live/). The source code for the logic diagrams is in this file. The main description for the system is in the [README.md](../README.md) file.


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

(this above is a temporary fix for the mermaid syntax highlighting in vscode. It will be removed when the syntax highlighting is fixed.)

## Logic Diagrams

```mermaid
graph LR
    A[Environment] --> B[Information]
    A[Environment] --> C[LocaleInformation]
    A[Environment] --> D[Polarity]
    A[Environment] --> E[Handler]
    A[Environment] --> F[Ray]
    A[Environment] --> G[Renderer]
```


```mermaid
graph LR
    A[Information] --> B[LocaleInformation]
    A[Information] --> C[Polarity]
    A[Information] --> D[Handler]
    A[Information] --> E[Ray]
    A[Information] --> F[Renderer]
```

```mermaid
graph LR
    A[LocaleInformation] --> B[Vector3]
    A[LocaleInformation] --> C[Vector3]
    A[LocaleInformation] --> D[Vector3]
    A[LocaleInformation] --> E[number]
    A[LocaleInformation] --> F[number]
    A[LocaleInformation] --> G[LocaleInformation__]
    A[LocaleInformation] --> H[LocaleInformation]
    A[LocaleInformation] --> I[LocaleInformation]
    A[LocaleInformation] --> J[boolean]
    A[LocaleInformation] --> K[LocaleInformation]
    A[LocaleInformation] --> L[void]
    A[LocaleInformation] --> M[void]
    A[LocaleInformation] --> N[Vector3]
    A[LocaleInformation] --> O[LocaleInformation__]
    A[LocaleInformation] --> P[LocaleInformation]
    A[LocaleInformation] --> Q[LocaleInformation]
    A[LocaleInformation] --> R[void]
    A[LocaleInformation] --> S[void]
    A[LocaleInformation] --> T[string]
    A[LocaleInformation] --> U[LocaleInformation]
```

```mermaid
sequenceDiagram
    participant A as Environment
    participant B as LocaleInformation
    participant C as Vector3
    participant D as Vector3
    participant E as Vector3
    participant F as number
    participant G as number
    participant H as LocaleInformation__
    participant I as LocaleInformation
    participant J as LocaleInformation
    participant K as boolean
    participant L as LocaleInformation
    participant M as void
    participant N as void
    participant O as Vector3
    participant P as LocaleInformation__
    participant Q as LocaleInformation
    participant R as LocaleInformation
    participant S as void
    participant T as void
    participant U as string
    participant V as LocaleInformation
    A->>B: position
    A->>C: Vector3
    A->>D: Vector3
    A->>E: Vector3
    A->>F: number
    A->>G: number
    A->>H: LocaleInformation[]
    A->>I: LocaleInformation
    A->>J: LocaleInformation
    A->>K: boolean
    A->>L: LocaleInformation
    A->>M: void
    A->>N: void
    A->>O: Vector3
    A->>P: LocaleInformation[]
    A->>Q: LocaleInformation
    A->>R: LocaleInformation
    A->>S: void
    A->>T: void
    A->>U: string
    A->>V: LocaleInformation
    B->>C: position
    B->>D: velocity
    B->>E: rotation
    B->>F: mass
    B->>G: time
    B->>H: update()
    B->>I: clearQueue()
    B->>J: forceBetween()
    B->>K: visibleObjects()
    B->>L: updateLocaleInformation()
    B->>M: removeLocaleInformation()
    B->>N: has_info_LocaleInformation___Environment_
    B->>O: get_info_LocaleInformation___Environment_
    B->>P: set_info_LocaleInformation__value_LocaleInformation_
    B->>Q: values
    B->>R: on()
    B->>S: off()
    B->>T: once()
    B->>U: emit()
    B->>V: toString()
```
