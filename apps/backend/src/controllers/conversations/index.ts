import Elysia, { t } from "elysia";
import { Conversation$Type, Error$Type } from "@repo/shared";

import { generateSnowflake, prisma } from "@/lib";

import { error } from "@/controllers";
import UserController from "@controllers/auth.ts";

import {
    addConversationParticipant,
    getConversationsForUser,
    getFullConversationById,
} from "@controllers/conversations";

export default new Elysia({ prefix: "/conversations" })
    .use(UserController)
    .guard({ auth: true })
    .get(
        "/",
        async ({ user }) => {
            const conversations = await getConversationsForUser(user.id);
            return { conversations };
        },
        {
            response: t.Object({
                conversations: t.Array(Conversation$Type)
            })
        }
    )
    .post(
        "/new",
        async ({ user, body, set }) => {
            // Create a new conversation.
            const id = generateSnowflake();
            await prisma.conversation.create({
                data: {
                    id,
                    updatedAt: new Date(),
                    name: body.name ?? `A Conversation with ${user.name}`,
                    description: null
                }
            });

            // Add the user to the conversation.
            await addConversationParticipant(id, user.id);

            // Query and return the full conversation.
            const conversation = await getFullConversationById(id);
            if (!conversation) {
                set.status = 500;
                return error("Failed to create conversation.");
            }
            return { conversation };
        },
        {
            body: t.Object({
                name: t.Optional(t.String()),
                users: t.Array(t.String())
            }),
            response: {
                200: t.Object({
                    conversation: Conversation$Type
                }),
                500: Error$Type
            }
        }
    );

export * from "@controllers/conversations/helpers.ts";
