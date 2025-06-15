import Elysia, { t } from "elysia";
import { Conversation$Type, Error$Type } from "@/types.ts";

import { generateSnowflake, prisma } from "@/lib";

import { newError } from "@controllers/utils.ts";
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
    .delete(
        "/:id",
        async ({ user, params }) => {
            // Ensure the conversation exists.
            const conversation = await prisma.conversation.findUnique({
                where: { id: params.id }
            });
            if (!conversation) {
                throw new Error(`Conversation with ID ${params.id} does not exist.`);
            }

            // Ensure the user is a participant in the conversation.
            const participant = await prisma.participant.findFirst({
                where: { conversationId: params.id, userId: user.id }
            });
            if (!participant) {
                throw new Error(`You are not a participant in this conversation.`);
            }

            // Delete the conversation.
            await prisma.conversation.delete({
                where: { id: params.id }
            });

            return { success: true };
        }
    )
    .get(
        "/recents",
        async ({ user }) => {
            return "asdf";
        },
        {
            response: t.Object({

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

            // Add the users to the conversation.
            await addConversationParticipant(id, user.id);
            for (const userId of body.users) {
                // Ensure the user exists before adding them.
                const existingUser = await prisma.user.findUnique({
                    where: { id: userId }
                });
                if (!existingUser) {
                    throw new Error(`User with ID ${userId} does not exist.`);
                }
                await addConversationParticipant(id, userId);
            }

            // Query and return the full conversation.
            const conversation = await getFullConversationById(id);
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
            },
            error({ error, set }) {
                set.status = 500;
                return newError(500, error.toString());
            }
        }
    );

export * from "@controllers/conversations/helpers.ts";
