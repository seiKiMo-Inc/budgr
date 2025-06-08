import { MongoMemoryServer } from "mongodb-memory-server";

const instance = await MongoMemoryServer.create();
const uri = instance.getUri();

// Set the URI as an environment variable.
process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf("/"));
