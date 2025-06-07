import { beforeAll, describe, expect, it } from "bun:test";

import { ensureAccount, token } from "@test/lib/auth.test.ts";

import app from "@/index.ts";

describe("Messages Controller", () => {
    beforeAll(async () => {
        // Ensure that the account exists before running tests.
        await ensureAccount();
    });

    it("should require authorization", async () => {
        const response = await app
            .handle(new Request("http://localhost:3000/messages"));

        expect(response.status).toBe(401);
    });

    it("should return the message list", async () => {
        const request = new Request("http://localhost:3000/messages");
        request.headers.set("Authorization", `Bearer ${token}`);

        const response = await app
            .handle(request)
            .then(res => res.json());

        expect(response).toBeDefined();
    });
});
