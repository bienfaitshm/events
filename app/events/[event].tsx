/** @format */

import React from "react";
import { ToastAndroid } from "react-native";
import { Stack, useRouter } from "expo-router";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";

import DetailEvent from "../../components/DetailEvent";
import GuestList, { OnSendInvitationType } from "../../components/GuestList";

import { Button } from "native-base";
import { useFetchEvents, useFetchGuests } from "../../hooks/apis/fetch";
import { TEvent, TGuest, TPaginate } from "../../services/apis/types";
import { useLocalSearchParams } from "../../utils/localSearchParams";
import { useSendInvation } from "../../hooks/apis/mutation";

const DDetailEvent: React.FC<{ event: number | string; nGuests: number }> = ({
    event,
    nGuests,
}) => {
    const { data: eventData } = useFetchEvents<TEvent>({
        detail: true,
        id: event,
    });

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

const DGuestList: React.FC<{ event: number | string }> = ({ event }) => {
    const mutation = useSendInvation();
    const { data: guests } = useFetchGuests<TPaginate<TGuest>>({
        params: {
            event,
        },
    });

    const handlerSendInvation: OnSendInvitationType = React.useCallback(
        (guest, callback) => {
            mutation.mutate(
                { guest: guest },
                {
                    onSuccess: () => callback?.(true),
                    onError: (err) => {
                        ToastAndroid.show(
                            "Impossible d'envoyer une invitation",
                            ToastAndroid.LONG
                        );
                        callback?.(false);
                        // console.log(JSON.stringify(err?.response, null, 4));
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
            guests={guests?.results || []}
            ListHeaderComponent={
                <DDetailEvent nGuests={guests?.count || 0} event={event} />
            }
        />
    );
};

export default function DetailEventPage() {
    const event = useLocalSearchParams<{ event: string | string[] }>({
        extractFn(e) {
            return e.event;
        },
    });
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
                                        `(creator)/${event}/createGuest`
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
                <DGuestList event={event} />
            </SuspenseQueryFetch>
        </>
    );
}
