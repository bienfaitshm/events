import { Stack, useRouter } from "expo-router";
import { Avatar, View, Heading, Pressable } from "native-base";
import React from "react";

type StackNavbarHomeProps = {};

const StackNavbarHome: React.FC<StackNavbarHomeProps> = (props) => {
    const navigation = useRouter();
    return (
        <View>
            <Stack.Screen
                options={{
                    statusBarStyle: "dark",
                    headerTitle() {
                        return <Heading>Event</Heading>;
                    },
                    headerRight(props) {
                        return (
                            <Pressable
                                onPress={() =>
                                    navigation.push("(main)/profile")
                                }
                            >
                                <Avatar size="sm" bg="black">
                                    Profile
                                </Avatar>
                            </Pressable>
                        );
                    },
                }}
            />
        </View>
    );
};

export default StackNavbarHome;
