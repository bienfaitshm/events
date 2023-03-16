import { Box, Text, VStack, Heading, Input, Button } from "native-base";
import { useRouter } from "expo-router";

export default function OrganisatorScreen() {
    const route = useRouter();
    const handlerSubmit = () => {
        route.push("home");
    };
    return (
        <Box flex={1} px="5">
            <VStack my="10">
                <Heading size="2xl">Connexion</Heading>
                <Heading size="2xl">A votre compte</Heading>
            </VStack>
            <VStack space={4}>
                <Input
                    size="lg"
                    variant="underlined"
                    placeholder="Identifiant"
                />
                <Input
                    size="lg"
                    variant="underlined"
                    placeholder="Mot de passe"
                />
                <Box alignItems="flex-end">
                    <Text>Oublier ?</Text>
                </Box>
            </VStack>
            <VStack mt="10" space={10}>
                <VStack space={3}>
                    <Button onPress={handlerSubmit}>Connexion</Button>
                    <Box alignItems="flex-end">
                        <Text>Pas encore de compte ?</Text>
                    </Box>
                </VStack>
                <Button onPress={() => route.push("controler")}>
                    Controleur
                </Button>
            </VStack>
        </Box>
    );
}
