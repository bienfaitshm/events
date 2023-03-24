import React from "react";
import { View, Text } from "native-base";
import { useLocalSearchParams } from "expo-router";
import CreatorEvent from "../../components/CreatorEvent";

export default function CreateEventProps() {
    const params = useLocalSearchParams();
    return (
        <View>
            <Text>Create , {JSON.stringify(params, null, 4)}</Text>
            <CreatorEvent />
        </View>
    );
}
