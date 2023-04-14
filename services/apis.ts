import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// const URLNAME = "http://127.0.0.1:8000";
const URLNAME = "http://192.168.43.72:8000";
const TOKEN_HEADER = "Bearer";

const axiosInstance = axios.create({
    baseURL: URLNAME,
    timeout: 3000,
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
    code: string | null;
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

// Authentication Types

export type TokenAccessType = {
    access: string;
    refresh: string;
};

export type UserResponceType = {
    id: _ID;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    status: "AD" | "AC" | "OW";
};

export type LoginControlerDataType = {
    access_code: string;
};

export type LoginOwnerDataType = {
    username: string;
    access_key: string;
};

export class ApisDefinition {
    apis: AxiosInstance;
    constructor(apis: AxiosInstance) {
        this.apis = apis;
    }

    /**
     * set token from header
     * @param token string a key of token
     * @returns
     */
    setToken = (token: string) =>
        (this.apis.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`);

    getDataResponce = <T, D>(request: Promise<AxiosResponse<T, D>>) => {
        return request.then((res) => res.data);
    };

    authorization = (token?: string) => {
        return {
            headers: {
                Authorization: `${TOKEN_HEADER} ${token}`,
            },
        };
    };

    get = <T>(url: string, key?: string) => {
        return this.getDataResponce<T, any>(
            this.apis.get(url, this.authorization(key))
        );
    };

    post = <T, D>(url: string, data: D, key?: string) =>
        this.getDataResponce<T, any>(
            this.apis.post(url, data, this.authorization(key))
        );

    /**
     * Login Controler
     * @param data
     * @returns
     */
    loginControler = <D = TokenAccessType, P = LoginControlerDataType>(
        data: P
    ) => this.post<D, P>("api/auth/login_controler/", data);
    /**
     * login Owner
     * @param data
     * @returns
     */
    loginOwner = <D = TokenAccessType, P = LoginOwnerDataType>(data: P) =>
        this.post<D, P>("api/auth/login/", data);

    /**
     * Fetch infos of user
     * @returns
     */
    fetchUser = (token?: string) =>
        this.get<UserResponceType>("api/auth/user/", token);

    /**
     *
     * @param data GuestDataPostType
     * @returns
     */
    postGuest = (data: GuestDataPostType, token?: string) =>
        this.post(`api/guest/${data.event}/`, data, token);

    /**
     * create a new event
     * @param data  EventDataPostType
     * @returns EventTypeResponce
     */
    postEvent = (data: EventDataPostType, token?: string) =>
        this.post("/api/event/", data, token);

    /**
     * fecth detail event information from api
     * @param id a id of event
     * @returns EventTypeResponce
     */
    fetchEvent = <D = EventTypeResponce>(id: _ID, token?: string) =>
        this.get<D>(`api/event/${id}/`, token);

    /**
     * fetch all events
     * @returns
     */
    fetchEvents = <D = PaginateReponce<EventTypeResponce>>(token?: string) =>
        this.get<D>("/api/event/", token);

    /**
     * fetch all event in format titled
     * @returns
     */
    fetchTitleEvents = <
        D = PaginateReponce<TitleEventsType<ItemEventType<EventTypeResponce>>>
    >(
        token?: string
    ) => this.get<D>("/api/event/titled/", token);

    /**
     * fetch events for date inputed
     * @param date the date for load events
     * @returns
     */
    fecthDateEvents = <D = PaginateReponce<EventTypeResponce>, T = string>(
        date: T,
        token?: string
    ) => this.get<D>(`api/event/date/${date}/`, token);

    /**
     * Fetch a list of guest of event
     * @param event a id of event
     * @returns
     */
    fetchEventGuests = <D = PaginateReponce<GuestTypeResponce>, P = _ID>(
        event: P,
        token?: string
    ) => this.get<D>(`/api/guest/${event}/`, token);

    /**
     * Send invation to guest of invitation
     * @param params
     * @returns
     */
    sendGuestInvation = <P extends { event: _ID; guest: _ID }, D = any>(
        params: P,
        token?: string
    ) =>
        this.post<D, P>(
            `api/guest/${params.event}/${params.guest}/send_invation/`,
            params,
            token
        );

    /**
     * Fecth all categorie
     * @returns
     */
    fetchCategories = <D = PaginateReponce<CategoryType>>(token?: string) =>
        this.get<D>("api/category/", token);
}

export const apis = new ApisDefinition(axiosInstance);
