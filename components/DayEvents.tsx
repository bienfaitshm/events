import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { View, Heading, VStack, Text, HStack } from "native-base";
import { keyExtractor } from "../utils/func";
import dayjs from "dayjs";

var calendar = require("dayjs/plugin/calendar");
dayjs.extend(calendar);

interface EventItemData {
    id: number | string;
    bg_color: string;
    description: string;
    name: string;
    start: string;
}

type DayEventsProps = {
    data?: EventItemData[];
    date?: string;
};

const HeadDayEvent: React.FC<{ date?: string }> = ({ date }) => {
    const dateinfos = getDateinfos(date);
    return (
        <View mx="5" mt="3" mb="10">
            <VStack>
                <Text>
                    {dateinfos.mounth} {", "} {dateinfos.year}
                </Text>
                <Heading>{dateinfos.title}</Heading>
            </VStack>
        </View>
    );
};

const DayEventItem: React.FC<{
    item: EventItemData;
}> = ({ item }) => {
    const route = useRouter();
    return (
        <TouchableOpacity
            onPress={() => route.push(`(main)/${item.id}/detail`)}
            style={{ flex: 1 }}
        >
            <View flex={1} p="3" rounded="xl" bgColor="gray.200">
                <VStack space="2" flex={1}>
                    <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        flex={1}
                    >
                        <Heading fontSize="lg" isTruncated>
                            {item.name}
                        </Heading>
                        <Text>{item.start}</Text>
                    </HStack>
                    <Text isTruncated maxW={600}>
                        {item.description}
                    </Text>
                </VStack>
            </View>
        </TouchableOpacity>
    );
};

const Dot: React.FC<{
    color?: string;
    active?: boolean;
}> = ({ color = "green.500", active }) => {
    return (
        <View
            h="4"
            w="4"
            bgColor={active ? color : undefined}
            alignItems="center"
            justifyContent="center"
            rounded="full"
        >
            <View
                h="3"
                w="3"
                bgColor={active ? color : "white"}
                rounded="full"
                borderColor={active ? "white" : color}
                borderWidth="2"
            />
        </View>
    );
};

const DayItemContainer: React.FC<{
    children: React.ReactNode;
    showLine?: boolean;
    active?: boolean;
    color?: string;
}> = ({ children, color, active, showLine = true }) => {
    return (
        <HStack maxH="32" h="24" flex={1}>
            <View w="10" alignItems="center">
                {showLine ? <View h="full" w="0.5" bg="gray.400" /> : null}
                <View
                    position="absolute"
                    top={0}
                    right={0}
                    left={0}
                    alignItems="center"
                    bgColor="white"
                    py="2"
                >
                    <Dot active={active} color={color} />
                </View>
            </View>
            <View pb="3" pr="2" flex={1}>
                {children}
            </View>
        </HStack>
    );
};

export default function DayEvents({ data = [], date }: DayEventsProps) {
    const dataLenght = data.length;
    return (
        <FlatList
            data={data}
            ListHeaderComponent={<HeadDayEvent date={date} />}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => (
                <DayItemContainer
                    color={item.bg_color}
                    showLine={!isALast(index, dataLenght)}
                >
                    <DayEventItem item={item} />
                </DayItemContainer>
            )}
        />
    );
}

const isALast = (index: number, lenght: number) => lenght == index + 1;

const getDateinfos = (date?: string) => {
    const dayjsdate = dayjs(date);
    const cal = dayjs().calendar(dayjsdate, {
        sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
        nextDay: "[Tomorrow]", // The next day ( Tomorrow at 2:30 AM )
        nextWeek: "dddd", // The next week ( Sunday at 2:30 AM )
        lastDay: "[Yesterday]", // The day before ( Yesterday at 2:30 AM )
        lastWeek: "[Last] dddd", // Last week ( Last Monday at 2:30 AM )
        sameElse: "DD/MM/YYYY", // Everything else ( 7/10/2011 )
    });
    return {
        mounth: dayjsdate.format("MMMM"),
        year: dayjsdate.format("YYYY"),
        title: cal,
    };
};
