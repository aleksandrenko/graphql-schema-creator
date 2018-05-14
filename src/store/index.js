import { observable, autorun, computed } from 'mobx';

import Edge from './Edge';
import Node from './Node';

const GRAPHQL_LC = 'graphql-generator-ui-conf';

const store = {
    @observable nodes: [],
    @observable edges: [],
    @observable selectedId: null, //selected entity node/edge

    set selected (entity) {
        this.selectedId = entity ? entity.id : null;
    },

    @computed get selected () {
        return this.getById(this.selectedId) || null;
    },

    addNode(options = {}) {
        const position = {
            x: options.x,
            y: options.y
        };

        const newNode = new Node({...options, options});
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

    deleteEntity(entity) {
        if (entity.type === 'node') {
            this.nodes.remove(entity);
        }

        if (entity.type === 'edge') {
            this.edges.remove(entity);
        }
    },

    getById(id) {
        return this.nodes.find(node => node.id === id)
            || this.edges.find(edge => edge.id === id);
    },

    populateFromLocalStorage(localStorageData) {
        localStorageData.nodes &&
        localStorageData.nodes.forEach(nodeData => {
            this.addNode(nodeData);
        });

        localStorageData.edges &&
        localStorageData.edges.forEach(edgeData => {
            this.addEdge(edgeData);
        });

        localStorageData.selectedId && (
        this.selected = {
            id: localStorageData.selectedId
        });

        console.log('localStorageData', localStorageData);
        console.log('storage', this);
    }
};

const loString = window.localStorage.getItem(GRAPHQL_LC);
const localStorageData = JSON.parse(loString || '{}');
store.populateFromLocalStorage(localStorageData);

autorun(() => {
    const storage = window.localStorage;

    storage.setItem(GRAPHQL_LC, JSON.stringify({
        nodes: store.nodes,
        edges: store.edges,
        selectedId: store.selectedId
    }));


}, { delay: 200 });

export default store;
