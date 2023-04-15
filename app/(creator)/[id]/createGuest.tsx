import React from "react";
import { Stack, useRouter } from "expo-router";
import { useParamsID } from "./creatorUtils";
import CreatorGuest, { DataInputType } from "../../../components/CreatorGuest";
import { usePostGuest } from "../../../hooks/apis";
import { useSubmiter } from "../../../hooks/useSubmiter";

export default function CreateGuestPage() {
    const event = useParamsID();
    const router = useRouter();
    const mutation = usePostGuest();
    const onSubmit = useSubmiter<DataInputType, any>({
        mutate: (value, options) =>
            mutation.mutate(
                {
                    first_name: value.firstName,
                    second_name: value.firstName,
                    is_couple: value.isCouple || false,
                    email: value.email,
                    phone: value.place,
                    place: value.place,
                    event,
                },
                options as any
            ),
        options: {
            onSuccess: router.back,
        },
    });
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
            <CreatorGuest isLoading={mutation.isLoading} onSubmit={onSubmit} />
        </>
    );
}
