import React from "react";
import { View, Box, Text, VStack, Heading, HStack } from "native-base";
import { EventTypeResponce } from "../services/apis";

type ItemNameEventProps = {
    title: string;
    description: string;
    dotcolor: string;
};

const ItemNameEvent: React.FC<ItemNameEventProps> = ({
    description,
    title,
    dotcolor,
}) => {
    return (
        <Box>
            <HStack justifyContent="center" space="3">
                <Box w="2" h="2" bg={dotcolor} rounded="full" mt="1.5" />
                <VStack>
                    <Text color="white" bold fontSize="sm">
                        {title}
                    </Text>
                    <Text color="coolGray.200" fontSize="2xs">
                        {description}
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};

type ItemEventProps = {
    mounthName: string;
    day: string;
    events: EventTypeResponce[];
};

export default function ItemEvent({ day, events, mounthName }: ItemEventProps) {
    return (
        <View>
            <HStack m="3" p="3" bgColor="black" rounded="md">
                <Box w={100} pl="2">
                    <VStack justifyContent="center">
                        <Heading color="white">{day}</Heading>
                        <Text color="white">{mounthName}</Text>
                    </VStack>
                </Box>
                <Box>
                    <VStack space={3}>
                        {events.map((item) => (
                            <ItemNameEvent
                                key={item.id}
                                dotcolor={item.text_color}
                                description={item.description}
                                title={item.name}
                            />
                        ))}
                    </VStack>
                </Box>
            </HStack>
        </View>
    );
}
