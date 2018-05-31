import getUID from "../utils/id";
import getColor from "../utils/color";
import Property from "./Property";
import store from '../store/';

import { observable, intercept } from 'mobx';
import systemProperties from "./systemProperties";

/**
 *
 */
class Node {
    @observable properties;
    @observable name;
    @observable color;
    @observable position;

    constructor(options = {}) {
        this.id = options.id || getUID();
        this.name = options.name || ('Node_' + this.id);
        this.edgeIds = options.edgeIds || [];
        this.properties = options.properties || [];
        this.type = 'node';
        this.color = options.color || getColor();
        this.position = options.position || { x: 50, y: 50 };

        !options.id && (
            systemProperties.map(systemProp => this.properties.push(systemProp))
        );

        intercept(this, 'name', change => {
            if (change.newValue === '') {
                return null;
            }

            change.newValue = change.newValue.replace(' ', '_').toCamelCase();
            return change;
        });
    }

    get edges() {
        return this.edgeIds.map(edgeId => store.getById(edgeId)).filter(edge => !!edge);
    }

    addEdge(edgeId) {
        !this.edgeIds.includes(edgeId) && this.edgeIds.push(edgeId);
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