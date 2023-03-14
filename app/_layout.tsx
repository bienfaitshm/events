import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
// Catch any errors thrown by the Layout component.
export {ErrorBoundary,} from "expo-router";
import { NativeBaseProvider, extendTheme } from "native-base";

export const unstable_settings = {
    initialRouteName: "welcome",
};

export default function Layout() {
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

function RootLayoutNav() {
    return (
        <>
            <ThemeProvider>
                <Stack>
                    <Stack.Screen
                        name="welcome"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="modal"
                        options={{ presentation: "modal" }}
                    />
                </Stack>
            </ThemeProvider>
        </>
    );
}

const ThemeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const theme = extendTheme({
        colors: {
            // Add new color
            primary: {
                50: "#E3F2F9",
                100: "#C5E4F3",
                200: "#A2D4EC",
                300: "#7AC1E4",
                400: "#47A9DA",
                500: "#0088CC",
                600: "#007AB8",
                700: "#006BA1",
                800: "#005885",
                900: "#003F5E",
            },
            // Redefining only one shade, rest of the color will remain same.
            amber: {
                400: "#d97706",
            },
        },
        config: {
            // Changing initialColorMode to 'dark'
            initialColorMode: "white",
        },
        components: {
            Button: {
                // Can simply pass default props to change default behaviour of components.
                baseStyle: {
                    rounded: "full",
                    h: "16",
                    _text: {
                        fontSize: "xl",
                    },
                },
                defaultProps: {
                    fontSize: "lg",
                    _text: {
                        fontSize: "lg",
                    },
                },
            },
        },
    });

    return (
        <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
    );
};
