import baseTypes from './baseTypes';
import getNodes from './getNodes';

export default (store) => {
    const nodes = getNodes(store);

    return (!store.nodes.length)
        ? `
            #
            # No entities to generated scheme for
            #
            
            # Basic types
            ${baseTypes}
        `
        : `   
            # Basic types
            ${baseTypes}
             
            # Node Types
            ${nodes.types}
            
            # Mutations
            type Mutation {
                ${nodes.mutations}
            }
            
            # Queries
            type Query {
                node(id: ID!): Node
               ${nodes.queries}
            }
            
            # Schema definition 
            schema {
              query: Query
              mutation: Mutation
            }
        `;
}