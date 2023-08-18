/** @format */

import React from "react";
import { Stack } from "expo-router";

import DaysEventList from "../../../components/DayEvents";
import SuspenseQueryFetch from "../../../containers/SuspenseQueryFetch";
import { useFetchDateEvents } from "../../../hooks/apisd";
import { useParamsEvent } from "./utilsEvent";

const DaysEventListWithData: React.FC<{ date: string }> = ({ date }) => {
    const { data } = useFetchDateEvents(date);

    return <DaysEventList date={date} data={data?.results} />;
};

export default function DayEvents() {
    const date = useParamsEvent();

    return (
        <>
            <Stack.Screen options={{ title: `Evenement du ${date}` }} />
            <SuspenseQueryFetch>
                <DaysEventListWithData date={date} />
            </SuspenseQueryFetch>
        </>
    );
}
