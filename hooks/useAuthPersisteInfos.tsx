import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
    isAuthenticated: boolean;
    access?: string;
    refresh?: string;
    id: string | number | null;
    username: string | null;
    firstname: string | null;
    lastname: string | null;
    phone: string | null;
    email: string | null;
    status: "AD" | "CO" | "OW" | null;
};

type Actions = {
    setToken(value: { access: string; refresh: string }): void;
    setUser(value: {
        id: string | number;
        username: string;
        first_name: string;
        last_name: string;
        phone: string;
        email: string;
        status: "AD" | "AC" | "OW";
    }): void;
};

export const useAuthentication = create<State & Actions>(
    persist(
        (set) => ({
            isAuthenticated: false,
            access: undefined,
            refresh: undefined,
            status: null,
            setToken(value) {
                set(() => ({
                    access: value.access,
                    refresh: value.refresh,
                    isAuthenticated: true,
                }));
            },
            setUser(value) {
                set(() => ({
                    id: value.id,
                    username: value.username,
                    firstname: value.first_name,
                    lastname: value.last_name,
                    phone: value.phone,
                    email: value.email,
                    status: value.status,
                }));
            },
        }),
        {
            name: "@AuthEvent",
            storage: createJSONStorage(() => AsyncStorage),
            version: 1,
        }
    )
);
