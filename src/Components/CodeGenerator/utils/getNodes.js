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
    mutations: getNodeMutations(store)
});