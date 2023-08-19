/** @format */

import { useMutation, useQueryClient } from "react-query";
import { apis } from "../../services/apis";
import { TParams } from "../../services/apis/actions";
/**
 * Login Controler
 * @returns
 */
export function useLoginControler<TData, TResponse>() {
    return useMutation({
        mutationFn: (data: TData) =>
            apis.loginControler<TData, TResponse>(data),
    });
}

/**
 * Login organisator
 * @returns
 */
export function useLoginOrganisator<TData, TResponse>() {
    return useMutation({
        mutationFn: (data: TData) =>
            apis.loginOrganisator<TData, TResponse>(data),
    });
}

export function useSendInvation<TData, TResponse>() {
    return useMutation({
        mutationFn: (data: TData) =>
            apis.sendGuestInvation<TData, TResponse>(data),
    });
}

export function usePostGuest<TData, TResponse>(config: TParams = {}) {
    const clients = useQueryClient();
    return useMutation({
        mutationFn: (data: TData) => apis.postGuest<TData, TResponse>(data),
        onSuccess(data: any, variables, context) {
            clients.setQueryData(["guests", config], (prev: any) => ({
                ...prev,
                results: [...prev.results, data],
            }));
        },
    });
}

export function usePostEvent<TData, TResponse>(config: TParams = {}) {
    const clients = useQueryClient();
    return useMutation({
        mutationFn: (data: TData) => apis.postEvent<TData, TResponse>(data),
        // onSuccess(data: any, variables, context) {
        //     clients.setQueryData(["guests", config], (prev: any) => ({
        //         ...prev,
        //         results: [...prev.results, data],
        //     }));
        // },
    });
}
