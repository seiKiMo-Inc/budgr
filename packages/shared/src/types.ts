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
 * A 'last message' is used in the message list.
 */
export type LastMessage = UserProfile & Message;
