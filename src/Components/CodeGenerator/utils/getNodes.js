import getProperties from "./getProperties";

const getNodeTypes = (store) => {
    const nodes = store.nodes;

    return nodes.map(node => {
        const name = node.name.toCamelCase();

        const nodeSpec = `
            type ${name} implements Node {
              ${getProperties(node)}
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
        `;
    }).join('\n');
};

const getNodeQueries = (store) => {
    const nodes = store.nodes;

    return nodes.map(node => {
        return `
            ${node.name}(id: ID!): ${node.name.toCamelCase()} 
            ${node.name}s: [${node.name.toCamelCase()}]
        `;
    }).join('\n');
};

const getNodeMutations = (store) => {
    const nodes = store.nodes;

    //Add flags to generate or ignore CRUD for created nodes
    return nodes.map(node => {
        return `
            create${node.name.toCamelCase()}(user: ${node.name.toCamelCase()}Input): ${node.name.toCamelCase()} 
            update${node.name.toCamelCase()}(id: ID!, user: ${node.name.toCamelCase()}Input): ${node.name.toCamelCase()} 
            delete${node.name.toCamelCase()}(id: ID!): ${node.name.toCamelCase()} 
        `;
    }).join('\n');
};


export default (store) => ({
    types: getNodeTypes(store),
    queries: getNodeQueries(store),
    mutations: getNodeMutations(store)
});