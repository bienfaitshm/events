import React from "react";
import { useLocalSearchParams } from "expo-router";
import DaysEventList from "../../components/DayEvents";
import { useFetchDateEvents } from "../../hooks/apis";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";

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
        <SuspenseQueryFetch>
            <DaysEventListWithData date={date} />
        </SuspenseQueryFetch>
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
