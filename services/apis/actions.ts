/** @format */

import { BaseAxiosApis } from "./mixin";

export type TParams = { params?: object } & (
    | { detail?: true; id: string | number }
    | { detail?: false }
);

export class ActionApis {
    apis: BaseAxiosApis;
    constructor(apis: BaseAxiosApis) {
        this.apis = apis;
    }

    /**
     * getUrl
     */
    public getUrl(baseUrl: string, config?: TParams): string {
        return config?.detail ? `${baseUrl}${config.id}` : baseUrl;
    }

    public loginControler<TData, TResponse>(data: TData, config: TParams = {}) {
        return this.apis.post<TData, TResponse>(
            "api/auth/login_controler/",
            data,
            config
        );
    }

    public loginOwner<TData, TResponse>(data: TData, config: TParams = {}) {
        return this.apis.post<TData, TResponse>(
            "api/auth/login/",
            data,
            config
        );
    }

    public fetchUser<T>(config: TParams = {}) {
        return this.apis.getRequestAuthenticated<T>("api/auth/user/", config);
    }

    public postGuest<TData, TResponse>(data: TData, config: TParams = {}) {
        return this.apis.postRequestAuthenticated<TData, TResponse>(
            this.getUrl(`api/guest/`, config),
            data,
            config
        );
    }

    public postEvent<TData, TResponse>(data: TData, config: TParams = {}) {
        return this.apis.postRequestAuthenticated<TData, TResponse>(
            this.getUrl("/api/event/", config),
            data,
            config
        );
    }

    /**
     * folders
     */
    public fetchEvents<T>(config: TParams = {}) {
        return this.apis.getRequestAuthenticated<T>(
            this.getUrl("/api/event/", config),
            config
        );
    }

    /**
     *
     * @param config
     * @returns
     */
    public fetchTitleEvents<T>(config: TParams = {}) {
        return this.apis.getRequestAuthenticated<T>(
            this.getUrl("/api/event/titled/", config),
            config
        );
    }

    public fetchEventGuests<T>(config: TParams = {}) {
        return this.apis.getRequestAuthenticated<T>(
            this.getUrl(`/api/guest/`, config),
            config
        );
    }

    /**
     * likeDocument
     */
    public sendGuestInvation<TData, TResponse>(
        data: TData,
        config: TParams = {}
    ) {
        return this.apis.postRequestAuthenticated<TData, TResponse>(
            `api/guest/send_invation/`,
            data,
            config
        );
    }

    public scanQrCode<T>(url: string, config: TParams = {}) {
        return this.apis.getRequestAuthenticated<T>(url, config);
    }

    public fetchCategories<T>(config: TParams = {}) {
        return this.apis.getRequestAuthenticated<T>(
            this.getUrl("api/category/", config),
            config
        );
    }
}
