import React from "react";
import { useRouter, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar, Button, Icon, Image, View } from "native-base";
import HomeListEvent from "../../components/HomeListEvent";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";
import { useFetchTitleEvent, useFetchUser } from "../../hooks/apis";
import CodeBarScanner from "../../components/CodeBarScanner";

const HomeListEventWithData = () => {
    const router = useRouter();
    const { data } = useFetchTitleEvent();
    return (
        <>
            <HomeListEvent
                data={data?.results}
                onSelectItem={(date) => router.push(`(main)/${date}/days`)}
            />
            <View position="absolute" bottom={3} right={3} zIndex={30}>
                <Button
                    onPress={() => router.push("(main)/category")}
                    rounded="full"
                    leftIcon={<Icon as={Ionicons} name="add" size="sm" />}
                >
                    Event
                </Button>
            </View>
        </>
    );
};

const HomeControlerOrganisator: React.FC = () => {
    const { data } = useFetchUser();
    if (data?.status === "OW") {
        return <HomeListEventWithData />;
    }

    if (data?.status === "AC") {
        return <CodeBarScanner onBarCodeScanned={console.log} />;
    }
    return null;
};

export default function HomeScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft(props) {
                        return (
                            <Avatar
                                size="sm"
                                bg="cyan.500"
                                source={{
                                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                                }}
                            >
                                TE
                            </Avatar>
                        );
                    },
                    headerTitle(props) {
                        return (
                            <View
                                ml="24"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Image
                                    ml="4"
                                    height="6"
                                    width="5"
                                    alt="event"
                                    _alt={{
                                        fontWeight: "bold",
                                        fontSize: "xl",
                                        textTransform: "capitalize",
                                    }}
                                    source={require("../assets/logo_black.png")}
                                />
                            </View>
                        );
                    },
                }}
            />
            <SuspenseQueryFetch>
                <HomeControlerOrganisator />
            </SuspenseQueryFetch>
        </>
    );
}
