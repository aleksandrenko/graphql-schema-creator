import getUID from "../utils/id";
import getColor from "../utils/color";
import Property from "./Property";
import store from '../store/';

import { observable } from 'mobx';
import systemProperties from "./systemProperties";

/**
 *
 */
class Node {
    @observable properties;
    @observable _name;
    @observable color;
    @observable position;

    constructor(options = {}) {
        this._name = options.name || 'New_Node';
        this.edgeIds = options.edgeIds || [];
        this.properties = options.properties || [];
        this.id = options.id || getUID();
        this.type = 'node';
        this.color = options.color || getColor();
        this.position = options.position || { x: 50, y: 50 };

        !options.id && (
            systemProperties.map(systemProp => this.properties.push(systemProp))
        )
    }

    set name(newName) {
        this._name = newName.replace(' ', '_');
    }

    get name() {
        return this._name;
    }

    get edges() {
        return this.edgeIds.map(edgeId => store.getById(edgeId)).filter(edge => !!edge);
    }

    addEdge(edgeId) {
        this.edgeIds.push(edgeId);
    }

    deleteProperty(prop) {
        this.properties.remove(prop);
    }

    addProperty() {
        const newProperty = new Property();
        this.properties.unshift(newProperty);

        return newProperty;
    }

}

export default Node;