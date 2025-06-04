import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { StyledButton, StyledText } from "@repo/ui";

import { authClient } from "@backend/auth.ts";
import client from "@backend/client.ts";

import "../global.css";

function App() {
    const { data: session } = authClient.useSession();

    return (
        <View className={"flex-1 bg-white items-center justify-center gap-2"}>
            <StyledText
                text={`dev server: ${process.env.EXPO_PUBLIC_BASE_URL}`}
            />

            {session ? (
                <StyledText text={`session: ${session.user.name}`} />
            ) : (
                <StyledText text={"no session found"} />
            )}

            <StyledButton
                text={"Login"}
                onPress={async () => {
                    await authClient.signIn.social({
                        provider: "discord",
                        callbackURL: "/"
                    });
                }}
            />

            <StyledButton
                text={"Logout"}
                onPress={async () => await authClient.signOut()}
            />

            <Link href={"/dev/text"}>Text Playground</Link>
            <Link href={"/dev/post"}>Post Playground</Link>
        </View>
    );
}

export default App;
