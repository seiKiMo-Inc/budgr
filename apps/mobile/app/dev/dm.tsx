import client from "@backend/client.ts";
import { StyledButton } from "@repo/ui";
import { View } from "react-native";

/**
 * Creates a conversation with just the user in it.
 */
async function createConversation() {
    const { data, status } = await client.conversations.new.post({
        name: "test conversation",
        users: []
    });

    if (!data || status !== 200) {
        console.error("Failed to create conversation:", data);
        return;
    }

    console.log("created conversation with id", data.conversation);
}

/**
 * Deletes all conversations for the user.
 */
async function deleteAllConversations() {
    const { data } = await client.conversations.get();
    if (!data) {
        throw new Error("Failed to fetch conversations");
    }

    for (const conversation of data.conversations) {
        const { status, data } = await client
            .conversations({ id: conversation.id })
            .delete();
        if (status !== 200) {
            console.error(
                "Failed to delete conversation:",
                conversation.id,
                data
            );
        } else {
            console.log("Deleted conversation with id", conversation.id);
        }
    }
}

function DirectMessagePlayground() {
    return (
        <View className={"flex-1 flex-col items-center justify-center gap-4"}>
            <StyledButton onPress={createConversation}>
                Create Conversation
            </StyledButton>

            <StyledButton onPress={deleteAllConversations}>
                Clear All
            </StyledButton>
        </View>
    );
}

export default DirectMessagePlayground;
