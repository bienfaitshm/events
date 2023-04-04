import { useLocalSearchParams } from "expo-router";

export type _ID = string | number;
export type EventsKeyParams = {
    event: string | string[];
};

export function getOneKeyFromKeyList(date?: string | string[]) {
    if (typeof date == "string") {
        return date;
    }
    if (date && date.length > 0) {
        return date[0];
    }
    return "";
}

export function useParamsEvent() {
    const { event } = useLocalSearchParams<EventsKeyParams>();
    return getOneKeyFromKeyList(event);
}
