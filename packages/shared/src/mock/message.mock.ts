import { LastMessage, Message } from "../types.ts";
import { MockUserProfile } from "./user.mock.ts";

export const MockMessage = {
    content: "Hello World!",
    timestamp: new Date(1749251199000),
} satisfies Message;

export const MockLastMessage = {
    ...MockUserProfile,
    ...MockMessage
} satisfies LastMessage;
