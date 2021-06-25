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
    apiKey: "service:galimax-dev-ihner:jVWYkFngoEhR0pn8D8XYng",
    schemaTag: "development"
  }  
});

// const MONGO_URI = 'mongodb://ruben:R!ZJjFH%40-bN9P.7@ds347467.mlab.com:47467/galimax-dev';
const MONGO_URI =
  "mongodb+srv://ruben:jfMcQHYUE3CH8Ovu@galimax-dev.agwjl.mongodb.net/galimax-dev?retryWrites=true&w=majority";

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
