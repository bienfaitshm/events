/** @format */

import { useQuery } from "react-query";
import { apis } from "../../services/apis";
import { TParams } from "../../services/apis/actions";

export function useFetchTitleEvent<TResponce>() {
    return useQuery({
        queryKey: ["eventTitles"],
        queryFn: () => apis.fetchTitleEvents<TResponce>(),
    });
}

export function useFetchCategories<TResponce>() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => apis.fetchCategories<TResponce>(),
    });
}

export function useFetchEvents<TResponce>(config: TParams = {}) {
    return useQuery({
        queryKey: ["events", config],
        queryFn: () => apis.fetchEvents<TResponce>(config),
    });
}

export function useFetchGuests<TResponce>(config: TParams = {}) {
    return useQuery({
        queryKey: ["guests", config],
        queryFn: () => apis.fetchGuests<TResponce>(config),
    });
}

export function useScanQrCode<TResponce>(url: string, config: TParams = {}) {
    return useQuery({
        queryKey: ["scanner", url],
        queryFn: () => apis.scanQrCode<TResponce>(url, config),
    });
}
