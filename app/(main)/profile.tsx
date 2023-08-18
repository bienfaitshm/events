/** @format */

import { View } from "native-base";
import { Stack } from "expo-router";
import Profile from "../../components/Profile";
import { useStoreAuth } from "../../hooks/auth/accounts";

export default function ProfilePage() {
    const auth = useStoreAuth();
    return (
        <View>
            <Stack.Screen
                options={{
                    title: "Profile",
                    statusBarStyle: "dark",
                }}
            />
            <Profile
                status={
                    auth.user?.status === "CO" ? "CONTROLEUR" : "ORGANISATEUR"
                }
                onDisconnect={auth.disconnect}
                username={auth.user?.username || undefined}
                name={`${auth.user?.firstname} ${auth.user?.lastname}`}
            />
        </View>
    );
}
