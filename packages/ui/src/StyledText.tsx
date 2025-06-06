import { type StyleProp, Text, type TextStyle } from "react-native";
import TextTicker from "react-native-text-ticker";

import useColor from "./stores/color.ts";

export enum Size {
    Text = 16,
    Footnote = 12,
    Header = 24,
    Subheader = 20,
    Title = 32,
    Subtitle = 28
}

type TextProp = { children: string | string[] } | { text: string };

type IProps = TextProp & {
    lines?: number;
    size?: Size | number;

    bold?: boolean;
    ticker?: boolean;
    uppercase?: boolean;
    underlined?: boolean;

    style?: StyleProp<TextStyle>;
    onPress?: () => void;
};

function StyledText(props: IProps) {
    const colors = useColor();

    const style = {
        color: colors.text,
        fontFamily: `Sarala_${props.bold ? "700Bold" : "400Regular"}`,
        textDecorationLine: props.underlined ? "underline" : "none",
        textTransform: props.uppercase ? "uppercase" : "none",
        fontSize: props.size || Size.Text,
        ...(props.style as object)
    } satisfies StyleProp<TextStyle>;

    const text = "children" in props ? props.children : props.text;

    return !props.ticker ? (
        <Text
            style={style}
            ellipsizeMode={"tail"}
            numberOfLines={props.lines ?? 1}
            onPress={props.onPress}
        >
            {text}
        </Text>
    ) : (
        <TextTicker
            style={style}
            ellipsizeMode={"tail"}
            numberOfLines={props.lines ?? 1}
            onPress={props.onPress}
            duration={100 * text.length}
            loop
            bounce
        >
            {text}
        </TextTicker>
    );
}

export default StyledText;
