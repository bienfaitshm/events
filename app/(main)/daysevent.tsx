import React from "react";
import { View } from "native-base";
import DayEvents from "../components/DayEvents";

type DayEventPageProps = {};

export default function DayEventPage(props: DayEventPageProps) {
    return (
        <View>
            <DayEvents />
        </View>
    );
}
