import { View } from "react-native";
import { Image } from "expo-image";
import { StyledText } from "@repo/ui";
import { authClient } from "@backend/auth.ts";

interface IProfileProps {
    username: string;
    displayName: string | null;
    profilePicture: string | null;
    biography?: string | null;
}

function Profile(props: IProfileProps) {
    return (
        <View className={"flex-row p-4 gap-6 items-center"}>
            <Image
                source={props.profilePicture}
                style={{ borderRadius: 100, width: 64, height: 64 }}
            />

            <View className={"flex-col"}>
                <StyledText>{props.displayName ?? props.username}</StyledText>
                <StyledText>{props.biography ?? "(empty bio)"}</StyledText>
            </View>
        </View>
    );
}

function PostPlayground() {
    const { data = null } = authClient.useSession();
    const { user } = data || {};

    return user ? (
        <View className={"flex flex-col gap-4"}>
            <Profile
                username={user.name}
                displayName={null}
                profilePicture={user.image ?? null}
                biography={"Test"}
            />
        </View>
    ) : (
        <View>
            <StyledText>You have not signed in.</StyledText>
        </View>
    );
}

export default PostPlayground;
