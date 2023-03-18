import axios, { AxiosInstance } from "axios";

const URLNAME = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
    baseURL: URLNAME,
});

type DateType = any;
type _ID = string | number;

export type PaginateReponce<T> = {
    count: number;
    next: null | number;
    previous: null | number;
    results: T[];
};

export type EventTypeResponce = {
    id: _ID;
    category_name: string;
    text_color: string;
    bg_color: string;
    created_at: DateType;
    date: DateType;
    start: DateType;
    end: DateType;
    name: string;
    description: string;
    category: _ID;
};

export type ItemEventType<EVENT> = {
    mounth: string;
    day: string;
    events: EVENT[];
};

export type TitleEventsType<IE> = {
    title: string;
    data: IE[];
};

export type TitleEventsTypeResponce = PaginateReponce<
    TitleEventsType<ItemEventType<EventTypeResponce>>
>;

export type CategoryType = {
    id: 1;
    created_at: DateType;
    name: string;
    text_color: string;
    bg_color: string;
};

export class ApisDefinition {
    apis: AxiosInstance;
    constructor(apis: AxiosInstance) {
        this.apis = apis;
    }

    createClient = () => {};

    createEvent = () => {};
    getEvents = () => {
        return this.apis.get("/api/event/").then((res) => res.data);
    };

    getTitledEvents = () => {
        return this.apis.get("/api/event/titled/").then((res) => res.data);
    };

    sendInvitation = () => {};
}

export const apis = new ApisDefinition(axiosInstance);
