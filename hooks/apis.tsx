import { useMutation, useQuery } from "react-query";
import {
    apis,
    EventDataPostType,
    GuestDataPostType,
    LoginControlerDataType,
    LoginOwnerDataType,
} from "../services/apis";
import { useAuthentication } from "./useAuthPersisteInfos";

type _ID = string | number;

/**
 * Fetch user
 * @returns
 */
export function useFetchUser() {
    const auth = useAuthentication();
    return useQuery({
        queryKey: "user",
        queryFn: () => apis.fetchUser(auth.access),
    });
}

/**
 *
 * @param event id of event
 * @returns
 */
export function useFetchEvent(event: _ID) {
    const auth = useAuthentication();
    return useQuery({
        queryKey: ["event", event],
        queryFn: () => apis.fetchEvent(event, auth.access),
    });
}

export function useFetchTitleEvent() {
    const auth = useAuthentication();
    return useQuery("loadTitleEvent", () => apis.fetchTitleEvents(auth.access));
}

export function useFetchCategories() {
    const auth = useAuthentication();
    return useQuery("loadCategories", () => apis.fetchCategories(auth.access));
}

export function useFetchDateEvents(date: string) {
    const auth = useAuthentication();
    return useQuery({
        queryKey: ["dateEvent", date],
        queryFn: () => apis.fecthDateEvents(date, auth.access),
    });
}

/**
 *
 * @param event id of event
 * @returns
 */
export function useFetchEventGuests(event: string | number) {
    const auth = useAuthentication();
    return useQuery({
        queryKey: ["eventGuest", event],
        queryFn: () => apis.fetchEventGuests(event, auth.access),
    });
}

// mutations

export function useSendInvationGuest() {
    const auth = useAuthentication();
    return useMutation({
        mutationFn: (data: { event: _ID; guest: _ID }) =>
            apis.sendGuestInvation(data, auth.access),
    });
}

export function usePostGuest() {
    const auth = useAuthentication();
    return useMutation({
        mutationFn: (data: GuestDataPostType) =>
            apis.postGuest(data, auth.access),
    });
}

export function usePostEvent() {
    const auth = useAuthentication();
    return useMutation({
        mutationFn: (data: EventDataPostType) =>
            apis.postEvent(data, auth.access),
    });
}

/**
 * Login Controler
 * @returns
 */
export function useLoginControler() {
    return useMutation({
        mutationFn: (data: LoginControlerDataType) => apis.loginControler(data),
    });
}

/**
 * Login organisator
 * @returns
 */
export function useLoginOrganisator() {
    return useMutation({
        mutationFn: (data: LoginOwnerDataType) => apis.loginOwner(data),
    });
}
