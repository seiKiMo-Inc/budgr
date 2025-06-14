import { MongoClient } from "mongodb";

import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { expo } from "@better-auth/expo";
import { prisma } from "@lib/db.ts";

const client = new MongoClient(
    process.env.MONGODB_URI ?? "mongodb://localhost:27017/budgr"
);
const database = client.db();

export const auth = betterAuth({
    basePath: "/api/auth",
    trustedOrigins: ["budgr://"],
    database: mongodbAdapter(database),
    plugins: [
        expo(),
        // The 'bearer' plugin is only used in testing environments.
        ...(process.env.NODE_ENV == "production" ? [] : [bearer()])
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
                    // Generate a random username from the user's email.
                    const username = generateUsername(user.email);
                    // Create a new user in the database after the account is created.
                    await prisma.user.create({
                        data: { id: user.id, username }
                    });
                }
            }
        }
    }
});

/**
 * Generates a random string of the specified length.
 *
 * @param length The length of the random string to generate.
 */
function generateRandomString(length: number): string {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

/**
 * Generates a random username based on the provided email.
 *
 * @param email The email address to generate a username from.
 */
export function generateUsername(email: string): string {
    if (!email.includes("@")) {
        throw new Error("Invalid email address provided.");
    }

    // Generate a random string to append to the username.
    const random = generateRandomString(6);

    const [username] = email.split("@");
    return `${username}.${random}`;
}
