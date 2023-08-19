/** @format */

import React from "react";
import CategoryChooser from "../../components/CategoryChooser";
import { useRouter, Stack } from "expo-router";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";
import { useFetchCategories } from "../../hooks/apis/fetch";
import { TCategory, TPaginate } from "../../services/apis/types";

const FecthCategoryChooser = () => {
    const router = useRouter();
    const { data } = useFetchCategories<TPaginate<TCategory>>();
    return (
        <CategoryChooser
            onPress={(id) =>
                router.push({
                    pathname: "(creator)/[event]/createEvent",
                    params: { event: id },
                })
            }
            data={data?.results.map((d) => ({
                name: d.name,
                bgColor: d.bg_color,
                textColor: d.text_color,
                id: d.id,
            }))}
        />
    );
};

export default function CreateEvent() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Categories",
                    presentation: "modal",
                    animation: "slide_from_bottom",
                }}
            />
            <SuspenseQueryFetch>
                <FecthCategoryChooser />
            </SuspenseQueryFetch>
        </>
    );
}
