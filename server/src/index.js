const { ApolloServer } = require("apollo-server");
import mongoose from "mongoose";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const CloudinaryAPI = require("./datasources/cloudinary");

const dataSources = () => ({
  cloudinaryAPI: new CloudinaryAPI(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  engine: {
    apiKey: "service:",
    schemaTag: "development"
  }  
});

const MONGO_URI =
  "mongodb+srv://";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance"))
  .on("error", (error) => console.log("Error connecting to MongoLab: ", error));

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
