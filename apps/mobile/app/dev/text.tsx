import { StyledTextInput } from "@repo/ui";
import { useState } from "react";
import { Text, View } from "react-native";

function TextPlayground() {
    const [text, setText] = useState("Hello, World!");

    return (
        <View style={{ padding: 12 }}>
            <StyledTextInput
                containerStyle={{ marginBottom: 16 }}
                default={"Test"}
                onChange={setText}
            />

            <View className={"flex-col gap-2 mb-4"}>
                <Text style={{ fontSize: 20, fontFamily: "Sarala_400Regular" }}>
                    {text}
                </Text>
                <Text style={{ fontSize: 17, fontFamily: "Sarala_400Regular" }}>
                    {text}
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "Sarala_400Regular" }}>
                    {text}
                </Text>
                <Text style={{ fontSize: 12, fontFamily: "Sarala_400Regular" }}>
                    {text}
                </Text>
            </View>

            <View className={"flex-col gap-2 mb-4"}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 700,
                        fontFamily: "Sarala_700Bold"
                    }}>
                    {text}
                </Text>
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: 700,
                        fontFamily: "Sarala_700Bold"
                    }}>
                    {text}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: "Sarala_700Bold"
                    }}>
                    {text}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "Sarala_700Bold"
                    }}>
                    {text}
                </Text>
            </View>
        </View>
    );
}

export default TextPlayground;
