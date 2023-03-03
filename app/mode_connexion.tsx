import { Box, Text, Heading, VStack, Button } from "native-base";
import { Link, useRouter } from "expo-router";

export default function WelecomeScreen() {
    const route = useRouter();
    return (
        <Box px="4" flex="1">
            <VStack my="16">
                <Heading fontSize="4xl">Connexion </Heading>
                <Heading fontSize="4xl">a votre profile</Heading>
            </VStack>
            <VStack space="6">
                <Button
                    h="16"
                    rounded="full"
                    onPress={() => route.push("organisator")}
                >
                    Organisateur
                </Button>
                <VStack space="5">
                    <Button
                        h="16"
                        rounded="full"
                        onPress={() => route.push("controler")}
                    >
                        Controleur
                    </Button>
                    <Box width="full" alignItems="flex-end">
                        <Link href="/welcome">Pas encore de compte ?</Link>
                    </Box>
                </VStack>
            </VStack>
        </Box>
    );
}
