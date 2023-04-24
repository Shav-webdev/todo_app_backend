const { gql } = require("apollo-server");

export default gql`
    type Todo {
        id: ID!
        title: String!
        dueDate: String
    }

    type Query {
        todos: [Todo!]!
        todo(id: ID!): Todo
    }

    type Mutation {
        createTodo(
            title: String!
        ): Todo!
        updateTodo(
            id: ID!
            title: String!
        ): Todo!
        deleteTodo(
            id: ID!
        ): ID!
    }

    type Subscription {
            newTodo: Todo!
    }
`;