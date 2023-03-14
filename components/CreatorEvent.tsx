import * as React from "react";
import {
    Box,
    Text,
    VStack,
    Avatar,
    Input,
    HStack,
    ScrollView,
    Button,
} from "native-base";

const LabelInput: React.FC<{
    label: string;
    children: React.ReactNode;
    labelColor?: string;
}> = ({ label, labelColor, children }) => {
    return (
        <VStack flex={1}>
            <Text fontSize="md" color={labelColor}>
                {label}
            </Text>
            {children}
        </VStack>
    );
};

const CreatorEvents = () => {
    return (
        <ScrollView>
            <VStack p="4" pb="10" bg="black" space={10}>
                <VStack space={4}>
                    <Avatar
                        bg="green.500"
                        size="lg"
                        source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                        }}
                    >
                        AJ
                    </Avatar>
                    <Text color="white" fontSize="2xl">
                        Creation Event
                    </Text>
                </VStack>
                <VStack space={4}>
                    <LabelInput label="Nom Event" labelColor="white">
                        <Input
                            fontSize="md"
                            variant="underlined"
                            placeholderTextColor="white"
                        />
                    </LabelInput>
                    <LabelInput label="Date" labelColor="white">
                        <Input
                            fontSize="md"
                            variant="underlined"
                            placeholderTextColor="white"
                        />
                    </LabelInput>

                    <HStack space={10}>
                        <LabelInput label="Debut" labelColor="white">
                            <Input
                                flex={1}
                                fontSize="md"
                                variant="underlined"
                                placeholderTextColor="white"
                            />
                        </LabelInput>
                        <LabelInput label="Fin" labelColor="white">
                            <Input
                                flex={1}
                                fontSize="md"
                                variant="underlined"
                                placeholderTextColor="white"
                            />
                        </LabelInput>
                    </HStack>
                </VStack>
            </VStack>
            <VStack p="4" space={8}>
                <LabelInput label="Description">
                    <Input fontSize="md" variant="underlined" multiline />
                </LabelInput>
                <Button colorScheme="black" bgColor="black">
                    Enregistrer
                </Button>
            </VStack>
        </ScrollView>
    );
};

export default CreatorEvents;
