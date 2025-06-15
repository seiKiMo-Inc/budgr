import { type StyleProp, StyleSheet, TouchableOpacity, View } from "react-native";

import type { LastMessage } from "@repo/shared";
import { Size, StyledText, useColor } from "@repo/ui";
import { Image } from "expo-image";

/**
 * Converts an exact time into a delta based on the current time.
 *
 * @param timestamp - The timestamp to convert.
 */
function convertTime(timestamp: Date): string {
    const current = new Date();
    const delta = current.getTime() - timestamp.getTime();
    const seconds = Math.floor(delta / 1000);

    // Within the last minute.
    if (seconds < 60) {
        return "now";
    }
    // Within the last hour.
    if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes}m`;
    }
    // Within the last day.
    if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours}h`;
    }
    // More than a day ago.
    const days = Math.floor(seconds / 86400);
    return `${days}d`;
}

interface IProps {
    style?: StyleProp<typeof TouchableOpacity>;
    message: LastMessage;
}

function UserDisplay({ style, message }: IProps) {
    const color = useColor();
    const timestamp = convertTime(message.timestamp);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={"p-2.5 flex-row justify-between items-start rounded-xl mb-2"}
            style={{ backgroundColor: color.contrast, ...(style as object) }}
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

            <StyledText style={{ marginRight: 8 }}>{timestamp}</StyledText>
        </TouchableOpacity>
    );
}

export default UserDisplay;

const css = StyleSheet.create({
    UserDisplay_Image: {
        width: 48,
        height: 48,
        borderRadius: 100
    }
});
