/** @format */

import { useQuery } from "react-query";
import { apis } from "../../services/apis";

export function useFetchTitleEvent<TResponce>() {
    return useQuery({
        queryKey: ["eventTitles"],
        queryFn: () => apis.fetchTitleEvents<TResponce>(),
    });
}
