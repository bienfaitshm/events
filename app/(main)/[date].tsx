/** @format */

import React from "react";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "../../utils/localSearchParams";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";
import { useFetchEvents } from "../../hooks/apis/fetch";
import DaysEventList from "../../components/DayEvents";
import { TEvent, TPaginate } from "../../services/apis/types";

const DaysEventListWithData: React.FC<{ date: string }> = ({ date }) => {
    const { data } = useFetchEvents<TPaginate<TEvent>>({
        params: {
            date,
        },
    });

    return <DaysEventList date={date} data={data?.results} />;
};

export default function DayEvents() {
    const date = useLocalSearchParams<{ date: string | string[] }>({
        extractFn(e) {
            return e.date;
        },
    });

    return (
        <>
            <Stack.Screen
                options={{
                    title: `Evenement du ${date}`,
                    animation: "slide_from_right",
                }}
            />
            <SuspenseQueryFetch>
                <DaysEventListWithData date={date} />
            </SuspenseQueryFetch>
        </>
    );
}
