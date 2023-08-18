/** @format */

import { Stack, useRouter } from "expo-router";
import { Avatar, View, Heading, Pressable } from "native-base";
import React from "react";
import { getInitialName } from "../utils/string";

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
                                    A
                                    {/* {getInitialName(
                                        `${auth.firstname} ${auth.lastname} ${auth.username}`
                                    )} */}
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
