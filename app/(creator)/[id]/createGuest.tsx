import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { View } from "native-base";
import { useParamsID } from "./creatorUtils";
import CreatorGuest from "../../components/CreatorGuest";

export default function CreateGuestPage() {
    const event = useParamsID();
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Ajout invite",
                    headerTransparent: true,
                    headerTintColor: "white",
                    statusBarColor: "black",
                    statusBarStyle: "light",
                    headerStyle: {
                        backgroundColor: "black",
                    },
                }}
            />
            <View>
                <CreatorGuest
                    onSubmit={(values) =>
                        console.log(JSON.stringify(values, null, 4))
                    }
                />
            </View>
        </>
    );
}
