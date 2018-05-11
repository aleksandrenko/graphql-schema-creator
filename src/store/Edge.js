import store from "./index";

import geometry from '../utils/geometry';
import getUID from "../utils/id";
import Property from "./Property";
import {observable} from "mobx/lib/mobx";

const thr = (errorText) => { throw new Error(errorText) };

/**
 *
 */
class Edge {
    @observable properties = [];

    constructor(options = {}) {
        this.name = options.name || thr('Name is required for new Edge creation.');
        this.id = options.id || getUID();
        this.type = 'edge';
        this.middlePointOffset = options.middlePointOffset || [0, 0];
        this.startNodeId = options.startNodeId || thr('StartNodeId is required for new Edge creation.');
        this.endNodeId = options.endNodeId || thr('endNodeId is required for new Edge creation.');
    }

    addProperty() {
        this.properties.push(new Property());
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