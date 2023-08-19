/** @format */

import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { ThemeProvider as Thme, createTheme } from "@rneui/themed";

const _theme = createTheme({
    lightColors: {
        // primary: "red",
    },
    darkColors: {
        // primary: "blue",
    },
    components: {
        Button: {
            raised: false,
        },
    },
});

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
    });

    return (
        <Thme theme={_theme}>
            <NativeBaseProvider theme={theme}>
                {props.children}
            </NativeBaseProvider>
        </Thme>
    );
};

export default ThemeProvider;
