import { t } from "elysia";

/**
 * This RPC type is used for errors while handling requests.
 */
export const Error$Type = t.Object({
    error: t.String(),
    timestamp: t.Number()
});
export type Error = typeof Error$Type.static;

/**
 * This RPC type is for public facing user data.
 */
export const User$Type = t.Object({
    id: t.String(),
    username: t.String(),
    displayName: t.String(),
    timezone: t.Optional(t.String())
});
export type User = typeof User$Type.static;

/**
 * A conversation is an intermediary mapping holding:
 * - The users in the conversation
 * - The messages in the conversation
 * - The last timestamp of the conversation
 */
export const Conversation$Type = t.Object({
    name: t.String(),
    description: t.Nullable(t.String()),
    users: t.Array(User$Type)
});
export type Conversation = typeof Conversation$Type.static;
