import { Link } from "expo-router";
import { View } from "react-native";

function Home() {
    return (
        <View className={"flex-1 bg-white items-center justify-center gap-2"}>
            <Link href={"/dev/text"}>Text Playground</Link>
            <Link href={"/dev/post"}>Post Playground</Link>
            <Link href={"/dev/auth"}>Auth Playground</Link>
        </View>
    );
}

export default Home;
