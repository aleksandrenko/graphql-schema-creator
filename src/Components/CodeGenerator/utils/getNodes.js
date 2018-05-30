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
            # ${name} ====================================================================
            ${nodeSpec}
            ${nodeInputSpec}
        `;
    }).join('\n');
};


export default (store) => ({
    types: getNodeTypes(store)
});