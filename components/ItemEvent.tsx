import React from "react";
import { View, Box, Text, VStack, Heading, HStack } from "native-base";

const ItemNameEvent: React.FC = () => {
    return (
        <Box>
            <HStack justifyContent="center" space="3">
                <Box w="2" h="2" bg="red.500" rounded="full" mt="1.5" />
                <VStack>
                    <Text color="white" bold fontSize="sm">
                        09:30 Mariage Civile
                    </Text>
                    <Text color="coolGray.200" fontSize="2xs">
                        Commune lubumbashi
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};

export default function ItemEvent() {
    return (
        <View>
            <HStack m="3" p="3" bgColor="black" rounded="md">
                <Box w={100} pl="2">
                    <VStack justifyContent="center">
                        <Heading color="white">13</Heading>
                        <Text color="white">Mars</Text>
                    </VStack>
                </Box>
                <Box>
                    <VStack space={3}>
                        <ItemNameEvent />
                        <ItemNameEvent />
                        <ItemNameEvent />
                    </VStack>
                </Box>
            </HStack>
        </View>
    );
}
