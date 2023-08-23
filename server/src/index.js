import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

const mocks = {
  Query: () => ({
    tracksForHome: () => [...new Array(4)],
  }),
  Track: () => ({
    id: () => "track_01",
    title: () => "Astro Kitty, Space Explorer",
    author: () => ({
      name: "Grumpy Cat",
      photo:
        "https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg",
    }),
    thumbnail: () =>
      "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
    length: () => 1210,
    modulesCount: () => 6,
  }),
};

const typeDefs = `
  type Query {
    tracksForHome: [Track]
  }

  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String!
    length: Int!
    modulesCount: Int!
  }

  type Author {
    name: String!
    photo: String!
  }
`;

async function startApolloServer() {
  const schema = makeExecutableSchema({ typeDefs });
  const schemaWithMocks = addMocksToSchema({ schema, mocks });

  const server = new ApolloServer({
    schema: schemaWithMocks,
  });

  const { url } = await startStandaloneServer(server);

  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
