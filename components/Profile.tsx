import { View, Text, Avatar, Button, CloseIcon, Heading } from "native-base";
import React from "react";
import { getInitialName } from "../utils/string";

export type ProfileProps = {
    name: string;
    username?: string;
    onDisconnect?(): void;
};
const Profile: React.FC<ProfileProps> = ({ name, username, onDisconnect }) => {
    return (
        <View p="4">
            <View justifyContent="center" alignItems="center" p="5">
                <Avatar size="2xl" bg="black">
                    {getInitialName(name || `${username}`)}
                </Avatar>
                <Heading my="4">{username}</Heading>
                <Text bold fontSize="lg">
                    {name}
                </Text>
            </View>
            <View>
                <Button
                    onPress={onDisconnect}
                    rounded="full"
                    bg="black"
                    leftIcon={<CloseIcon />}
                >
                    Connexion
                </Button>
            </View>
        </View>
    );
};

export default Profile;
