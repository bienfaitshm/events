import { View, Text } from "native-base";
import { useAuthentication } from "../../hooks/useAuthPersisteInfos";

export default function ProfilePage() {
    const auth = useAuthentication();
    return (
        <View>
            <Text>Profile</Text>
            <Text>{JSON.stringify(auth, null, 4)}</Text>
        </View>
    );
}
