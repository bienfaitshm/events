import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Box, FlatList, Heading, VStack, Text } from "native-base";
import { keyExtractor } from "../utils/func";

type Category = {
    id: string | number;
    textColor: string;
    bgColor: string;
    name: string;
};

type CetegoryChooserProps = {
    onPress?: (id: string | number) => void;
    data?: Category[];
};

type CategoryItemProps = {
    onPress?: () => void;
    textColor?: string;
    bgColor?: string;
    name: string;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
    bgColor,
    onPress,
    textColor,
    name,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.categoryRoot,
                {
                    backgroundColor: bgColor,
                },
            ]}
        >
            <Box h="32" p="6">
                <Heading
                    color={textColor}
                    fontSize="md"
                    position="absolute"
                    bottom="2"
                    left={10}
                >
                    {name}
                </Heading>
            </Box>
        </TouchableOpacity>
    );
};

export default function CetegoryChooser({
    data = [],
    onPress,
}: CetegoryChooserProps) {
    return (
        <Box>
            <Box mx="2" my="5">
                <VStack>
                    <Heading>Creer une invitation</Heading>
                    <Text>Choisir la categorie de votre invitation</Text>
                </VStack>
            </Box>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={keyExtractor}
                renderItem={({ item }) => (
                    <CategoryItem
                        name={item.name}
                        bgColor={item.bgColor}
                        textColor={item.textColor}
                        onPress={() => onPress?.(item.id)}
                    />
                )}
            />
        </Box>
    );
}

const styles = StyleSheet.create({
    categoryRoot: {
        margin: 7,
        backgroundColor: "red",
        flex: 1,
        borderRadius: 5,
    },
});
