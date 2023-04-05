import React from "react";
import { ToastAndroid } from "react-native";
import { Stack, useRouter } from "expo-router";
import SuspenseQueryFetch from "../../../containers/SuspenseQueryFetch";

import DetailEvent from "../../../components/DetailEvent";
import GuestList, { OnSendInvitationType } from "../../../components/GuestList";

import {
    useFetchEvent,
    useFetchEventGuests,
    useSendInvationGuest,
} from "../../../hooks/apis";
import { _ID, useParamsEvent } from "./utilsEvent";
import { Button } from "native-base";

const DDetailEvent: React.FC<{ event: _ID; nGuests: number }> = ({
    event,
    nGuests,
}) => {
    const { data: eventData } = useFetchEvent(event);

    return eventData ? (
        <DetailEvent
            name={eventData.name}
            bgColor={eventData.bg_color}
            category={eventData.category_name}
            description={eventData.description}
            textColor={eventData.text_color}
            guestNumber={nGuests}
            codeEvent={eventData.code}
        />
    ) : (
        <React.Fragment></React.Fragment>
    );
};

const DGuestList: React.FC<{ event: _ID }> = ({ event }) => {
    const mutation = useSendInvationGuest();
    const { data } = useFetchEventGuests(event);
    const guests = data?.results || [];

    const handlerSendInvation: OnSendInvitationType = React.useCallback(
        (guest, callback) => {
            mutation.mutate(
                { event, guest },
                {
                    onSuccess: () => callback?.(true),
                    onError: () => {
                        ToastAndroid.show(
                            "Impossible d'envoyer une invitation",
                            ToastAndroid.LONG
                        );
                        callback?.(false);
                    },
                }
            );
        },
        []
    );

    return (
        <GuestList
            canSendInvation
            onSendInvation={handlerSendInvation}
            guests={guests}
            ListHeaderComponent={
                <DDetailEvent nGuests={guests.length} event={event} />
            }
        />
    );
};

export default function DetailEventPage() {
    const eventkey = useParamsEvent();
    const router = useRouter();

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Evenement",
                    headerRight() {
                        return (
                            <Button
                                onPress={() =>
                                    router.push(
                                        `(creator)/${eventkey}/createGuest`
                                    )
                                }
                                size="sm"
                                rounded="full"
                            >
                                Ajouter un Invite
                            </Button>
                        );
                    },
                }}
            />
            <SuspenseQueryFetch>
                <DGuestList event={eventkey} />
            </SuspenseQueryFetch>
        </>
    );
}
