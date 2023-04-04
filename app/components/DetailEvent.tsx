import React from "react";
import { View, Heading, Text, HStack, VStack } from "native-base";

type DetalEventProps = {
    name: string;
    bgColor: string;
    textColor: string;
    description: string;
    category: string;
    guestNumber: number;
};

const InfoItem: React.FC<{
    title: string;
    value: string;
    color: string;
}> = ({ color, title, value }) => {
    return (
        <VStack>
            <Text fontSize="2xs" color={color}>
                {title}
            </Text>
            <Text rounded="lg" color={color} textAlign="center">
                {value}
            </Text>
        </VStack>
    );
};

/**
 *
 * @param Props object contain
 * @string name,
 *  category, description, bgColor, textColor
 * @returns ReactNode -- component
 */
const DetailEvent: React.FC<DetalEventProps> = ({
    name,
    category,
    description,
    bgColor,
    textColor,
    guestNumber,
}) => {
    return (
        <View>
            <VStack space="3" mt="3">
                <VStack space="2">
                    <Heading fontSize="xl" color="gray.800">
                        {name}
                    </Heading>
                    <HStack
                        bgColor={bgColor}
                        justifyContent="space-between"
                        p="2"
                        rounded="lg"
                    >
                        <InfoItem
                            color={textColor}
                            title="Categorie"
                            value={category}
                        />
                        <InfoItem
                            color={textColor}
                            title="Invites"
                            value={String(guestNumber)}
                        />
                        <InfoItem
                            color={textColor}
                            title="Code Invitation"
                            value={"123hu0"}
                        />
                    </HStack>
                </VStack>
                <VStack space="2">
                    <Text bold fontSize="lg" color="gray.600">
                        Description
                    </Text>
                    <Text color="gray.600" textAlign="justify">
                        {description}
                    </Text>
                </VStack>
            </VStack>
        </View>
    );
};

export default DetailEvent;
