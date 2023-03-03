import { View, Text } from "native-base";
import CalendarList from "../components/CalendarList";

export default function HomeScreen() {
    return (
        <View flex={1}>
            <CalendarList />
        </View>
    );
}
