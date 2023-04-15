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
                                <Avatar
                                    size="sm"
                                    bg="cyan.500"
                                    source={{
                                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                                    }}
                                >
                                    TE
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
