import baseTypes from './baseTypes';
import getNodes from './getNodes';

export default (store) => {
    const nodes = getNodes(store);

return `   
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
   ${nodes.queries}
}

# Schema definition 
schema {
  query: Query
  mutation: Mutation
}
`;
}