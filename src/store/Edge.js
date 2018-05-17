import geometry from '../utils/geometry';
import getUID from "../utils/id";
import Property from "./Property";

import { observable } from 'mobx';
import store from '../store/';
const thr = (errorText) => { throw new Error(errorText) };

/**
 *
 */
class Edge {
    @observable name;
    @observable properties;
    @observable middlePointOffset;

    constructor(options = {}) {
        this.name = options.name || "New edge";
        this.id = options.id || getUID();
        this.properties = options.properties || [];
        this.type = 'edge';
        this.middlePointOffset = options.middlePointOffset || [0, 0];
        this.startNodeId = options.startNodeId || thr('StartNodeId is required for new Edge creation.');
        this.endNodeId = options.endNodeId || thr('endNodeId is required for new Edge creation.');
    }

    addProperty() {
        const newProperty = new Property();
        this.properties.unshift(newProperty);

        return newProperty;
    }

    deleteProperty(prop) {
        this.properties.remove(prop);
    }

    get middlePoint() {
        return geometry.middlePoint(this.startNode, this.endNode);
    }

    get middlePointWithOffset() {
        if (this.startNodeId === this.endNodeId && this.middlePointOffset[0] === 0 && this.middlePointOffset[1] === 0) {
            this.middlePointOffset = [-50, 50];
        }

        return [
            this.middlePoint[0] - this.middlePointOffset[0],
            this.middlePoint[1] - this.middlePointOffset[1]
        ];
    }

    get startNode() {
        return store.getById(this.startNodeId);
    }

    get endNode() {
        return store.getById(this.endNodeId);
    }

    set startNode(startNode) {
        this.startNodeId = startNode.id;
    }

    set endNode(endNode) {
        this.endNodeId = endNode.id;
    }
}

export default Edge;