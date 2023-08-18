/** @format */

import { create } from "zustand";
import * as SecureStorage from "expo-secure-store";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { axiosApisRequest } from "../../services/apis/index";

const nameStorage = "EventPlaneStarage123455487";

type TUser = {
    id: number | string;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    status: "AD" | "CO" | "OW";
};

type TState = {
    isAuthenticated: boolean;
    access: string | null;
    refresh: string | null;
    user: TUser | null;
};

type TActions = {
    disconnect(): void;
    setToken(value: { access: string; refresh: string }): void;
    setUser(value: TUser): void;
    authenticate(value: { user: TUser; access: string; refresh: string }): void;
};

/**
 *
 */
const Storage = (): StateStorage => ({
    getItem(name) {
        return SecureStorage.getItemAsync(name);
    },
    removeItem(name) {
        return SecureStorage.deleteItemAsync(name);
    },
    setItem(name, value) {
        return SecureStorage.setItemAsync(name, value);
    },
});

export const useStoreAuth = create(
    persist<TState & TActions>(
        (set, get) => ({
            isAuthenticated: false,
            user: null,
            access: null,
            refresh: null,
            setToken(value) {
                set(value);
            },
            setUser(user) {
                set({ user });
            },
            disconnect() {
                set({
                    user: null,
                    refresh: undefined,
                    access: undefined,
                });
            },
            authenticate(value) {
                axiosApisRequest.setToken({
                    token: value.access,
                    refresh: value.refresh,
                });
                set({
                    user: value.user,
                    access: value.access,
                    refresh: value.refresh,
                    isAuthenticated: true,
                });
            },
        }),
        {
            name: nameStorage,
            storage: createJSONStorage(Storage),
            version: 0.1,
            onRehydrateStorage() {
                // console.log(
                //     "\n\nonRehydrateStorage.... ",
                //     JSON.stringify(state, null, 2)
                // );
                console.log("hydration starts");
                return (state, error) => {
                    if (error) {
                        console.log(
                            "an error happened during hydration",
                            error
                        );
                    } else {
                        console.log("hydration finished", state);
                        if (state?.access && state?.refresh) {
                            axiosApisRequest.setToken({
                                token: state.access,
                                refresh: state.refresh,
                            });
                        }
                    }
                };
            },
        }
    )
);
