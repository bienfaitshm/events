import * as React from "react";
import { StyleSheet } from "react-native";
import { Box, Text, Input, Heading, VStack, Button } from "native-base";
import { useRouter } from "expo-router";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
import BGimage from "../containers/BGImage";

const CELL_COUNT = 5;

export default function ControlerScreen() {
    const router = useRouter();
    const [value, setValue] = React.useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <BGimage source={require("../assets/fg_1.jpg")} bg_color="#ede8e880">
            <Box flex={1} px="5">
                <VStack mt="10">
                    <Heading size="2xl" color="white">
                        Connexion
                    </Heading>
                    <Heading size="2xl" color="white">
                        A L'Event
                    </Heading>
                </VStack>
                <Box my="10">
                    <CodeField
                        ref={ref}
                        {...props}
                        rootStyle={styles.codeFieldRoot}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[
                                    styles.cell,
                                    isFocused && styles.focusCell,
                                ]}
                                onLayout={getCellOnLayoutHandler(index)}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </Box>
                <VStack space="10">
                    <VStack space="3">
                        <Button
                            bgColor="coolGray.900"
                            _text={{
                                textTransform: "uppercase",
                                fontSize: "lg",
                            }}
                        >
                            Connexion
                        </Button>
                        <Box alignItems="flex-end">
                            <Text color="white">Pas encore de compte ?</Text>
                        </Box>
                    </VStack>
                    <Button
                        _text={{
                            color: "coolGray.800",
                            textTransform: "uppercase",
                            fontSize: "lg",
                        }}
                        bgColor="white"
                        tintColor="coolGray.800"
                        onPress={() => router.push("organisator")}
                    >
                        Organisateur
                    </Button>
                </VStack>
            </Box>
        </BGimage>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 50,
        height: 60,
        lineHeight: 58,
        fontSize: 26,
        borderWidth: 2,
        borderColor: "#e3d4ff",
        textAlign: "center",
        borderRadius: 10,
    },
    focusCell: {
        borderColor: "#fff",
    },
});
