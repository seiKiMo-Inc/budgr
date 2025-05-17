import { MongoClient } from "mongodb";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { expo } from "@better-auth/expo";

const client = new MongoClient(
    process.env.MONGODB_URI ?? "mongodb://localhost:27017"
);
const database = client.db();

export const auth = betterAuth({
    basePath: "/api",
    trustedOrigins: ["budgr://"],
    database: mongodbAdapter(database),
    plugins: [
        expo()
    ],
    emailAndPassword: { enabled: true }
});
