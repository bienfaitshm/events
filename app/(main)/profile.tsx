import { View, Text } from "native-base";
import { useAuthentication } from "../../hooks/useAuthPersisteInfos";
import Profile from "../../components/Profile";

export default function ProfilePage() {
    const auth = useAuthentication();
    return (
        <View>
            <Profile
                username={auth.username || undefined}
                name={`${auth.firstname} ${auth.lastname}`}
            />
        </View>
    );
}
