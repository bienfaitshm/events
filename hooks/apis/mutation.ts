/** @format */

import { useMutation } from "react-query";
import { apis } from "../../services/apis";
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
