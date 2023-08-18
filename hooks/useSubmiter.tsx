/** @format */

import { useToastAction } from "./useToastAction";
import { SubmitHandler } from "react-hook-form";
import { MutateOptions, UseMutateFunction } from "react-query";
import { useStoreAuth } from "./auth/accounts";
import { useRouter } from "expo-router";
import { TTokenAccess, TUser } from "../services/apis/types";

type MutationOption<D, P> = MutateOptions<D, unknown, P, unknown>;
type MutionFnType<D extends {}, P extends {}> = UseMutateFunction<
    D,
    unknown,
    P,
    unknown
>;

type SubmiterOptions<D extends {}, R extends {}> = {
    mutate: MutionFnType<R, D>;
    options?: MutationOption<R, D>;
    successMessage?: string;
    errorMessage?: string;
};

export function useSubmiter<D extends {}, R extends {}>({
    mutate,
    errorMessage = "Verifier vos donnees",
    successMessage = "Operation reussi!",
    options,
}: SubmiterOptions<D, R>): SubmitHandler<D> {
    const toast = useToastAction();

    return (data) => {
        console.log("Submit", data);
        mutate(data, {
            onError(error: any, variables, context) {
                const message = error?.response ? errorMessage : error?.message;
                toast.toastError(message);
                options?.onError?.(error, variables, context);
                console.log("Error", error);
            },
            onSuccess(res, variables, context) {
                console.log("Success", res);
                toast.toastSuccess(successMessage);
                options?.onSuccess?.(res, variables, context);
            },
        });
    };
}

export function useAuthSubmiter<D extends {}, R extends {}>(
    options: SubmiterOptions<D, R>
) {
    const router = useRouter();
    const authenticate = useStoreAuth((state) => state.authenticate);
    return useSubmiter({
        ...options,
        options: {
            onSuccess(data: any, variables, context) {
                const newData = data as TTokenAccess & {
                    user: TUser;
                };
                authenticate({
                    access: newData.access,
                    refresh: newData.refresh,
                    user: newData.user,
                });
                router.replace("/");
                console.log("datata>>>> ", JSON.stringify(newData, null, 4));
                // authenticate
            },
        },
    });
}
