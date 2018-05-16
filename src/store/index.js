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
        const newNode = new Node({...options, options});
        this.selected = newNode;
        this.nodes.push(newNode);

        return newNode;
    },

    addEdge({name, startNodeId, endNodeId, middlePointOffset}) {
        const newEdge = new Edge({
            name,
            startNodeId,
            endNodeId,
            middlePointOffset
        });

        const startNode = this.getById(startNodeId);
        const endNode = this.getById(endNodeId);

        startNode.addEdge(newEdge.id);
        endNode.addEdge(newEdge.id);

        this.edges.push(newEdge);

        return newEdge;
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

    changeEntityPosition({ id, position }) {
      const entity = this.getById(id);

      entity.position = {
          x: position.x,
          y: position.y
      };
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
