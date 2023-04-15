import React from "react";
import { FlatList } from "react-native";
import { HStack, VStack, Text, Heading, View, Button } from "native-base";
import { keyExtractor } from "../utils/func";

type ID = string | number;
export type OnSendInvitationType = (
    guestID: ID,
    callback?: (status: boolean) => void
) => void;

type GuestType = {
    id: ID;
    first_name: string;
    second_name: string;
    is_couple: boolean;
    phone: string;
    email: string;
    place: string;
    is_send?: boolean;
    event: ID;
};

export type GuestListProps = {
    guests: GuestType[];
    ListHeaderComponent?: React.ReactNode;
    onSendInvation?: OnSendInvitationType;
    canSendInvation?: boolean;
};

type BtnInviteProps = {
    isSend?: boolean;
    guestID: ID;
    onSendInvitation?: OnSendInvitationType;
};

const BtnInvite: React.FC<BtnInviteProps> = ({
    guestID,
    onSendInvitation,
    isSend = false,
}) => {
    const [send, setSend] = React.useState<boolean>(isSend);
    const [loading, setLoading] = React.useState<boolean>(false);

    const handlerSendInvitation = React.useCallback(() => {
        setLoading(true);
        onSendInvitation?.(guestID, (status) => {
            if (status) {
                setSend(true);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    }, []);

    return (
        <View>
            <Button
                rounded="full"
                disabled={send}
                colorScheme={send ? "success" : "primary"}
                onPress={handlerSendInvitation}
                isLoading={loading}
            >
                {send ? "Invitation envoyee" : "Envoyer une invitation"}
            </Button>
        </View>
    );
};

/**
 *
 * @returns
 */
const GuestItem: React.FC<{
    item: GuestType;
    onSendInvation?: OnSendInvitationType;
    canSend?: boolean;
}> = ({ item, onSendInvation, canSend }) => {
    return (
        <VStack space="2" p="2" bgColor="gray.200" m="2" rounded="md">
            <VStack>
                <HStack>
                    <Text bold fontSize="lg">
                        <Text>{item.first_name}</Text>
                        {item.is_couple ? (
                            <Text> & {item.second_name}</Text>
                        ) : null}
                    </Text>
                </HStack>
                <VStack space="0">
                    <Text fontSize="2xs">Place</Text>
                    <Text fontSize="xs">{item.place}</Text>
                </VStack>
                <VStack>
                    <Text fontSize="2xs">Contactes</Text>
                    <Text fontSize="xs">
                        <Text>{item.email}</Text>
                        <Text> | </Text>
                        <Text>{item.phone}</Text>
                    </Text>
                </VStack>
            </VStack>
            {canSend ? (
                <BtnInvite
                    guestID={item.id}
                    isSend={item.is_send}
                    onSendInvitation={onSendInvation}
                />
            ) : null}
        </VStack>
    );
};

/**
 *
 * @param Props
 * @returns
 */
const GuestList: React.FC<GuestListProps> = ({
    guests,
    ListHeaderComponent,
    onSendInvation,
    canSendInvation,
}) => {
    return (
        <FlatList
            data={guests}
            keyExtractor={keyExtractor}
            ListHeaderComponent={
                <VStack space="4" p="2">
                    {ListHeaderComponent}
                    <HStack justifyContent="space-between" alignItems="center">
                        <Heading fontSize="lg" color="gray.500">
                            List des Invites
                        </Heading>
                    </HStack>
                </VStack>
            }
            renderItem={({ item }) => (
                <GuestItem
                    onSendInvation={onSendInvation}
                    item={item}
                    canSend={canSendInvation}
                />
            )}
        />
    );
};

export default GuestList;
