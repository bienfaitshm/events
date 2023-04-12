import { useMutation, useQuery } from "react-query";
import {
    apis,
    EventDataPostType,
    GuestDataPostType,
    LoginControlerDataType,
    LoginOwnerDataType,
} from "../services/apis";

type _ID = string | number;

export function useLoadEvent() {
    return useQuery("loadEvent", apis.fetchEvents);
}

/**
 * Fetch user
 * @returns
 */
export function useFetchUser() {
    return useQuery({
        queryKey: "user",
        queryFn: () => apis.fetchUser(),
    });
}

/**
 *
 * @param event id of event
 * @returns
 */
export function useFetchEvent(event: _ID) {
    return useQuery({
        queryKey: ["event", event],
        queryFn: () => apis.fetchEvent(event),
    });
}

export function useFetchTitleEvent() {
    return useQuery("loadTitleEvent", apis.fetchTitleEvents);
}

export function useFetchCategories() {
    return useQuery("loadCategories", apis.fetchCategories);
}

export function useFetchDateEvents(date: string) {
    return useQuery({
        queryKey: ["dateEvent", date],
        queryFn: () => apis.fecthDateEvents(date),
    });
}

/**
 *
 * @param event id of event
 * @returns
 */
export function useFetchEventGuests(event: string | number) {
    return useQuery({
        queryKey: ["eventGuest", event],
        queryFn: () => apis.fetchEventGuests(event),
    });
}

// mutations

export function useSendInvationGuest() {
    return useMutation({
        mutationFn: (data: { event: _ID; guest: _ID }) =>
            apis.sendGuestInvation(data),
    });
}

export function usePostGuest() {
    return useMutation({
        mutationFn: (data: GuestDataPostType) => apis.postGuest(data),
    });
}

export function usePostEvent() {
    return useMutation({
        mutationFn: (data: EventDataPostType) => apis.postEvent(data),
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
