import { Box, Heading, VStack, Button } from "native-base";
import { Link, useRouter } from "expo-router";
import BGimage from "../containers/BGImage";
import { CopyrightFooter } from "../components/CopyrightFooter";

export default function WelecomeScreen() {
    const route = useRouter();
    return (
        <BGimage source={require("../assets/fg_1.jpg")} bg_color="#ede8e880">
            <Box px="4" flex="1">
                <VStack my="16">
                    <Heading fontSize="4xl" color="white">
                        Connexion{" "}
                    </Heading>
                    <Heading fontSize="4xl" color="white">
                        a votre profile
                    </Heading>
                </VStack>
                <VStack space="6">
                    <Button
                        bgColor="coolGray.900"
                        _text={{
                            textTransform: "uppercase",
                            fontSize: "lg",
                        }}
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
                        <Box width="full" alignItems="flex-end">
                            <Link
                                href="/welcome"
                                style={{
                                    color: "white",
                                }}
                            >
                                Pas encore de compte ?
                            </Link>
                        </Box>
                    </VStack>
                </VStack>
                <Box
                    position="absolute"
                    bottom="5"
                    justifyContent="center"
                    left="0"
                    right="0"
                >
                    <CopyrightFooter />
                </Box>
            </Box>
        </BGimage>
    );
}
