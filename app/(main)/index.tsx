import React from "react";
import { useRouter, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar, Button, Icon, Image, View } from "native-base";
import HomeListEvent from "../../components/HomeListEvent";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";
import {
    useFetchEventGuests,
    useFetchTitleEvent,
    useFetchUser,
} from "../../hooks/apis";
import CodeBarScanner from "../../components/CodeBarScanner";
import { useAuthentication } from "../../hooks/useAuthPersisteInfos";
import StackNavbarHome from "../../components/StackNavbarHome";
import ControlerGuestList from "../../components/ControlerGuestList";

/**
 *
 * @returns
 */
const useFetshInfosUser = () => {
    const auth = useAuthentication();
    const { data } = useFetchUser();
    React.useEffect(() => {
        if (data) {
            auth.setUser(data);
        }
    }, [data]);
    return auth;
};

/**
 *
 * @returns
 */
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

/**
 *
 * @returns
 */
const WDHomeControlerListGuest = () => {
    const router = useRouter();
    const { data } = useFetchEventGuests(0);
    return (
        <ControlerGuestList
            onScan={() => router.push("scanner")}
            guests={data?.results || []}
        />
    );
};

/**
 *
 * @returns
 */
const HomeControlerOrganisator: React.FC = () => {
    const auth = useFetshInfosUser();
    if (auth?.status === "OW") {
        return <HomeListEventWithData />;
    }

    if (auth?.status === "CO") {
        return <WDHomeControlerListGuest />;
    }
    return <></>;
};

/**
 *
 * @returns
 */
export default function HomeScreen() {
    return (
        <>
            <StackNavbarHome />
            <SuspenseQueryFetch>
                <HomeControlerOrganisator />
            </SuspenseQueryFetch>
        </>
    );
}
