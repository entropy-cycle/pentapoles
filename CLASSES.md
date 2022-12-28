/*

classDiagram
    class Environment{
        +Polarity polarity();
        +Environment parent();
        +Environment[] children();
        +LocaleInformation absorb(LocalEnvironment le);
        +LocaleInformation listen(LocalEnvironment le);
        +LocaleInformation execute(LocalEnvironment le);
        +LocaleInformation mediate(LocalEnvironment le);
        +LocaleInformation emit(LocalEnvironment le);
        +LocaleInformation getLocaleInformation(Vector3 position, Vector3 radius);
        +addLocaleInformation(LocaleInformation info, Vector3 position, Vector3 radius);
        +updateLocaleInformation(LocaleInformation info);
        +removeLocaleInformation(LocaleInformation info);
        +LocaleInformation queue;
        +update();
        +clearQueue();
        +on(string event, Handler eventHandler);
        +off(string event, Handler eventHandler);
        +once(string event, Handler eventHandler);
    }
    class LocaleInformation {
        +Environment parent;
        +Environment source;
        +number time;
        +Vector3 position;
        +Vector3 velocity;
        +Vector3 rotation;
        +Vector3 radius;
        +set(+Vector3 position, +Vector3 velocity, +Vector3 rotation);
        +LocaleInformation[] children();
        +updateLocaleInformation(LocaleInformation info);
        +removeLocaleInformation(LocaleInformation info);
        +update();
        +clearQueue();
        +on(string event, Handler eventHandler);
        +off(string event, Handler eventHandler);
        +once(string event, Handler eventHandler);
    }
    class Handler {
        +LocaleInformation target;
        +added(LocaleInformation info)
        +updated(LocaleInformation info)
        +removed(LocaleInformation info)
    }
    class Polarity {
        +Environment stateSource;
        +number absorb;
        +number listen;
        +number execute;
        +number mediate;
        +number emit;
        +Polarity compare(Polarity other);
        +Vector3 forceBetween(Polarity other, Vector3 distance);
        +void set(number absorb, number listen, number execute, number mediate, number emit);
    }
    class Vector3 {
        +number x;
        +number y;
        +number z;
    }

TASK: Given the above class diagram, provide a general descriptiob of the following classes and their relationships.
RESPONSE: 

The above classes describe a hierarchical environment, where the environment is a collection of LocaleInformation objects. The LocaleInformation objects contain information about the locale, and may contain other LocaleInformation objects. The LocaleInformation objects are affected by the Polarity of the Environment they are in.
The Environment class is a collection of LocaleInformation objects. The Environment class also contains a Polarity object, which describes the general state of the Environment. The Environment class also contains a queue, which is a collection of LocaleInformation objects that are waiting to be updated.
The LocaleInformation class contains information about a specific locale, such as its position, velocity, and rotation. The LocaleInformation class also contains a reference to its parent Environment. The LocaleInformation class also contains a queue, which is a collection of LocaleInformation objects that are waiting to be updated.
The Handler class contains a reference to a specific LocaleInformation object. The Handler class also contains a method for each event that is triggered by the LocaleInformation object. The Handler class is used to listen for changes to a specific LocaleInformation object.
The Polarity class contains a reference to the Environment that is using the Polarity object. The Polarity class also contains five numbers, which describe the general state of the Environment. The Polarity object also contains a method to compare two Polarity objects, and a method to calculate the force between two Polarity objects.
The Vector3 class contains three numbers, which describe a 3D vector. (this class already exists in ./src/vector.ts)



*/