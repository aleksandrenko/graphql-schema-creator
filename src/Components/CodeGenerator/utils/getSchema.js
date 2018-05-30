import baseTypes from './baseTypes';
import getNodes from './getNodes';

export default (store) => {
    const nodes = getNodes(store);

return `
${baseTypes}
    
# Node Types
${nodes.types}

type Mutation {
  
}

type Query {
   
}

schema {
  query: Query
  mutation: Mutation
}
`;
}