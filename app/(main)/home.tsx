import { View, Text } from "native-base";
import CalendarList from "../../components/CalendarList";
import CreatorEvents from "../../components/CreatorEvent";

export default function HomeScreen() {
    return (
        <View flex={1}>
            {/* <CalendarList /> */}
            <CreatorEvents />
        </View>
    );
}
