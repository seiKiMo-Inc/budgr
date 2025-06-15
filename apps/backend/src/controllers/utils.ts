import type { Error } from "@/types.ts";

/**
 * Creates an error object with a message and timestamp.
 *
 * @param code The error code to include in the error object.
 * @param message The error message to include in the error object.
 */
export function newError(code: number | string, message: string): Error {
    return {
        code,
        error: message,
        timestamp: Date.now()
    } satisfies Error;
}
