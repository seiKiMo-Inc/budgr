// noinspection RequiredAttributes
import { View } from "react-native";
import Toggle from "react-native-toggle-element";

import StyledText from "./StyledText.tsx";

import useColor from "./stores/color.ts";

interface IProps {
    toggleOnly?: boolean;

    value: boolean;
    onPress?: (value: boolean) => void;

    title?: string;
}

function StyledToggle(props: IProps) {
    const colors = useColor();

    const Switch = (
        <Toggle
            animationDuration={200}
            value={props.value}
            onPress={val => props.onPress?.(val ?? false)}
            trackBar={{
                width: 50,
                height: 15,
                activeBackgroundColor: colors.accent,
                inActiveBackgroundColor: colors.text.placeholder
            }}
            thumbButton={{
                width: 20,
                height: 20,
                activeBackgroundColor: colors.text.primary,
                inActiveBackgroundColor: colors.text.primary
            }}
        />
    );

    return props.toggleOnly ? (
        Switch
    ) : (
        <View
            style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <StyledText text={props.title ?? ""} />
            {Switch}
        </View>
    );
}

export default StyledToggle;
