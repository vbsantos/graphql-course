import { ApolloServer, PubSub } from "apollo-server";
import mongoose from "mongoose";

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL || "localhost";
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;

export default async function startServer({ typeDefs, resolvers }) {
  try {
    await mongoose.connect(`mongodb://${MONGODB_URL}:${MONGODB_PORT}/graphql`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Database error:", error);
  }

  const pubsub = new PubSub();

  const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } });
  server
    .listen(PORT)
    .then(({ url }) => console.log("🤖 Server running at", url));
}
