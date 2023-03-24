import React from "react";
import { TouchableOpacity, SectionList } from "react-native";
import {
    Box,
    Text,
    VStack,
    Heading,
    HStack,
    IconButton,
    Icon,
} from "native-base";
import Entypo from "@expo/vector-icons/Entypo";

/** Event Type */
type EventType = {
    id: string | number;
    bg_color: string;
    description: string;
    name: string;
};

type ItemEventType<E> = {
    day: string;
    mounth: string;
    date: string;
    events: E[];
};

type SectionListDatatype<D> = {
    title: string;
    data: D[];
};

/** Item event */
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
    events: EventType[];
    onPress?: () => void;
};

const ItemEvent = React.forwardRef<any, ItemEventProps>(
    ({ day, events, mounthName, onPress }, ref) => {
        return (
            <TouchableOpacity onPress={onPress} ref={ref}>
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
);

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

/**
 *
 */
type HomeListEventProps = {
    data?: SectionListDatatype<ItemEventType<EventType>>[];
    onSelectItem: (id: string | number) => void;
    ListHeaderComponent?:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ComponentType<any>;
};

export default function HomeListEvent({
    data = [],
    ListHeaderComponent,
    onSelectItem,
}: HomeListEventProps) {
    return (
        <SectionList
            ListHeaderComponent={ListHeaderComponent}
            sections={data}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
                <ItemEvent
                    onPress={() => onSelectItem(item.date)}
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
    );
}
