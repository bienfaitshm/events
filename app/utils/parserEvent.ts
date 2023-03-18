import {
    PaginateReponce,
    EventTypeResponce,
    TitleEventsTypeResponce,
} from "../services/apis";
import { getMounthName } from "./date";
import dayjs from "dayjs";

type DataReturn<T> = {
    title: string;
    data: T[];
};

type _Dict<T> = { [key: string]: T[] };

export function titledEvents(events?: TitleEventsTypeResponce) {
    return events ? events.results : [];
}

export function parseEvent<T extends EventTypeResponce>(
    events: PaginateReponce<T>
): DataReturn<T>[] {
    const data = events.results.reduce((priviousValue, currentValue: T) => {
        const mounthName = getMounthName(dayjs(currentValue.date));
        return {
            ...priviousValue,
            [mounthName]:
                mounthName in priviousValue
                    ? [...priviousValue[mounthName], currentValue]
                    : [currentValue],
        };
    }, {} as _Dict<T>);

    return Object.keys(data).map((key) => ({
        title: key,
        data: data[key],
    }));
}
