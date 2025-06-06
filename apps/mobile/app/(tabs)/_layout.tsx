import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name={"index"}
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name={"home"} color={color} />
                }}
            />
        </Tabs>
    );
}

export default Layout;
