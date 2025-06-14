import { Static, t } from "elysia";

export type UserData = unknown;

/**
 * A user ID is a long serialized as a string.
 * A user's ID is a Snowflake identifier.
 */
export type UserId = string;

/**
 * A user profile is the public information about a user.
 */
export type UserProfile = {
    _id: UserId;
    displayName: string;
    profilePicture: string;
};

export type Message = {
    content: string;
    timestamp: Date;
};

/**
 * This RPC type is used for errors while handling requests.
 */
export const Error$Type = t.Object({
    error: t.String(),
    timestamp: t.Number()
});
export type Error = Static<typeof Error$Type>;

/**
 * This RPC type is for public facing user data.
 */
export const User$Type = t.Object({
    id: t.String(),
    username: t.String(),
    displayName: t.String(),
    timezone: t.Optional(t.String())
});
export type User = Static<typeof User$Type>;

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
export type Conversation = Static<typeof Conversation$Type>;

/**
 * A 'last message' is used in the message list.
 */
export type LastMessage = UserProfile & Message;
