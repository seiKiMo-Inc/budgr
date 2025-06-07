import { MongoClient } from "mongodb";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { expo } from "@better-auth/expo";

const client = new MongoClient(
    process.env.MONGODB_URI ?? "mongodb://localhost:27017"
);
const database = client.db();

export const auth = betterAuth({
    basePath: "/api/auth",
    trustedOrigins: ["budgr://"],
    database: mongodbAdapter(database),
    plugins: [
        expo()
    ],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION === "true"
    },
    emailVerification: {
        sendVerificationEmail: async({ user, url, token }, request) => {
            console.log(user, url, token, request);
        }
    },
    socialProviders: {
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        }
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    // Create a new user in the database after the account is created.
                     const userData = new User({ _id: user.id });
                     await userData.save();
                }
            }
        }
    }
});
