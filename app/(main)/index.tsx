import { View, Text } from "native-base";
import CalendarList from "../components/CalendarList";
import CreatorEvents from "../components/CreatorEvent";
import { useLoadTitleEvent } from "../hooks/apis";

export default function HomeScreen() {
    const { data, isLoading, error } = useLoadTitleEvent();
    // if (data) {
    //     console.log("data....", parseEvent(data));
    // }
    return (
        <View flex={1}>
            <CalendarList data={data} isLoading={isLoading} error={error} />
        </View>
    );
}
