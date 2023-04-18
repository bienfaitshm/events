import {
    View,
    Text,
    Avatar,
    Button,
    CloseIcon,
    Heading,
    VStack,
} from "native-base";
import React from "react";
import { getInitialName } from "../utils/string";

export type ProfileProps = {
    name: string;
    username?: string;
    status: string;
    onDisconnect?(): void;
};
const Profile: React.FC<ProfileProps> = ({
    name,
    username,
    status,
    onDisconnect,
}) => {
    const getAvatarName = () => {
        const value = name.trim().length > 0 ? name : username;
        return `${value}`;
    };
    return (
        <View p="4">
            <VStack justifyContent="center" alignItems="center" p="5" space="3">
                <Avatar size="2xl" bg="black">
                    {getInitialName(getAvatarName())}
                </Avatar>
                <Text bg="coolGray.200" p="2" rounded="md" color="text.600">
                    {status}
                </Text>
                <Heading my="4">{username}</Heading>
                <Text bold fontSize="lg">
                    {name}
                </Text>
            </VStack>
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
