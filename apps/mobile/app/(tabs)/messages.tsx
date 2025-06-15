import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";

import useUser from "@hooks/useUser.ts";
import { Size, StyledButton, StyledText, useColor } from "@repo/ui";
import UserDisplay from "@ui/components/messages/UserDisplay.tsx";

import useConversations from "@hooks/useConversations.ts";
import { MockLastMessage } from "@repo/shared";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";

function Header() {
    const color = useColor();
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                backgroundColor: color.bg.primary,
                paddingTop: insets.top
            }}
            className={"flex-col pb-4 mb-2 gap-2"}
        >
            <StyledText bold size={Size.Subheader}>
                Messages
            </StyledText>

            <View className={"flex-row items-center gap-2"}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className={"p-2 rounded-full"}
                    style={{ backgroundColor: color.accent }}
                >
                    <Feather
                        size={20}
                        name={"search"}
                        color={color.text.accent}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className={
                        "flex-col flex-1 self-stretch justify-center items-center rounded-full"
                    }
                    style={{ backgroundColor: color.accent }}
                >
                    <StyledText color={color.text.accent}>
                        Add Friends
                    </StyledText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function UserList() {
    const color = useColor();
    const conversations = useConversations();

    // If the user has no conversations, we can't show the list.
    if (conversations.length === 0) {
        return (
            <View className={"flex-1 items-center justify-center gap-2 px-16"}>
                <StyledText>
                    You have no conversations yet.
                </StyledText>

                <StyledButton
                    style={{ borderRadius: 16 }}
                    titleStyle={{ color: color.text.accent }}
                >
                    Start a Conversation
                </StyledButton>
            </View>
        );
    }

    // Otherwise, we show them their conversations.
    return (
        <FlashList
            data={conversations}
            renderItem={(props) => {
                const { item } = props;
                const message = {
                    _id: item.users[0].id,
                    displayName: item.users[0].displayName,
                    profilePicture: MockLastMessage.profilePicture,
                    content: "test",
                    timestamp: new Date(1749872370000)
                };

                return (
                    <UserDisplay {...props} message={message} />
                );
            }}
            estimatedItemSize={50}
        />
    );

    // return (
    //     <View className={"flex-col px-4 self-stretch gap-4"}>
    //         <UserDisplay message={MockLastMessage} />
    //     </View>
    // );
}

function Messages() {
    const color = useColor();
    const user = useUser();

    // If the user isn't logged in, we can't show messages.
    if (!user) {
        return null;
    }

    return (
        <View
            className={"flex-1 flex-col px-6"}
            style={{ backgroundColor: color.bg.primary }}
        >
            <Header />
            <UserList />
        </View>
    );
}

export default Messages;
