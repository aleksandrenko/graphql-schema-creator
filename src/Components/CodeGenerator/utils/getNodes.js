import getProperties from "./getProperties";
import getConnections from './getConnections';

const getNodeResolvers = (store) => {
    const nodes = store.nodes;

    return nodes.reduce((acc, node) => {
        const name = node.name.toCamelCase();

        acc[name] = (obj, args, context, info) => {
            return {};
        };

        return acc;
    }, {});
};

const getNodeTypes = (store) => {
    const nodes = store.nodes;

    return nodes.map(node => {
        const name = node.name.toCamelCase();
        const connections = getConnections(node);

        //ships: ShipConnection

        const nodeSpec = `
            type ${name} implements Node {
              ${getProperties(node)}
              ${connections.connections}
            }
        `;

        const nodeInputSpec = `
            input ${name}Input {
                ${getProperties(node)}
            }`;

        return `
            # ${name}
            ${nodeSpec}
            ${nodeInputSpec}
            ${connections.types}
        `;
    }).join('\n');
};

const getNodeQueries = (store) => {
    const nodes = store.nodes;

    return nodes.map(node => {
        const name = node.name.toCamelCase();

        return `
            ${name}(id: ID!): ${name} 
            ${name}s: [${name}]
        `;
    }).join('\n');
};

const getNodeMutations = (store) => {
    const nodes = store.nodes;

    //Add flags to generate or ignore CRUD for created nodes
    return nodes.map(node => {
        const name = node.name.toCamelCase();

        return `
            create${name}(user: ${name}Input): ${name} 
            update${name}(id: ID!, user: ${name}Input): ${name} 
            delete${name}(id: ID!): ${name} 
        `;
    }).join('\n');
};


export default (store) => ({
    types: getNodeTypes(store),
    queries: getNodeQueries(store),
    mutations: getNodeMutations(store),
    resolvers: getNodeResolvers(store)
});