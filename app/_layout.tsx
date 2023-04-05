import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import ThemeProvider from "../providers/ThemeProvider";
import AuthenticationProvider from "../providers/AuthenticationProvider";
import ApiClientProvider from "../providers/ApiClientProvider";

export const unstable_settings = {
    initialRouteName: "(auth)/index",
};

export default function _Layout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    return (
        <>
            {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
            {!loaded && <SplashScreen />}
            {loaded && <RootLayoutNav />}
        </>
    );
}

export function RootLayoutNav() {
    return (
        <>
            <ThemeProvider>
                <ApiClientProvider>
                    <AuthenticationProvider>
                        <Stack
                            screenOptions={{
                                contentStyle: {
                                    backgroundColor: "white",
                                },
                            }}
                        ></Stack>
                    </AuthenticationProvider>
                </ApiClientProvider>
            </ThemeProvider>
        </>
    );
}
