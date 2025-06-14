import { prisma } from "@/lib";
import { getUserById } from "@controllers/user";

import type { Conversation } from "@/types.ts";

/**
 * Fetches the conversation specified by its ID.
 * This will not fetch the messages of the conversation.
 *
 * @param id The ID of the conversation to fetch.
 */
export async function getFullConversationById(id: string): Promise<Conversation> {
    const conversation = await prisma.conversation.findUniqueOrThrow({
        where: { id },
        include: { participants: true }
    });

    return {
        name: conversation.name,
        description: conversation.description,
        users: (await Promise.all(conversation.participants
            .map(participant => getUserById(participant.userId))))
            .filter(user => user !== null)
    } satisfies Conversation;
}

/**
 * Adds a participant to the conversation.
 *
 * @param conversationId The ID of the conversation to add the participant to.
 * @param userId The ID of the user to add as a participant.
 */
export async function addConversationParticipant(conversationId: string, userId: string): Promise<void> {
    // Check if the participant already exists.
    const existing = await prisma.participant.findFirst({
        where: { conversationId, userId }
    });

    if (existing) {
        throw new Error("Participant already exists in the conversation.");
    }

    // Create the participant.
    await prisma.participant.create({
        data: { conversationId, userId }
    });

    // Update the conversation's updatedAt timestamp.
    await prisma.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() }
    });
}

/**
 * Fetches all the conversations a user is in.
 *
 * @param userId
 */
export async function getConversationsForUser(userId: string): Promise<Conversation[]> {
    const conversations = await prisma.conversation.findMany({
        where: {
            participants: {
                some: { userId }
            }
        },
        select: { id: true }
    });

    // Resolve each conversation and return them.
    return (await Promise.all(conversations
        .map(conversation => getFullConversationById(conversation.id))))
        .filter(conversation => conversation !== null);
}
