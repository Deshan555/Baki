# Baki - Task Management with GraphQL and Apollo Client/Server Project 🚀

## My Journey into GraphQL 📖

This project represents my deep dive into the fascinating world of GraphQL. My main goal was to understand GraphQL better and, more importantly, to gain hands-on experience. To accomplish this, I decided to use Apollo Server and build a GraphQL server, all while actively working on various queries and mutations.

## Task Management at Its Core 📋

At the heart of this project lies a task management system. Users can create, read, update, and delete tasks. It's all about simplifying task management.

## Behind the Scenes: Server-Side Logic 🖥️

Inside the **Server** directory, you'll find the core logic of our project in `index.js`. Here's a sneak peek at what's happening:

- **Apollo Server Setup**: I set up an Apollo Server using the `@apollo/server` package. This server is armed with a carefully designed schema (`typeDefs`) and the necessary resolvers (`resolvers`).

- **Resolvers**: These are the workhorses of our server. They handle everything from querying tasks to creating, updating, and deleting them.

- **Data Storage**: To mimic a database, I adopted a simple in-memory storage approach using the `tasks` array.

- **Schema Definition**: Using the Schema Definition Language (SDL), I meticulously defined our GraphQL schema. It specifies the types, queries, mutations, and input types available for this project.

## Bringing It to Life on the Client Side 🌟

- **`main.tsx`**: This is where I configure Apollo Client to connect to our GraphQL server. It's the bridge between the client and server.

- **`App.tsx`**: This central React component is responsible for rendering our user interface. It showcases the project title and houses the `Tasks` component.

- **`types.tsx`**: TypeScript comes into play here, providing structured types for the client application, ensuring data consistency.

- **`schemas.ts`**: GraphQL queries and mutations are defined using Apollo Client's `gql` function. This is how we communicate with the server.

- **`Tasks.tsx`**: This component is the powerhouse. It handles data retrieval, task creation, and task card rendering, all thanks to Apollo Client's `useQuery` and `useMutation` hooks.

- **`Taskcard.tsx`**: These individual task cards are where the magic happens. You can edit tasks, mark them as completed, or delete them, all made possible by Apollo Client's `useMutation` hook.

## Key Technologies 🔧

- **Apollo Server**: This played a pivotal role in setting up the GraphQL server on the server side.

- **Apollo Client**: It's the engine that connects our client-side application to the GraphQL API.

- **React**: The building block of our user interface, allowing me to create a dynamic and responsive experience.

- **GraphQL**: The language that powers our API, enabling efficient data querying and manipulation.

- **TypeScript**: A valuable tool that added a layer of safety and maintainability to the project with static typing.

## What I've Learned 🧠

- **Crafting a GraphQL Schema**: I've mastered the art of defining a GraphQL schema using the Schema Definition Language (SDL).

- **Resolvers in Action**: Skillfully implementing GraphQL resolvers for queries and mutations has been a crucial part of this journey.

- **Apollo Server Configuration**: I've successfully configured a GraphQL server using Apollo Server, making the connection between the client and server seamless.

- **CRUD Operations with GraphQL**: Through GraphQL mutations, I've learned how to perform basic CRUD operations—Create, Read, Update, Delete—with precision.

- **Connecting the Dots**: Forming connections between GraphQL types, such as relationships between tasks and their properties, has been a key focus.

## Video 🎥
