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
                    set.status = 400;
                    return newError(`User with ID ${userId} does not exist.`);
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
                return newError(error.toString());
            }
        }
    );

export * from "@controllers/conversations/helpers.ts";
