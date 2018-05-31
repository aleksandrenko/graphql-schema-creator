const getConnectionName = (edge) => {
    const startNodeName = edge.startNode.name.toCamelCase();
    const endNodeName = edge.endNode.name.toCamelCase() + 's';
    const edgeName = edge.name.toCamelCase();

    const computedName = `${startNodeName}${edgeName}${endNodeName}`;

    return {
        connection: `${computedName}Connection`,
        edge: `${computedName}Edge`,
        nodeConnectionName: `${edgeName}${endNodeName}`,
        startNodeName,
        endNodeName
    };
};

const getConnectionAndEdgeTypes = (edge) => {
    const name = getConnectionName(edge);

    return (`
        type ${name.connection} {
            edges: [${name.edge}]
            pageInfo: PageInfo!
        }
        
        type ${name.edge} {
            cursor: String!
            node: ${name.startNodeName}
        }
    `);
};

const getNodeConnections = (edge) => {
    const name = getConnectionName(edge);

    return `
        ${name.nodeConnectionName}: [${name.connection}]
    `;
};

export default (node) => {
    const outgoingEdges = node.edges.filter(edge => edge.endNodeId === node.id);

    const connectionsAndEdgesTypes = outgoingEdges.map(getConnectionAndEdgeTypes).join('\n');
    const nodeConnections = outgoingEdges.map(getNodeConnections).join('\n');

    return {
        types: connectionsAndEdgesTypes,
        connections: nodeConnections
    };
};
