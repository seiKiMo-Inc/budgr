import { Feather, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

function Layout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name={"index"}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name={"home"} size={28} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name={"messages"}
                options={{
                    title: "Messages",
                    tabBarIcon: ({ color }) => (
                        <Feather
                            name={"message-circle"}
                            size={24}
                            color={color}
                        />
                    )
                }}
            />
        </Tabs>
    );
}

export default Layout;
