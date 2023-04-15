import React from "react";
import { View, Text, HStack, IconButton, Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuestList, { GuestListProps } from "./GuestList";

type ContolerGuestListProps = {
    onScan?(): void;
} & GuestListProps;

const ControlerGuestList: React.FC<ContolerGuestListProps> = ({
    onScan,
    ...props
}) => {
    return (
        <View>
            <GuestList
                ListHeaderComponent={
                    <HStack>
                        <IconButton
                            onPress={onScan}
                            rounded="full"
                            icon={<Icon as={Ionicons} name="qr-code" />}
                        />
                    </HStack>
                }
                canSendInvation={false}
                {...props}
            />
        </View>
    );
};

export default ControlerGuestList;
