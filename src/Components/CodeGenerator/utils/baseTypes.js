import getNodes from './getNodes';

export default (`
    interface Node {
      id: ID!
    }
    
    interface Edge {
      id: ID!
      node: Node
    }
    
    interface Connection {
      nodes: [Node]
      edges: [Edge]
      pageInfo: PageInfo
      totalCount: Int!
    }
    
    # page info object - an object to hold the paging and cursors information. github like
    type PageInfo {
      endCursor: String
      hasNextPage: String
      hasPreviousPage: String
      startCursor: String
    }
`);