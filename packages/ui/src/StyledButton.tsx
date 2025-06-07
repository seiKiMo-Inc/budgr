import type { ReactNode } from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

import useColor from "./stores/color.ts";

import type { IconNode } from "@rneui/base";
import { Button } from "@rneui/themed";

interface IProps {
    icon?: IconNode | ReactNode;
    disabled?: boolean;

    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    disabledStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;

    onPress?: () => void;
    onHold?: () => void;
}

type ButtonContent = { text?: string | undefined } | { children?: string | undefined };

type ButtonProps = IProps & ButtonContent;

function StyledButton(props: ButtonProps) {
    const colors = useColor();

    const label = "children" in props ?
        props.children : "text" in props ?
            props.text : undefined;

    return (
        <Button
            disabled={props.disabled}
            title={label}
            icon={props.icon as IconNode}
            titleStyle={{
                color: colors.text.primary,
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
