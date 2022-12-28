"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const environment_1 = require("./environment");
const vector_1 = require("./vector");
const localeinfo_1 = require("./localeinfo");
const logger_1 = require("./logger");
const log = logger_1.Logger.getLogger().log;
// an entity is an object that exists in an environment and has a position a velocity a rotation and a radius. Entities can have children and parents.
// entities can also have a radius that defines the size of the entity. Entities can also have a mass that defines the weight of the entity.
// entities can also have a polarity that defines the polarity of the entity. Entities are composed of information from different sources, unlike
// base environments, which are composed of local and non-local information from emitters of the same polarity. 
class Entity extends environment_1.Environment {
    /**
     * constructor. Creates a new entity in the environment
     * @param parent
     * @param position
     * @param radius
     * @param mass
     * @param polarity
     */
    constructor(parent, position, radius, mass, polarity) {
        super(parent);
        this.parent = parent;
        this.position = position;
        this.radius = radius;
        this.mass = mass;
        this.polarity = polarity;
        this.information = new localeinfo_1.LocaleInformation(this.parent, this, radius, mass);
        this.information.polarity = polarity;
        this.information.position = position;
        this.information.rotation = new vector_1.Vector3(0, 0, 0);
        this.information.velocity = new vector_1.Vector3(0, 0, 0);
        this.information.mass = mass;
    }
    // get the global information for the entity in the environment
    getGlobalInformation() {
        const info = new localeinfo_1.LocaleInformation(this.parent, this, new vector_1.Vector3(0, 0, 0));
        this.children.forEach(child => {
            if (!child.source)
                return;
            if (child.source.isPhysical) {
                return;
            }
            info.polarity.absorb += child.polarity.absorb;
            info.polarity.listen += child.polarity.listen;
            info.polarity.execute += child.polarity.execute;
            info.polarity.mediate += child.polarity.mediate;
            info.polarity.emit += child.polarity.emit;
        });
        return info;
    }
    // add a child to the entity in the environment
    addLocality(info, position, radius) {
        const localeInfo = new localeinfo_1.LocaleInformation(this, info, radius);
        localeInfo.position = position;
        localeInfo.rotation = new vector_1.Vector3(0, 0, 0);
        localeInfo.velocity = new vector_1.Vector3(0, 0, 0);
        localeInfo.mass = 1;
        localeInfo.source = info;
        this.children.push(localeInfo);
        log(`added ${info} to ${this}`);
    }
    // get the local information for the entity in the environment
    getLocalInformation() {
        const visibleChildrenWithoutObstructions = this.children.filter(child => {
            if (!child.source)
                return false;
            if (!child.source.isPhysical)
                return false;
            const blocked = this.children.filter(other => {
                if (!other.source)
                    return false;
                if (!other.source.isPhysical)
                    return false;
                if (other === child)
                    return false;
                if (other.position.distanceTo(child.position) < other.radius.x + child.radius.x)
                    return true;
                return false;
            });
            return blocked.length === 0;
        });
        // aggregate the information from the visible children by source so that there is only one LocaleInformation entry
        // for each physical source in the visible children
        const localeInformationsBySource = visibleChildrenWithoutObstructions.reduce((map, child) => {
            if (!child.source)
                return map;
            if (map.has(child.source)) {
                const info = map.get(child.source);
                if (info) {
                    info.polarity.absorb += child.polarity.absorb;
                    info.polarity.listen += child.polarity.listen;
                    info.polarity.execute += child.polarity.execute;
                    info.polarity.mediate += child.polarity.mediate;
                    info.polarity.emit += child.polarity.emit;
                }
            }
            else
                map.set(child, child);
            return map;
        });
        return Array.from(localeInformationsBySource.values());
    }
}
exports.Entity = Entity;
