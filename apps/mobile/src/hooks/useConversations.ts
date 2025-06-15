import { useCallback, useEffect, useState } from "react";
import type { Conversation } from "@backend/types.ts";
import client from "@backend/client.ts";
import { useFocusEffect } from "expo-router";

async function queryConversations(set: (conversations: Conversation[]) => void): Promise<void> {
    const { data, error } = await client.conversations.get();
    if (error) {
        // TODO: Handle error properly.
        console.error(error);
        return;
    }

    // Set conversations.
    set(data.conversations);
}

function useConversations(): Conversation[] {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useFocusEffect(
        useCallback(() => {
            queryConversations(setConversations);
        }, [])
    );

    useEffect(() => {
        queryConversations(setConversations);
    }, []);

    return conversations;
}

export default useConversations;
