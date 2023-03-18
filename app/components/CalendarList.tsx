import React from "react";
import {
    Box,
    SectionList,
    HStack,
    IconButton,
    Icon,
    Text,
    Avatar,
    VStack,
    Heading,
    Button,
} from "native-base";
import Entypo from "@expo/vector-icons/Entypo";
import ItemEvent from "./ItemEvent";
import { titledEvents } from "../utils/parserEvent";
import { TitleEventsTypeResponce } from "../services/apis";

const DateNamePicker: React.FC = () => {
    return (
        <HStack
            h="30"
            w="full"
            alignItems="center"
            justifyContent="space-between"
        >
            <Text bold fontSize="lg">
                Evenement
            </Text>
            <IconButton
                rounded="full"
                size="md"
                icon={<Icon color="black" as={Entypo} name="calendar" />}
            />
        </HStack>
    );
};

const Loading: React.FC<{ text?: string }> = ({ text = "Loaging...." }) => {
    return (
        <Box flex={1} justifyContent="center" alignItems="center">
            <Text>{text}</Text>
        </Box>
    );
};

type CalendarListProps = {
    data: TitleEventsTypeResponce;
    isLoading: boolean;
    error: any;
};
export default function CalendarList({
    data,
    error,
    isLoading,
}: CalendarListProps) {
    if (isLoading) {
        return <Loading />;
    }

    const _data = titledEvents(data);
    console.log("Data..........", _data);
    return (
        <Box>
            <Box zIndex={4} position="absolute" right="1" bottom="7">
                <Button
                    leftIcon={
                        <Icon color="black" as={Entypo} name="calendar" />
                    }
                >
                    Event
                </Button>
            </Box>
            <SectionList
                sections={_data}
                ListHeaderComponent={
                    <VStack mx="4" my="3" space={5}>
                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Avatar
                                bg="green.500"
                                size="lg"
                                source={{
                                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                }}
                            >
                                AJ
                            </Avatar>
                            <HStack space={3}>
                                <Text fontSize="lg">TimeLine</Text>
                                <Text bold fontSize="lg">
                                    Event
                                </Text>
                                <Text fontSize="lg">List Invite</Text>
                            </HStack>
                        </HStack>
                        <DateNamePicker />
                    </VStack>
                }
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                    <ItemEvent
                        day={item.day}
                        mounthName={item.mounth}
                        events={item.events}
                    />
                )}
                renderSectionHeader={({ section }) => (
                    <Heading pl="4" mt="2" color="coolGray.400">
                        {section.title}
                    </Heading>
                )}
            />
        </Box>
    );
}

const data = [
    {
        title: "Janvier",
        data: ["cyan.100"],
    },
    {
        title: "Mars",
        data: ["yellow.100", "yellow.200"],
    },
    {
        title: "Decembre",
        data: [
            "violet.100",
            "violet.200",
            "violet.300",
            "violet.400",
            "violet.500",
        ],
    },
];
