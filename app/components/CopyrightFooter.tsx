import { VStack, Text } from "native-base";

export const CopyrightFooter = () => {
    return (
        <VStack alignItems="center">
            <Text bold fontSize="sm" color="white">
                Copyright C
            </Text>
            <Text fontSize="2xs" bold color="white">
                Youpi Global
            </Text>
            <Text fontSize="2xs">v 0.0.1</Text>
        </VStack>
    );
};
