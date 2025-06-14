import type { Error } from "@repo/shared";

/**
 * Creates an error object with a message and timestamp.
 *
 * @param message The error message to include in the error object.
 */
export function error(message: string): Error {
    return {
        error: message,
        timestamp: Date.now()
    } satisfies Error;
}
