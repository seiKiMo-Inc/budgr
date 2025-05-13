import type { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";

import useColor from "./stores/color.ts";

import { type IconNode, Input } from "@rneui/base";

interface IProps {
    default?: string;
    value?: string;
    icon?: IconNode;

    autoFocus?: boolean;
    autoCorrect?: boolean;
    defaultColor?: ColorValue;
    maxLength?: number;
    lines?: number;

    textStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;

    errorMessage?: string;

    onChange?: (text: string) => void;
    onFinish?: () => void;
}

function StyledTextInput(props: IProps) {
    const colors = useColor();

    return (
        <Input
            value={props.value}
            numberOfLines={props.lines}
            multiline={(props.lines ?? 1) > 1}
            placeholder={props.default}
            placeholderTextColor={props.defaultColor ?? colors.placeholder}
            rightIcon={props.icon}
            autoFocus={props.autoFocus}
            autoCorrect={props.autoCorrect}
            inputStyle={{
                color: colors.text,
                borderBottomColor: "transparent",
                ...(props.textStyle as object)
            }}
            inputContainerStyle={props.inputStyle}
            containerStyle={props.containerStyle}
            errorMessage={props.errorMessage}
            errorStyle={!props.errorMessage ? { display: "none" } : {}}
            onChangeText={props.onChange}
            onEndEditing={props.onFinish}
        />
    );
}

export default StyledTextInput;
