import store from "./index";

import getUID from "../utils/id";
import getColor from "../utils/color";
import Property from "./Property";
import { observable } from 'mobx';

const thr = (errorText) => { throw new Error(errorText) };


/**
 *
 */
class Node {
    @observable properties = [];

    constructor(options = {}) {
        this.name = options.name || thr('Name is required for new Node creation.');
        this.edgeIds = options.edgeIds || [];
        this.id = options.id || getUID();
        this.type = 'node';
        this.color = options.color || getColor();
        this.position = options.position || [];
    }

    get edges() {
        return this.edgeIds.map(edgeId => store.getById(edgeId));
    }

    addEdge(edgeId) {
        this.edgeIds.push(edgeId);
    }

    addProperty() {
        const newProperty = new Property();
        this.properties.push(newProperty);
    }

}

export default Node;