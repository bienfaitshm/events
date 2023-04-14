import * as React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { Box, Input, Heading, VStack, Button } from "native-base";
import { useRouter, Stack } from "expo-router";
import BGimage from "../../containers/BGImage";
import LabelInput from "../../components/LabelInput";
import { useLoginControler } from "../../hooks/apis";
import { LoginControlerDataType } from "../../services/apis";
import { useAuthSubmiter } from "../../hooks/useSubmiter";
import ControledInput from "../../components/ControledInput";

type DataInputType = {
    access_code: string;
};

const validationSchema = Yup.object().shape({
    access_code: Yup.string().required("Le code d'acces est obligatoire"),
});

export default function ControlerScreen() {
    const mutation = useLoginControler();
    const router = useRouter();
    const { control, handleSubmit } = useForm<DataInputType>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = useAuthSubmiter<LoginControlerDataType, any>({
        mutate: mutation.mutate,
    });

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
                    <ControledInput
                        label="Code de l'evenement"
                        control={control}
                        name="access_code"
                        viewProps={{
                            my: "10",
                        }}
                        labelProps={{
                            _text: {
                                color: "white",
                            },
                        }}
                    />
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
