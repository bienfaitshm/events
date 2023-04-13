import React from "react";
import { Stack, useRouter } from "expo-router";
import CreatorEvent, { DataInputType } from "../../../components/CreatorEvent";
import { useParamsID } from "./creatorUtils";
import { usePostEvent } from "../../../hooks/apis";
import { useSubmiter } from "../../../hooks/useSubmiter";

export default function CreateEventProps() {
    const category = useParamsID();
    const router = useRouter();
    const mutation = usePostEvent();
    const submiter = useSubmiter<DataInputType, any>({
        mutate: (values) => mutation.mutate({ category, ...values }),
        options: {
            onSuccess: router.back,
        },
    });
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
            <CreatorEvent isLoading={mutation.isLoading} onSubmit={submiter} />
        </>
    );
}
