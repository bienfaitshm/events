/** @format */
import {
    AxiosInstance,
    AxiosPromise,
    AxiosError,
    AxiosRequestConfig,
} from "axios";

type Ttoken = null | undefined | string;

export default class AuthApis {
    private _token: Ttoken;
    private _refresh: Ttoken;

    public set token(token: string) {
        this._token = token;
    }

    public get token(): Ttoken {
        return this._token;
    }

    public get refesh(): Ttoken {
        return this._refresh;
    }

    public set refresh(v: string) {
        this._refresh = v;
    }

    /**
     * name
     */
    public setToken({ token, refresh }: { token: string; refresh: string }) {
        this._token = token;
        this._refresh = refresh;
    }

    /**
     * removeToken
     */
    public removeToken() {
        this._refresh = null;
        this._refresh = null;
    }

    /**
     * Authro
     */
    public Authorization(tokenHeader?: string) {
        return `${tokenHeader} ${this._token}`;
    }
}

export class BaseAxiosApis extends AuthApis {
    apis: AxiosInstance;
    tokenHeader?: string;
    constructor(apis: AxiosInstance, tokenHeader?: string) {
        super();
        this.apis = apis;
        this.tokenHeader = tokenHeader;
    }

    /**
     * headersConfig
     */
    public getHeadersConfigAuthentication<TConfig>(
        config?: AxiosRequestConfig<TConfig>
    ): AxiosRequestConfig<TConfig> {
        const Authorization = this.token
            ? { Authorization: this.Authorization(this.tokenHeader) }
            : {};
        // console.log(
        //     JSON.stringify(
        //         {
        //             ...config,
        //             headers: { ...config?.headers, ...Authorization },
        //         },
        //         null,
        //         4
        //     )
        // );
        return { ...config, headers: { ...config?.headers, ...Authorization } };
    }

    /**
     * extractAxiosResponse
     */
    public extractAxiosDataResponse<TData>(request: AxiosPromise<TData>) {
        return request.then((res) => res.data);
    }

    /**
     * get
     */
    public async get<TData>(url: string, config?: AxiosRequestConfig) {
        return this.extractAxiosDataResponse<TData>(this.apis.get(url, config));
    }

    /**
     * async
     */
    public async post<TData, TResponse>(
        url: string,
        data?: TData,
        config?: AxiosRequestConfig
    ) {
        return this.extractAxiosDataResponse<TResponse>(
            this.apis.post(url, data, config)
        );
    }

    /**
     * request
     */
    public getRequestAuthenticated<TData>(
        url: string,
        config?: AxiosRequestConfig
    ) {
        return this.get<TData>(
            url,
            this.getHeadersConfigAuthentication(config)
        );
    }

    /**
     * postRequestAuthenticated
     */
    public postRequestAuthenticated<TData, TResponse>(
        url: string,
        data?: TData,
        config?: AxiosRequestConfig
    ) {
        return this.post<TData, TResponse>(
            url,
            data,
            this.getHeadersConfigAuthentication(config)
        );
    }
}
