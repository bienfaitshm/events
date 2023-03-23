import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, VStack, Heading, HStack } from "native-base";
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
        <Box flex={1}>
            <HStack alignItems="center" space="3">
                <Box
                    w="2"
                    h="2"
                    mt="2"
                    bg={dotcolor}
                    // alignSelf="start"
                    rounded="full"
                />
                <VStack flex={1}>
                    <Text color="white" bold fontSize="sm">
                        {title}
                    </Text>
                    <Text color="coolGray.200" fontSize="2xs" isTruncated>
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
    onPress?: () => void;
};

export default function ItemEvent({
    day,
    events,
    mounthName,
    onPress,
}: ItemEventProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <HStack m="3" p="3" bgColor="black" rounded="md" space="3">
                <Box w="32" pl="2">
                    <VStack alignItems="center">
                        <Heading color="white">{day}</Heading>
                        <Text color="white">{mounthName}</Text>
                    </VStack>
                </Box>
                <Box flex={1}>
                    <VStack space={3}>
                        {events.map((item) => (
                            <ItemNameEvent
                                key={item.id}
                                dotcolor={item.bg_color}
                                description={item.description}
                                title={item.name}
                            />
                        ))}
                    </VStack>
                </Box>
            </HStack>
        </TouchableOpacity>
    );
}
