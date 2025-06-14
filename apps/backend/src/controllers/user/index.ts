import Elysia from "elysia";

import AuthController from "@controllers/auth.ts";
import type { User } from "@/types.ts";
import { prisma } from "@lib/db.ts";

/**
 * Fetches all public user data by ID.
 *
 * @param id The ID of the user to fetch.
 */
export async function getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
        where: { id },
        include: { profile: true }
    });

    // Check if the user exists.
    if (!user) {
        return null;
    }

    return {
        id: user.id,
        username: user.username,
        displayName: user.profile?.displayName ?? user.username,
        timezone: user.profile?.timezone ?? undefined
    } satisfies User;
}

export default new Elysia({ prefix: "/user" })
    .use(AuthController)
    .guard({ auth: true })
    // TODO: Add more data to user endpoint.
    .get(
        "/@me",
        ({ user }) => user
    );
