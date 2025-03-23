# Polarity and Orientation in Pentapolar Systems

## Vector Representation

In the pentapolar system, each pole's orientation is represented using a three-dimensional vector. This vector indicates how the pole is positioned in relation to its parent environment.

### Basic Vector Encoding

Each pole's orientation is encoded as a Vector3 with binary components (0 or 1):

```
Vector3(x, y, z) where x, y, z ∈ {0, 1}
```

This results in 8 possible orientations for each pole:

| Vector (x,y,z) | Binary Value | Description |
|----------------|--------------|-------------|
| (0, 0, 0) | 000 | Same direction as parent environment |
| (1, 0, 0) | 100 | Opposite direction on x-axis |
| (0, 1, 0) | 010 | Rotated 90° on y-axis |
| (0, 0, 1) | 001 | Rotated 90° on z-axis |
| (1, 1, 0) | 110 | Opposite direction and rotated on y-axis |
| (1, 0, 1) | 101 | Opposite direction and rotated on z-axis |
| (0, 1, 1) | 011 | Rotated 180° from parent environment |
| (1, 1, 1) | 111 | Opposite direction and rotated 180° |

## Standard Pole Orientations

Each of the five pole types has a standard orientation vector:

| Pole Type | Vector Orientation | Binary |
|-----------|-------------------|--------|
| Absorber  | (1, 0, 0) | 100 |
| Listener  | (1, 0, 1) | 101 |
| Executor  | (0, 1, 0) | 010 |
| Mediator  | (0, 0, 1) | 001 |
| Radiator  | (1, 1, 0) | 110 |

These standard orientations provide a foundation for defining pole functionality, though poles can adopt different orientations depending on their specific role in a configuration.

## Polarity

Polarity in the pentapolar system refers to the combined orientation values of all poles in a configuration. The polarity determines how information flows through the system and influences its computational behavior.

### Polarity Properties

- **Absolute Value**: The polarity is the absolute value of the global dipole, determining the strength of interaction
- **Direction**: The orientation vectors indicate the direction of information flow
- **Interaction**: Pole orientations relative to each other define how they interact and process information

## Multipole Encoding

For complex multipolar configurations, a compact representation is used to encode the orientations of all five poles:

1. Each pole's orientation is represented as a 3-bit binary number
2. The five 3-bit numbers are concatenated to form a 15-bit binary number
3. This binary number can be converted to decimal or hexadecimal for concise notation

### Encoding Process

1. Convert each Vector3 to its binary representation:
   - (1,0,0) → 100
   - (0,1,0) → 010
   - etc.

2. Concatenate in the order: Absorber, Listener, Executor, Mediator, Radiator
   - Example: 100 101 010 001 110

3. Convert to a single binary number:
   - 100101010001110 → 1011010100110 in binary

4. Convert to decimal and hexadecimal for compact notation:
   - 1011010100110 = 5798 (decimal) = 0x16a6 (hexadecimal)

### Example Encodings

| Configuration | Binary Encoding | Decimal | Hex |
|---------------|----------------|---------|-----|
| Standard orientation | 100 101 010 001 110 | 5798 | 0x16a6 |
| Rotated absorber | 010 101 010 001 110 | 5798 | 0x16a6 |

## Computational Significance

The orientation of poles is not merely spatial representation; it has direct computational significance:

1. **Information Direction**: Determines the direction of information flow
2. **Processing Behavior**: Influences how information is transformed between poles
3. **System Dynamics**: Affects the emergent behavior of the entire system
4. **Interaction Patterns**: Defines how the system interacts with its environment

## Pole Orientation in Code

In the implementation, pole orientations are used to:

1. Calculate forces between objects in the environment
2. Determine information flow paths
3. Transform data between different representation spaces
4. Implement specific computational operations

The vector-based orientation system provides a unified framework for representing diverse computational behaviors within the pentapolar paradigm.