import { Box } from "native-base";
import React from "react";
import CategoryChooser from "../../components/CategoryChooser";
import { useRouter, Stack } from "expo-router";
import { useFetchCategories } from "../../hooks/apis";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";

const DCategoryChooser = () => {
    const navigation = useRouter();
    const { data } = useFetchCategories();
    return (
        <CategoryChooser
            onPress={(id) => navigation.push(`(creator)/${id}/createEvent`)}
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
                    title: "Category",
                }}
            />
            <SuspenseQueryFetch>
                <DCategoryChooser />
            </SuspenseQueryFetch>
        </>
    );
}
