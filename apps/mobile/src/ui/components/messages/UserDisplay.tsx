import { StyleSheet, TouchableOpacity, View } from "react-native";

import type { LastMessage } from "@repo/shared";
import { Size, StyledText, useColor } from "@repo/ui";
import { Image } from "expo-image";

interface IProps {
    message: LastMessage;
}

function UserDisplay({ message }: IProps) {
    const color = useColor();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={"p-2.5 flex-row justify-between items-start rounded-xl"}
            style={{ backgroundColor: color.contrast }}
        >
            <View className={"flex-row items-center gap-3"}>
                <Image
                    style={css.UserDisplay_Image}
                    source={message.profilePicture}
                    contentFit={"cover"}
                />

                <View className={"flex-col"}>
                    <StyledText color={color.text.primary}>
                        {message.displayName}
                    </StyledText>

                    <StyledText
                        size={Size.Footnote}
                        color={color.text.tertiary}
                    >
                        {message.content}
                    </StyledText>
                </View>
            </View>

            <StyledText style={{ marginRight: 8 }}>1h</StyledText>
        </TouchableOpacity>
    );
}

export default UserDisplay;

const css = StyleSheet.create({
    UserDisplay_Image: {
        width: 48, height: 48,
        borderRadius: 100
    }
});
