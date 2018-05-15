import getUID from "../utils/id";
import getColor from "../utils/color";
import Property from "./Property";
import store from '../store/';

import { observable } from 'mobx';

/**
 *
 */
class Node {
    @observable properties;
    @observable name;
    @observable color;
    @observable position;

    constructor(options = {}) {
        this.name = options.name || 'New Node';
        this.edgeIds = options.edgeIds || [];
        this.properties = options.properties || [];
        this.id = options.id || getUID();
        this.type = 'node';
        this.color = options.color || getColor();
        this.position = options.position || { x: 50, y: 50 };
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
        this.properties.push(newProperty);
    }

}

export default Node;