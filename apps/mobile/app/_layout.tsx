import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Sarala_400Regular, Sarala_700Bold } from "@expo-google-fonts/sarala";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

function Layout() {
    const [loaded, error] = useFonts({
        Sarala_400Regular,
        Sarala_700Bold
    });

    useEffect(() => {
        // Hide the splash screen once fonts are loaded or if there is an error.
        if (loaded || error) {
            SplashScreen.hide();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null; // Prevent rendering until fonts are loaded.
    }

    return (
        <>
            <StatusBar style={"auto"} />

            <Stack />
        </>
    );
}

export default Layout;
