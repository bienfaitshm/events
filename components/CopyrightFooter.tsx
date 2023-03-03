import { VStack, Text } from "native-base";

export const CopyrightFooter = () => {
    return (
        <VStack alignItems="center">
            <Text bold fontSize="sm">
                Copyright C
            </Text>
            <Text fontSize="2xs" bold>
                Youpi Global
            </Text>
            <Text fontSize="2xs">v 0.0.1</Text>
        </VStack>
    );
};
