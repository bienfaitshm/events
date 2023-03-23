import { useQuery } from "react-query";
import { apis } from "../services/apis";

export function useLoadEvent() {
    return useQuery("loadEvent", apis.getEvents);
}

export function useLoadTitleEvent() {
    return useQuery("loadTitleEvent", apis.getTitledEvents);
}

export function useLoadCategories() {
    return useQuery("loadCategories", apis.getCategories);
}

export function useFetchDateEvents(date: string) {
    return useQuery({
        queryKey: ["dateEvent", date],
        queryFn: () => apis.getDateEvents(date),
    });
}
