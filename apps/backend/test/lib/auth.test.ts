import { afterAll, describe, expect, it } from "bun:test";
import { createAuthClient } from "better-auth/client";

/**
 * The global bearer token used for authentication in tests.
 */
export let token: string | undefined = undefined;

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
});

/**
 * Creates a new account for testing purposes.
 */
export async function createAccount(): Promise<void> {
    const { error } = await authClient.signUp.email({
        email: "example@example.com",
        password: "password123",
        name: "Example User",
        image: "https://example.com/image.png"
    });

    expect(error).toBeNull();
}

/**
 * Ensures that the account exists before running tests.
 */
export function ensureAccount(): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const { error } = await authClient.signIn.email(
            {
                email: "example@example.com",
                password: "password123"
            },
            {
                onSuccess: (ctx) => {
                    token = ctx.response.headers.get("set-auth-token") ?? undefined;
                    resolve();
                }
            }
        );

        if (error) {
            reject();
        }
    });
}

describe("Better Auth", () => {
    it("should not require Email verification", () => {
        expect(process.env.REQUIRE_EMAIL_VERIFICATION ?? "false").toBe("false");
    });

    it("should create an account", async () => {
        await createAccount();
        await ensureAccount();
    });
});
