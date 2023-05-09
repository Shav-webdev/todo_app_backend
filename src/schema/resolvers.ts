const { generateRandomString } = require('../helpers/utils');
const { PubSub } = require('graphql-subscriptions');

// Initialize PubSub
const pubsub = new PubSub();

let todos = [];

function addRandomTodo() {
  return {
    id: String(new Date().getTime()),
    title: generateRandomString(),
    dueDate: `${new Date().toISOString()}`,
  };
}

setInterval(() => {
  const newTodo = addRandomTodo();
  todos = [...todos, newTodo];
  pubsub.publish('TODO_UPDATED', { newTodo });
}, 180000);

export default {
  Query: {
    todos: () => todos.sort((a, b) => Number(b.id) - Number(a.id)),
  },
  Mutation: {
    createTodo: (parent, args) => {
      const todo = {
        id: String(new Date().getTime()),
        title: args.title,
        dueDate: `${new Date().toISOString()}`,
      };
      todos.push(todo);
      return todo;
    },
    updateTodo: (parent, args) => {
      let updatedTodo;
      todos = todos.map((todo) => {
        if (todo.id === args.id) {
          updatedTodo = { ...todo, ...args };
        }

        return todo.id === args.id ? updatedTodo : todo;
      });
      return updatedTodo;
    },
    deleteTodo: (parent, args) => {
      let deletedTodoId = null;
      todos = todos.filter((todo) => {
        if (todo.id === args.id) deletedTodoId = args.id;
        return todo.id !== args.id;
      });

      return deletedTodoId;
    },
  },
  Subscription: {
    newTodo: {
      subscribe: async (_, __) => {
        return pubsub.asyncIterator('TODO_UPDATED');
      },
    },
  },
};
