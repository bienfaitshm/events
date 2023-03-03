import { useRouter } from "expo-router";
import { Box, Text, Button, VStack, Heading } from "native-base";
import { CopyrightFooter } from "../components/CopyrightFooter";

export default function Welcome() {
    const route = useRouter();
    return (
        <Box flex={1} p="3" justifyContent="center" alignItems="center">
            <VStack space="3">
                <VStack space="1" justifyContent="center" alignItems="center">
                    <Box h="24" w="24" bgColor="black" />
                    <Box mt="4" alignItems="center">
                        <Heading fontSize="4xl">Event Plan</Heading>
                        <Text>Controle your event</Text>
                    </Box>
                </VStack>
                <Box mt="16" w="72">
                    <Button
                        h="16"
                        rounded="full"
                        onPress={() => route.push("/mode_connexion")}
                    >
                        Commencer
                    </Button>
                </Box>
            </VStack>
            <Box position="absolute" bottom="5">
                <CopyrightFooter />
            </Box>
        </Box>
    );
}
