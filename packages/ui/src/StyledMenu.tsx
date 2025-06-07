import type { ReactNode } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger
} from "react-native-popup-menu";

import StyledText from "./StyledText.tsx";

import useColor from "./stores/color.ts";

interface OptionProp {
    text: string;
    icon?: ReactNode;

    onPress?: () => void;
    closeOnPress?: boolean;
}

interface IProps {
    children?: ReactNode | ReactNode[]; // Children is the trigger object.

    style?: StyleProp<ViewStyle>;
    optionsStyle?: StyleProp<ViewStyle>;

    opened?: boolean;
    close?: () => void;

    options: (OptionProp | undefined)[];
    closeOnPress?: boolean;
}

function StyledMenu(props: IProps) {
    const colors = useColor();

    return (
        <Menu
            style={{ ...style.StyledMenu, ...(props.style as object) }}
            opened={props.opened}
            onBackdropPress={props.close}
        >
            <MenuTrigger
                customStyles={{
                    triggerOuterWrapper: style.StyledMenu_Trigger
                }}
            >
                {props.children}
            </MenuTrigger>

            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        ...style.StyledMenu_Container,
                        borderColor: colors.contrast,
                        backgroundColor: colors.bg.secondary,
                        ...(props.optionsStyle as object)
                    }
                }}
            >
                {props.options.map(
                    option =>
                        option && (
                            <MenuOption
                                key={option.text}
                                onSelect={() => {
                                    option.onPress?.();
                                    if (
                                        props.closeOnPress ??
                                        option.closeOnPress
                                    ) {
                                        props.close?.();
                                    }
                                }}
                            >
                                <View style={style.StyledMenu_Option}>
                                    <StyledText text={option.text} />
                                    {option.icon}
                                </View>
                            </MenuOption>
                        )
                )}
            </MenuOptions>
        </Menu>
    );
}

export default StyledMenu;

const style = StyleSheet.create({
    StyledMenu: {
        position: "absolute",
        right: 0
    },
    StyledMenu_Trigger: {
        height: "100%"
    },
    StyledMenu_Container: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 2
    },
    StyledMenu_Option: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
