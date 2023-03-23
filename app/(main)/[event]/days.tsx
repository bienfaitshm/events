import React from "react";
import { View, Heading, VStack, Text } from "native-base";
import { useLocalSearchParams } from "expo-router";
import DaysEventList from "../../components/DayEvents";
import { Stack } from "expo-router";
import { useFetchDateEvents } from "../../hooks/apis";

type DayEventsParams = {
    event: string | string[];
};

type DayEventsProps = {};

const DaysEventListWithData: React.FC<{ date: string }> = ({ date }) => {
    const data = useFetchDateEvents(date);

    return <DaysEventList date={date} data={data.data?.results} />;
};

export default function DayEvents(props: DayEventsProps) {
    const { event } = useLocalSearchParams<DayEventsParams>();
    const date = getDateEvent(event);
    return (
        <View flex={1} m="1">
            <DaysEventListWithData date={date} />
        </View>
    );
}

function getDateEvent(date?: string | string[]) {
    if (typeof date == "string") {
        return date;
    }
    if (date && date.length > 0) {
        return date[0];
    }
    return "";
}
