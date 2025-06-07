import type { ReactElement } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

import global from "@repo/mobile/src/ui/style.ts";

import StyledText, { Size } from "./StyledText.tsx";

import useColor from "./stores/color.ts";

import { Overlay } from "@rneui/base";

interface IProps {
    visible: boolean;

    title?: string;
    children?: ReactElement | ReactElement[] | undefined;

    style?: StyleProp<ViewStyle>;
    overlayStyle?: StyleProp<ViewStyle>;

    onLayout?: () => void;
    onPressOutside?: () => void;
}

function StyledModal(props: IProps) {
    const colors = useColor();

    return (
        <Overlay
            isVisible={props.visible}
            style={props.overlayStyle}
            onLayout={props.onLayout}
            onBackdropPress={props.onPressOutside}
            overlayStyle={{ backgroundColor: "transparent" }}>
            <View
                style={{
                    ...style.StyledModal,
                    backgroundColor: colors.bg.secondary,
                    ...(props.style as object)
                }}>
                {props.title && (
                    <StyledText text={props.title} bold size={Size.Subheader} />
                )}
                {props.children}
            </View>
        </Overlay>
    );
}

export default StyledModal;

const style = StyleSheet.create({
    StyledModal: {
        borderRadius: 25,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        padding: global.padding
    }
});
