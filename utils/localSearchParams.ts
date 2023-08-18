/** @format */

import { useLocalSearchParams as useLSP } from "expo-router";

export function getOneKeyFromKeyList(id?: string | string[]) {
    if (typeof id == "string") {
        return id;
    }
    if (id && id.length > 0) {
        return id[0];
    }
    return "";
}

export function useLocalSearchParams<
    T extends { [key: string]: string | string[] }
>({
    extractFn,
}: {
    extractFn: (e: Partial<T>) => string | string[] | undefined;
}) {
    const params = useLSP<T>();
    return getOneKeyFromKeyList(extractFn(params));
}
