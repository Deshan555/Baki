import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = `
  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!): Boolean
  }

  input TaskInput {
    title: String!
    done: Boolean!
    completed: Boolean!
  }

  type Task {
    id: ID!
    title: String!
    done: Boolean!
    completed: Boolean!
  }
`;

const tasks = [];

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
  Mutation: {
    createTask: (_, { input }) => {
      const newTask = {
        id: String(tasks.length + 1),
        ...input,
      };
      tasks.push(newTask);
      return newTask;
    },
    updateTask: (_, { id, input }) => {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
        throw new Error("Task not found");
      }
      tasks[taskIndex] = { ...tasks[taskIndex], ...input };
      return tasks[taskIndex];
    },
    deleteTask: (_, { id }) => {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
        throw new Error("Task not found");
      }
      tasks.splice(taskIndex, 1);
      return true;
    },
  },
};

async function startApolloServer() {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server);

  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
