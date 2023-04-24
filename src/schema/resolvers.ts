const { generateRandomString } = require('../helpers/utils');
const  {PubSub} = require("graphql-subscriptions");

// Initialize PubSub
const pubsub = new PubSub();

let todos = [];

function addRandomTodo() {
  return {
    id: String(new Date().getTime()),
    title: generateRandomString(),
    dueDate: `${new Date().toISOString()}`
  };
}

setInterval(() => {
  todos = [addRandomTodo(), ...todos];
}, 180000);

export default {
  Query: {
    todos: () => todos.sort((a, b) => (Number(b.id) - Number(a.id)))
  },
  Mutation: {
    createTodo: (parent, args) => {
      const todo = {
        id: String(new Date().getTime()),
        title: args.title,
        dueDate: `${new Date().toISOString()}`
      };
      todos.push(todo);
      pubsub.publish('TODO_UPDATED', { newTodo: todo });
      return todo;
    },
    updateTodo: (parent, args) => {
      const todoIndex = todos.findIndex(todo => todo.id === args.id);
      const updatedTodo = Object.assign({}, todos[todoIndex], args);
      todos[todoIndex] = updatedTodo;
      return updatedTodo;
    },
    deleteTodo: (parent, args) => {
      const todoIndex = todos.findIndex(todo => todo.id === args.id);
      if (todoIndex !== -1) {
        const deletedTodo = todos[todoIndex];
        todos.splice(todoIndex, 1);
        return deletedTodo.id;
      }
      return null;
    }
  },
  Subscription: {
    newTodo: {
      subscribe: async (_, __) => {
        return pubsub.asyncIterator('TODO_UPDATED');
      }
    }
  }
};