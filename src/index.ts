import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const toDos = [];

const resolvers = {
    Query: {
        toDos: () => toDos,
    },
};
const typeDefs = `    #graphql
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const PORT = Number(process.env.PORT) || 5000;

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);