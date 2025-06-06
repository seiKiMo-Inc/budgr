import { View } from "react-native";
import { authClient } from "@backend/auth.ts";
import { StyledButton, StyledText } from "@repo/ui";

function AuthPlayground() {
    const { data: session } = authClient.useSession();

    return session ? (
        <View className={"flex-1 flex-col items-center justify-center gap-4"}>
            <StyledText>authenticated user's name: {session.user.name}</StyledText>

            <StyledButton
                text={"Log out"}
                onPress={async () => await authClient.signOut()}
            />
        </View>
    ) : (
        <View className={"flex-1 flex-col items-center justify-center gap-4"}>
            <StyledText>You need to sign in.</StyledText>

            <StyledButton
                text={"Login"}
                onPress={async () => {
                    await authClient.signIn.social({
                        provider: "discord",
                        callbackURL: "/"
                    });
                }}
            />
        </View>
    );
}

export default AuthPlayground;
