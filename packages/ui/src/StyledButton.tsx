import type { StyleProp, TextStyle, ViewStyle } from "react-native";

import useColor from "./stores/color.ts";

import type { IconNode } from "@rneui/base";
import { Button } from "@rneui/themed";

interface IProps {
    text: string;
    icon?: IconNode;
    disabled?: boolean;

    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    disabledStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;

    onPress?: () => void;
    onHold?: () => void;
}

function StyledButton(props: IProps) {
    const colors = useColor();

    return (
        <Button
            disabled={props.disabled}
            title={props.text}
            icon={props.icon}
            titleStyle={{
                color: colors.text,
                ...(props.titleStyle as object)
            }}
            buttonStyle={{
                backgroundColor: colors.accent,
                ...(props.buttonStyle as object)
            }}
            disabledStyle={props.disabledStyle}
            containerStyle={props.style}
            activeOpacity={0.7}
            onPress={props.onPress}
            onLongPress={props.onHold}
        />
    );
}

export default StyledButton;
