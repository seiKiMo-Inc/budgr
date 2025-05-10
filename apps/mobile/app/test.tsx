import { View } from "react-native";

import { Link } from "expo-router";

import { StyledText } from "@repo/ui";

function Test() {
    return (
        <View
            className={"h-full bg-blue-400 items-center justify-center gap-2"}>
            <StyledText text={"This is the test page."} />
            <Link href={"/"}>Go back home</Link>
        </View>
    );
}

export default Test;
