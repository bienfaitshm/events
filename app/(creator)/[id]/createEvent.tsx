import React from "react";
import { Text } from "native-base";
import { Stack } from "expo-router";
import CreatorEvent from "../../components/CreatorEvent";
import { useParamsID } from "./creatorUtils";

export default function CreateEventProps() {
    const event = useParamsID();
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Ajout Event",
                    headerTintColor: "white",
                    statusBarColor: "black",
                    statusBarStyle: "light",
                    headerStyle: {
                        backgroundColor: "black",
                    },
                }}
            />
            <CreatorEvent
                onSubmit={(values) =>
                    console.log(JSON.stringify(values, null, 4))
                }
            />
        </>
    );
}
