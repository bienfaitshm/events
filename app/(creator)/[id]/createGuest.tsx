import React from "react";
import { Stack, useRouter } from "expo-router";
import { useParamsID } from "./creatorUtils";
import CreatorGuest, { DataInputType } from "../../../components/CreatorGuest";
import { usePostGuest } from "../../../hooks/apis";
import { useToastAction } from "../../../hooks/useToastAction";

const usePostAction = (event: string | number) => {
    const router = useRouter();
    const mutation = usePostGuest();
    const toast = useToastAction();
    return (value: DataInputType, callback: (state: boolean) => void) => {
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
            {
                onError(error) {
                    callback?.(false);
                    toast.toastError(JSON.stringify(error, null, 4));
                },
                onSuccess() {
                    callback?.(false);
                    toast.toastSuccess();
                    router.back();
                },
            }
        );
    };
};

export default function CreateGuestPage() {
    const event = useParamsID();
    const handlerSubmit = usePostAction(event);
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
            <CreatorGuest onSubmit={handlerSubmit} />
        </>
    );
}
