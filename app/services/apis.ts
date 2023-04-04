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

type GuestMixinType<T> = {
    first_name: string;
    second_name: string;
    is_couple: boolean;
    phone: string;
    email: string;
    place: string;
    event: _ID;
} & T;

export type GuestTypeResponce = GuestMixinType<{
    id: _ID;
    created_at: string;
    is_send: boolean;
}>;

export type GuestDataPostType = GuestMixinType<{}>;

type EventMixinType<T> = {
    name: string;
    description: string;
    date: any;
    start: any;
    end: any;
    category: _ID;
} & T;

export type EventTypeResponce = EventMixinType<{
    id: _ID;
    category_name: string;
    text_color: string;
    bg_color: string;
    created_at: DateType;
}>;

export type EventDataPostType = EventMixinType<{}>;

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

    postGuest = (data: GuestDataPostType) =>
        this.getDataResponce(this.apis.post(`api/guest/${data.event}/`, data));

    postEvent = (data: EventDataPostType) =>
        this.getDataResponce(this.apis.post("/api/event/", data));

    /**
     * fecth detail event information from api
     * @param id a id of event
     * @returns
     */
    fetchEvent = (id: _ID) =>
        this.getDataResponce<EventTypeResponce, any>(
            this.apis.get(`api/event/${id}/`)
        );

    /**
     * fetch all events
     * @returns
     */
    fetchEvents = () =>
        this.getDataResponce<PaginateReponce<EventTypeResponce>, any>(
            this.apis.get("/api/event/")
        );

    /**
     * fetch all event in format titled
     * @returns
     */
    fetchTitleEvents = () =>
        this.getDataResponce<
            PaginateReponce<TitleEventsType<ItemEventType<EventTypeResponce>>>,
            any
        >(this.apis.get("/api/event/titled/"));

    /**
     * fetch events for date inputed
     * @param date the date for load events
     * @returns
     */
    fecthDateEvents = (date: string) =>
        this.getDataResponce<PaginateReponce<EventTypeResponce>, any>(
            this.apis.get(`api/event/date/${date}/`)
        );

    /**
     * Fetch a list of guest of event
     * @param event a id of event
     * @returns
     */
    fetchEventGuests = (event: _ID) =>
        this.getDataResponce<PaginateReponce<GuestTypeResponce>, any>(
            this.apis.get(`/api/guest/${event}/`)
        );

    /**
     * Send invation to guest of invitation
     * @param params
     * @returns
     */
    sendGuestInvation = (params: { event: _ID; guest: _ID }) =>
        this.getDataResponce(
            this.apis.post(
                `api/guest/${params.event}/${params.guest}/send_invation/`
            )
        );

    /**
     * Fecth all categorie
     * @returns
     */
    fetchCategories = () =>
        this.getDataResponce<PaginateReponce<CategoryType>, any>(
            this.apis.get("api/category/")
        );
}

export const apis = new ApisDefinition(axiosInstance);
