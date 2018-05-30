export default (node) => {
    return node.properties.map(property => {
        return `
            ${property.name}: ${property.type}${property.isRequired ? '!' : ''}`
    }).join('\n');
};
