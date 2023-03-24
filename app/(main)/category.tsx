import { Box } from "native-base";
import React from "react";
import CetegoryChooser from "../components/CategoryChooser";
import { useRouter, Stack } from "expo-router";
import { useLoadCategories } from "../hooks/apis";

export default function CreateEvent() {
    const navigation = useRouter();
    const { data } = useLoadCategories();
    return (
        <>
            <Stack
                screenOptions={{
                    title: "Category",
                }}
            />
            <Box>
                <CetegoryChooser
                    onPress={(id) =>
                        navigation.push(`(creator)/${id}/createEvent`)
                    }
                    data={data?.results.map((d) => ({
                        name: d.name,
                        bgColor: d.bg_color,
                        textColor: d.text_color,
                        id: d.id,
                    }))}
                />
            </Box>
        </>
    );
}
