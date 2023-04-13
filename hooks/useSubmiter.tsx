import { useAuthentication } from "./useAuthPersisteInfos";
import { useToastAction } from "./useToastAction";
import { SubmitHandler } from "react-hook-form";
import { MutateOptions, UseMutateFunction } from "react-query";

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
        mutate(data, {
            onError(error: any, variables, context) {
                const message = error?.response ? errorMessage : error?.message;
                toast.toastError(message);
                options?.onError?.(error, variables, context);
            },
            onSuccess(res, variables, context) {
                toast.toastSuccess(successMessage);
                options?.onSuccess?.(res, variables, context);
            },
        });
    };
}

export function useAuthSubmiter<D extends {}, R extends {}>(
    options: SubmiterOptions<D, R>
) {
    const authentication = useAuthentication();
    return useSubmiter({
        ...options,
        mutate: options.mutate,
        options: {
            onSuccess: (tokens) => authentication.setToken(tokens as any),
            ...options.options,
        },
    });
}
