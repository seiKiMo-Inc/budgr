import { describe, expect, it, test } from "bun:test";
import { createAuthClient } from "better-auth/client";

/**
 * The global bearer token used for authentication in tests.
 */
export let primaryToken: string | undefined = undefined;

/**
 * The global bearer token for the other user in tests.
 */
export let secondaryToken: string | undefined = undefined;

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
});

/**
 * Creates a new account for testing purposes.
 */
export async function createAccount(email: string): Promise<void> {
    const { error } = await authClient.signUp.email({
        email,
        password: "password123",
        name: "Example User",
        image: "https://example.com/image.png"
    });

    expect(error?.message).toBeUndefined();
    expect(error?.code).toBeUndefined();
}

/**
 * Ensures that the account exists before running tests.
 */
export function ensureAccount(email: string): Promise<string | undefined> {
    return new Promise(async (resolve, reject) => {
        const { error } = await authClient.signIn.email(
            {
                email,
                password: "password123"
            },
            {
                onSuccess: (ctx) => {
                    resolve(ctx.response.headers.get("set-auth-token") ?? undefined);
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

    it("should be able to create accounts", async () => {
        await createAccount("example@example.com");
        await createAccount("foobar@example.com");
    });

    test("that we can log in with the accounts", async () => {
        primaryToken = await ensureAccount("example@example.com");
        expect(primaryToken).toBeDefined();

        secondaryToken = await ensureAccount("foobar@example.com");
        expect(secondaryToken).toBeDefined();
    })
});
