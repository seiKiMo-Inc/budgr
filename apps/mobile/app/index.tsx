import { View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { StyledButton, StyledText } from "@repo/ui";

function App() {
    // Or use this to get the router:
    // import { useRouter } from "expo-router";
    // const router = useRouter();

    return (
        <View className={"flex-1 bg-white items-center justify-center gap-2"}>
            <StatusBar style={"auto"} />

            <StyledText
                text={"Open up src/App.tsx start working on your app!"}
            />
            <StyledButton
                text={"Go to test page"}
                onPress={() => router.navigate("/test")}
            />
        </View>
    );
}

export default App;
