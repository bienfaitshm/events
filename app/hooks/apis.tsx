import { useQuery } from "react-query";
import { apis } from "../services/apis";

export function useLoadEvent() {
    return useQuery("loadEvent", apis.getEvents);
}

export function useLoadTitleEvent() {
    return useQuery("loadTitleEvent", apis.getTitledEvents);
}
