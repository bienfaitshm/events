/** @format */

type DateType = any;
type _ID = string | number;

type TInfosUserScan = {
    key: string;
    is_couple: boolean;
    first_name: string;
    second_name: string;
    place: string;
    created_at: DateType;
    pdf: string;
    guest: _ID;
};

export type TPaginate<T> = {
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

export type TGuest = GuestMixinType<{
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

export type TEvent = EventMixinType<{
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

export type TTitleEvent<IE> = {
    title: string;
    data: IE[];
};

export type TTitleEventPaginate = TPaginate<TTitleEvent<ItemEventType<TEvent>>>;

export type TCategory = {
    id: _ID;
    created_at: DateType;
    name: string;
    text_color: string;
    bg_color: string;
};

// Authentication Types

export type TTokenAccess = {
    access: string;
    refresh: string;
};

export type TUser = {
    id: _ID;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    status: "AD" | "CO" | "OW";
};

export type TLoginControlerData = {
    access_code: string;
};

export type TLoginOrganisatorData = {
    username: string;
    access_key: string;
};
