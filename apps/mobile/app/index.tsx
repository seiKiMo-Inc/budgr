import { useState } from "react";
import { View } from "react-native";

import { StyledButton, StyledText } from "@repo/ui";

import client from "@backend/client.ts";
import { authClient } from "@backend/auth.ts";

import "../global.css";

function App() {
    const [status, setStatus] = useState<string | number>(-1);

    return (
        <View className={"flex-1 bg-white items-center justify-center gap-2"}>
            <StyledText text={`dev server: ${process.env.EXPO_PUBLIC_BASE_URL}`} />

            {
                status !== -1 && (
                    <StyledText text={`status: ${status}`} />
                )
            }

            <StyledButton
                text={"Hello World!"}
                onPress={async () => {
                    const response = await client.user.reminder.list.get();
                    setStatus(response.status);
                }}
            />

            <StyledButton
                text={"Login"}
                onPress={async () => {
                    const { data, error } = await authClient.signIn.social({
                        provider: "discord"
                    });

                    if (error) {
                        console.error("Login error:", error);
                    } else {
                        console.log("Login success:", data);
                    }
                }}
            />
        </View>
    );
}

export default App;
