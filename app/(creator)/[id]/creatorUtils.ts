import { useLocalSearchParams } from "expo-router";

export type _ID = string | number;
export type IdKeyParams = {
    id: string | string[];
};

export function getOneKeyFromKeyList(id?: string | string[]) {
    if (typeof id == "string") {
        return id;
    }
    if (id && id.length > 0) {
        return id[0];
    }
    return "";
}

export function useParamsID() {
    const { id } = useLocalSearchParams<IdKeyParams>();
    return getOneKeyFromKeyList(id);
}
