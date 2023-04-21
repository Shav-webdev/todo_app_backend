import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from "./schema";

const toDos = [];

const resolvers = {
    Query: {
        toDos: () => toDos,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const PORT = Number(process.env.PORT) || 5000;

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);