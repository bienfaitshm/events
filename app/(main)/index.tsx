/** @format */

import React from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar, Button, Icon, Image, View } from "native-base";
import HomeListEvent from "../../components/HomeListEvent";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";
import CodeBarScanner from "../../components/CodeBarScanner";
import StackNavbarHome from "../../components/StackNavbarHome";
import ControlerGuestList from "../../components/ControlerGuestList";
import { useStoreAuth } from "../../hooks/auth/accounts";
import { useFetchTitleEvent } from "../../hooks/apis/fetch";
import { TTitleEventPaginate } from "../../services/apis/types";

/**
 *
 * @returns
 */

/**
 *
 * @returns
 */
const HomeListEventWithData = () => {
    const router = useRouter();
    const { data } = useFetchTitleEvent<TTitleEventPaginate>();
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
    // const { data } = useFetchEventGuests(0);
    return (
        <ControlerGuestList onScan={() => router.push("scanner")} guests={[]} />
    );
};

/**
 *
 * @returns
 */
const HomeControlerOrganisator: React.FC = () => {
    const user = useStoreAuth((state) => state.user);
    if (user?.status === "OW") {
        return <HomeListEventWithData />;
    }

    if (user?.status === "CO") {
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
