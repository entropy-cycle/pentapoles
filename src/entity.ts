import { Environment  } from "./environment";
import { Vector3 } from "./vector";
import { LocaleInformation } from "./localeinfo";
import { Polarity } from "./polarity";
import { Logger } from "./logger";

const log = Logger.getLogger().log;

// an entity is an object that exists in an environment and has a position a velocity a rotation and a radius. Entities can have children and parents.
// entities can also have a radius that defines the size of the entity. Entities can also have a mass that defines the weight of the entity.
// entities can also have a polarity that defines the polarity of the entity. Entities are composed of information from different sources, unlike
// base environments, which are composed of local and non-local information from emitters of the same polarity. 
export class Entity extends Environment {
    public information: LocaleInformation;
    /**
     * constructor. Creates a new entity in the environment
     * @param parent 
     * @param position 
     * @param radius 
     * @param mass 
     * @param polarity 
     */
    constructor(public parent: Environment, public position: Vector3, public radius: Vector3, public mass: number, public polarity: Polarity) {
        super(parent);
        this.information = new LocaleInformation(this.parent, this, radius, mass);
        this.information.polarity = polarity;
        this.information.position = position;
        this.information.rotation = new Vector3(0, 0, 0);
        this.information.velocity = new Vector3(0, 0, 0);
        this.information.mass = mass;
    }
    // get the global information for the entity in the environment
    getGlobalInformation(): LocaleInformation {
        const info = new LocaleInformation(this.parent, this, new Vector3(0, 0, 0));
        this.children.forEach(child => {
            if(!child.source) return;
            if(child.source.isPhysical) { return; }
            info.polarity.absorb += child.polarity.absorb;
            info.polarity.listen += child.polarity.listen;
            info.polarity.execute += child.polarity.execute;
            info.polarity.mediate += child.polarity.mediate;
            info.polarity.emit += child.polarity.emit;
        });
        return info;
    }
    // add a child to the entity in the environment
    addLocality(info: Environment, position: Vector3, radius: Vector3) {
        const localeInfo = new LocaleInformation(this, info, radius);
        localeInfo.position = position;
        localeInfo.rotation = new Vector3(0, 0, 0);
        localeInfo.velocity = new Vector3(0, 0, 0);
        localeInfo.mass = 1;
        localeInfo.source = info;
        this.children.push(localeInfo);
        log(`added ${info} to ${this}`);
    }

    // get the local information for the entity in the environment
    getLocalInformation(): LocaleInformation[] {
        const visibleChildrenWithoutObstructions = this.children.filter(child => {
            if(!child.source) return false;
            if(!child.source.isPhysical) return false;
            const blocked = this.children.filter(other => {
                if(!other.source) return false;
                if(!other.source.isPhysical) return false;
                if(other === child) return false;
                if(other.position.distanceTo(child.position) < other.radius.x + child.radius.x) return true;
                return false;
            });
            return blocked.length === 0;
        });
        
        // aggregate the information from the visible children by source so that there is only one LocaleInformation entry
        // for each physical source in the visible children
        const localeInformationsBySource = visibleChildrenWithoutObstructions.reduce((map, child) => {
            if(!child.source) return map;
            if(map.has(child.source)) {
                const info = map.get(child.source);
                if(info) {
                    info.polarity.absorb += child.polarity.absorb;
                    info.polarity.listen += child.polarity.listen;
                    info.polarity.execute += child.polarity.execute;
                    info.polarity.mediate += child.polarity.mediate;
                    info.polarity.emit += child.polarity.emit;
                }
            } else map.set(child, child);
            return map;
        });
        return Array.from(localeInformationsBySource.values());
    }
}