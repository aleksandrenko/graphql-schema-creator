import { observable } from 'mobx';

import Edge from './Edge';
import Node from './Node';

const GRAPHQL_LC = 'graphql-generator-ui-conf';

const store = {
    @observable nodes: [],
    @observable edges: [],
    @observable selected: null, //selected entity node/edge

    addNode({name, x, y}) {
        const position = { x, y };
        const newNode = new Node({name, position});

        this.nodes.push(newNode);
    },

    addEdge({name, startNodeId, endNodeId}) {
        const newEdge = new Edge({
            name,
            startNodeId,
            endNodeId
        });

        const startNode = this.getById(startNodeId);
        const endNode = this.getById(endNodeId);

        startNode.addEdge(newEdge.id);
        endNode.addEdge(newEdge.id);

        this.edges.push(newEdge);
    },

    getById(id) {
        return this.nodes.find(node => node.id === id)
            || this.edges.find(edge => edge.id === id);
    },

    populateFromLocalStorage() {
        const storage = window.localStorage;
        const localStorageData = JSON.parse(storage.getItem(GRAPHQL_LC));
        console.log('localStorageData', localStorageData);
    }
};

store.populateFromLocalStorage();

/**
 *
 */
window.onunload = () => {
    console.log('store', store);

    const storage = window.localStorage;
    storage.setItem(GRAPHQL_LC, JSON.stringify({
        nodes: store.nodes,
        edges: store.edges,
        selected: store.selected
    }));
};

export default store;
