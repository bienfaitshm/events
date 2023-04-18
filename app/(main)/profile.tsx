import { View } from "native-base";
import { Stack } from "expo-router";
import { useAuthentication } from "../../hooks/useAuthPersisteInfos";
import Profile from "../../components/Profile";

export default function ProfilePage() {
    const auth = useAuthentication();
    return (
        <View>
            <Stack.Screen
                options={{
                    title: "Profile",
                    statusBarStyle: "dark",
                }}
            />
            <Profile
                status={auth.status === "CO" ? "CONTROLEUR" : "ORGANISATEUR"}
                onDisconnect={auth.disconnect}
                username={auth.username || undefined}
                name={`${auth.firstname} ${auth.lastname}`}
            />
        </View>
    );
}
