import { View } from "native-base";
import { useRouter } from "expo-router";
import { useFetchTitleEvent } from "../hooks/apis";
import HomeListEvent from "../components/HomeListEvent";
import SuspenseQueryFetch from "../containers/SuspenseQueryFetch";

const HomeListEventWithData = () => {
    const router = useRouter();
    const { data } = useFetchTitleEvent();
    return (
        <HomeListEvent
            data={data?.results}
            onSelectItem={(date) => router.push(`(main)/${date}/days`)}
        />
    );
};

export default function HomeScreen() {
    return (
        <View flex={1}>
            <SuspenseQueryFetch>
                <HomeListEventWithData />
            </SuspenseQueryFetch>
        </View>
    );
}
