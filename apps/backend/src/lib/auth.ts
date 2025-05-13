import { MongoClient } from "mongodb";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI ?? "mongodb://localhost:27017");
const database = client.db();

export const auth = betterAuth({
    basePath: "/api",
    database: mongodbAdapter(database),
    emailAndPassword: { enabled: true }
});
