import { describe, expect, it } from "bun:test";

import app from "@/index.ts";

describe("Elysia", () => {
    it("should return a response", async () => {
        const response = await app
            .handle(new Request("http://localhost:3000/health"))
            .then(res => res.text());

        expect(response).toBe("OK");
    });
});
