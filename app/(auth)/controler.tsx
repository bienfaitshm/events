import * as React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { StyleSheet } from "react-native";
import { Box, Text, Input, Heading, VStack, Button } from "native-base";
import { useRouter, Stack } from "expo-router";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

import BGimage from "../../containers/BGImage";
import LabelInput from "../../components/LabelInput";
import { useLoginControler } from "../../hooks/apis";
import { useToastAction } from "../../hooks/useToastAction";
import { useAuthentication } from "../../hooks/useAuthPersisteInfos";

const CELL_COUNT = 5;

type DataInputType = {
    access_code: string;
};

const validationSchema = Yup.object().shape({
    access_code: Yup.string().required("Le code d'acces est obligatoire"),
});

export default function ControlerScreen() {
    const authentication = useAuthentication();
    const toast = useToastAction();
    const mutation = useLoginControler();
    const router = useRouter();
    const { control, handleSubmit, setValue, watch } = useForm<DataInputType>({
        resolver: yupResolver(validationSchema),
    });

    const value = watch("access_code");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue: (code) => setValue("access_code", code),
    });

    const onSubmit: SubmitHandler<DataInputType> = (data) => {
        mutation.mutate(data, {
            onError(error: any) {
                const message = error.response
                    ? "Verifier vos donnees"
                    : error.message;
                // console.log("Error", JSON.stringify(error.response, null, 4));
                toast.toastError(message);
            },
            onSuccess(data) {
                toast.toastSuccess("Connexion reussi!");
                authentication.setToken(data);
            },
        });
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: "transparent",
                    },
                    headerTransparent: true,
                    statusBarTranslucent: true,
                    statusBarStyle: "light",
                }}
            />

            <BGimage
                source={require("../assets/fg_1.jpg")}
                bg_color="#ede8e880"
            >
                <Box flex={1} px="5">
                    <VStack mt="10" pt="16">
                        <Heading size="2xl" color="white">
                            Connexion
                        </Heading>
                        <Heading size="2xl" color="white">
                            A L'Event
                        </Heading>
                    </VStack>
                    <Box my="10">
                        <Controller
                            name="access_code"
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <LabelInput
                                    label=""
                                    errorMessage={error?.message}
                                    isInvalid={Boolean(error)}
                                >
                                    <CodeField
                                        ref={ref}
                                        {...props}
                                        rootStyle={styles.codeFieldRoot}
                                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                        value={value}
                                        onChangeText={onChange}
                                        cellCount={CELL_COUNT}
                                        keyboardType="number-pad"
                                        textContentType="oneTimeCode"
                                        renderCell={({
                                            index,
                                            symbol,
                                            isFocused,
                                        }) => (
                                            <Text
                                                key={index}
                                                style={[
                                                    styles.cell,
                                                    isFocused &&
                                                        styles.focusCell,
                                                ]}
                                                onLayout={getCellOnLayoutHandler(
                                                    index
                                                )}
                                            >
                                                {symbol ||
                                                    (isFocused ? (
                                                        <Cursor />
                                                    ) : null)}
                                            </Text>
                                        )}
                                    />
                                </LabelInput>
                            )}
                        />
                    </Box>
                    <VStack space="10">
                        <VStack space="3">
                            <Button
                                disabled={mutation.isLoading}
                                isLoading={mutation.isLoading}
                                isLoadingText="Connexion en cours..."
                                onPress={handleSubmit(onSubmit)}
                                bgColor="coolGray.900"
                                rounded="full"
                                _text={{
                                    textTransform: "uppercase",
                                    fontSize: "lg",
                                }}
                            >
                                Connexion
                            </Button>
                            {/* <Box alignItems="flex-end">
                            <Text color="white">Pas encore de compte ?</Text>
                        </Box> */}
                        </VStack>
                        <Button
                            rounded="full"
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
        </>
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
