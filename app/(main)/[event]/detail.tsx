import React from "react";
import { Box, Heading, Text } from "native-base";
import { useLocalSearchParams } from "expo-router";

export default function DetailEventPage() {
    const params = useLocalSearchParams();
    return (
        <Box>
            <Heading>Detail</Heading>
            <Text>{JSON.stringify(params, null, 4)}</Text>
        </Box>
    );
}
