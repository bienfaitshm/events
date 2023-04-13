import React from "react";
import { Stack, useRouter } from "expo-router";
import CreatorEvent, { DataInputType } from "../../../components/CreatorEvent";
import { useParamsID } from "./creatorUtils";
import { usePostEvent } from "../../../hooks/apis";
import { useToastAction } from "../../../hooks/useToastAction";
import { useSubmiter } from "../../../hooks/useSubmiter";

const usePostAction = (category: string | number) => {
    const router = useRouter();
    const toast = useToastAction();
    const mutation = usePostEvent();
    const submiter = useSubmiter<DataInputType, any>({
        mutate: (values) => mutation.mutate({ category, ...values }),
    });
    return (value: DataInputType, callback?: (state: boolean) => void) => {
        mutation.mutate(
            {
                category,
                ...value,
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

export default function CreateEventProps() {
    const category = useParamsID();
    const handlerSubmit = usePostAction(category);
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
            <CreatorEvent onSubmit={handlerSubmit} />
        </>
    );
}
