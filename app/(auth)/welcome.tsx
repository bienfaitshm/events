import { useRouter, Stack } from "expo-router";
import { Box, Text, Button, VStack, Heading } from "native-base";
import { CopyrightFooter } from "../../components/CopyrightFooter";
import BGimage from "../../containers/BGImage";
// import FG_IMG from "../assets/fonts/SpaceMono-Regular.ttf";

export default function Welcome() {
    const route = useRouter();
    return (
        <BGimage source={require("../assets/fg_1.jpg")} bg_color="#403e3ea8">
            <Stack />
            <Box flex={1} p="3" justifyContent="center" alignItems="center">
                <VStack space="3">
                    <VStack
                        space="1"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box h="24" w="24" bgColor="white" />
                        <Box mt="4" alignItems="center">
                            <Heading fontSize="4xl" color="white">
                                Event Plan
                            </Heading>
                            <Text color="white">Controle your events</Text>
                        </Box>
                    </VStack>
                    <Box mt="16" w="72">
                        <Button
                            _text={{
                                color: "coolGray.800",
                                textTransform: "uppercase",
                                fontSize: "lg",
                            }}
                            bgColor="white"
                            tintColor="coolGray.800"
                            fontSize="xl"
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
        </BGimage>
    );
}
