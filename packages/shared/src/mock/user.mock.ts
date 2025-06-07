import type { UserData, UserProfile } from "../types.ts";

/**
 * Generated from the default settings at:
 * https://www.onlineappzone.com/snowflake-id-generator/
 */
export const MockUserId = "7336889053922463744";

export const MockUser = {

} satisfies UserData;

export const MockUserProfile = {
    _id: MockUserId,
    displayName: "Bob",
    profilePicture: "https://dummyimage.com/512x512/000000/ffffff",
} satisfies UserProfile;
