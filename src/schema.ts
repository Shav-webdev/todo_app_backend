export const typeDefs = `    #graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# This "tod" type defines the queryable fields for every book in our data source.
type ToDo {
    id: ID!
    title: String!
    createdAt: String!
    updatedAt: String!
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "todos" query returns an array of zero or more ToDos (defined above).
type Query {
    toDos: [ToDo]
}

type Mutation {
    addToDo(id: ID, title: String): ToDo
    editToDo(id: ID, title: String): ToDo
}

`;
