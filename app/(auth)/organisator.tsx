import { useRouter, Stack } from "expo-router";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Box, Text, VStack, Heading, Input, Button } from "native-base";
import { useLoginOrganisator } from "../../hooks/apis";
import LabelInput from "../../components/LabelInput";
import BGimage from "../../containers/BGImage";
import { useAuthSubmiter } from "../../hooks/useSubmiter";

type DataInputType = {
    username: string;
    access_key: string;
};

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Le nom d'utilisateur est obligatoire"),
    access_key: Yup.string().required("Le code d'acces est obligatoire"),
});

export default function OrganisatorScreen() {
    const route = useRouter();
    const { control, handleSubmit } = useForm<DataInputType>({
        resolver: yupResolver(validationSchema),
    });

    const mutation = useLoginOrganisator();
    const handlerSubmit = useAuthSubmiter({
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
                    <VStack my="10" pt="12">
                        <Heading size="xl" color="white">
                            Connexion
                        </Heading>
                        <Heading size="xl" color="white">
                            A votre compte
                        </Heading>
                    </VStack>
                    <VStack space={4}>
                        <Controller
                            control={control}
                            render={({
                                field: { value, onChange, onBlur },
                                fieldState: { error },
                            }) => (
                                <LabelInput
                                    label="Nom d'utilsateur"
                                    labelProps={{ color: "blue.400" }}
                                    errorMessage={error?.message}
                                    isInvalid={Boolean(error)}
                                >
                                    <Input
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        size="lg"
                                        variant="underlined"
                                        placeholder="Identifiant"
                                    />
                                </LabelInput>
                            )}
                            name="username"
                        />
                        <Controller
                            control={control}
                            render={({
                                field: { value, onChange, onBlur },
                                fieldState: { error },
                            }) => (
                                <LabelInput
                                    label="Code d'acces"
                                    labelProps={{ color: "white" }}
                                    errorMessage={error?.message}
                                    isInvalid={Boolean(error)}
                                >
                                    <Input
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        size="lg"
                                        variant="underlined"
                                        placeholder="code..."
                                    />
                                </LabelInput>
                            )}
                            name="access_key"
                        />

                        <Box alignItems="flex-end">
                            <Text color="white">Oublier ?</Text>
                        </Box>
                    </VStack>
                    <VStack mt="10" space={10}>
                        <VStack space={3}>
                            <Button
                                disabled={mutation.isLoading}
                                isLoading={mutation.isLoading}
                                isLoadingText="Connexion en cours..."
                                onPress={handleSubmit(handlerSubmit)}
                                h="16"
                                rounded="full"
                                _text={{
                                    color: "white",
                                    textTransform: "uppercase",
                                    fontSize: "lg",
                                }}
                                bgColor="black"
                                tintColor="coolGray.800"
                            >
                                Connexion
                            </Button>
                            <Box alignItems="flex-end">
                                <Text color="white">
                                    Pas encore de compte ?
                                </Text>
                            </Box>
                        </VStack>
                        <Button
                            h="16"
                            rounded="full"
                            _text={{
                                color: "coolGray.800",
                                textTransform: "uppercase",
                                fontSize: "lg",
                            }}
                            bgColor="white"
                            tintColor="coolGray.800"
                            onPress={() => route.push("controler")}
                        >
                            Controleur
                        </Button>
                    </VStack>
                </Box>
            </BGimage>
        </>
    );
}
