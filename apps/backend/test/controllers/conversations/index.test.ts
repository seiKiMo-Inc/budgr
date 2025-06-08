import { beforeAll, describe, expect, it, test } from "bun:test";

import { primaryToken, secondaryToken } from "@test/lib/auth.test.ts";

import client from "@test/client.ts";

describe("Conversations Controller", () => {
    beforeAll(async () => {
        expect(primaryToken).toBeDefined();
        expect(secondaryToken).toBeDefined();
    });

    it("should require authorization", async () => {
        const response = await client.conversations.get();
        expect(response.status).toBe(401);
    });

    it("should list all conversations", async () => {
        const { status, data } = await client.conversations.get({
            headers: { authorization: `Bearer ${primaryToken}` }
        });

        expect(status).toBe(200);
        expect(data).toHaveProperty("conversations");
    });

    test("that we can create a conversation", async () => {
        // Get the user ID of the secondary user.
        const { status: status$1, data: secondaryUser } = await client.user["@me"].get({
            headers: { authorization: `Bearer ${secondaryToken}` }
        });
        expect(status$1).toBe(200);
        expect(secondaryUser).toHaveProperty("id");

        // Create a new conversation with the secondary user.
        const { status, data } = await client.conversations.new.post(
            {
                name: "Test Conversation",
                users: [secondaryUser!.id]
            },
            {
                headers: { authorization: `Bearer ${primaryToken}` },
            }
        );
        expect(status).toBe(201);
        expect(data).toHaveProperty("conversation");
    });
});
