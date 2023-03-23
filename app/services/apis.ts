import axios, { AxiosInstance, AxiosResponse } from "axios";

// const URLNAME = "http://127.0.0.1:8000";
const URLNAME = "http://192.168.43.72:8000";

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
    date: string;
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
    id: _ID;
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

    getDataResponce = <T, D>(request: Promise<AxiosResponse<T, D>>) => {
        return request.then((res) => res.data);
    };

    createGuest = () => {};

    createEvent = () => {};
    getEvents = () => {
        return this.getDataResponce(this.apis.get("/api/event/"));
    };

    getTitledEvents = () => {
        return this.getDataResponce(this.apis.get("/api/event/titled/"));
    };

    getDateEvents = (date: string) => {
        return this.getDataResponce<PaginateReponce<EventTypeResponce>, any>(
            this.apis.get(`api/event/date/${date}/`)
        );
    };

    getGuests = () => {};

    getCategories = () => {
        return this.getDataResponce<PaginateReponce<CategoryType>, any>(
            this.apis.get("api/category/")
        );
    };

    sendInvitation = () => {};
}

export const apis = new ApisDefinition(axiosInstance);
