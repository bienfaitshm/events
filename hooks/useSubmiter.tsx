import { useAuthentication } from "./useAuthPersisteInfos";
import { useToastAction } from "./useToastAction";
import { SubmitHandler } from "react-hook-form";
import { MutateOptions } from "react-query";

type MutationOption<D, P> = MutateOptions<D, unknown, P, unknown>;
type SubmiterOptions<DataInputType, ResultType> = {
    mutate: (
        variables: DataInputType,
        options?: MutationOption<DataInputType, ResultType>
    ) => void;
    options?: MutationOption<DataInputType, ResultType>;
    successMessage?: string;
    errorMessage?: string;
};

export function useSubmiter<DataInputType extends {}, ResultType>({
    mutate,
    errorMessage = "Verifier vos donnees",
    successMessage = "Operation reussi!",
    options,
}: SubmiterOptions<DataInputType, ResultType>): SubmitHandler<DataInputType> {
    const toast = useToastAction();

    return (data) => {
        mutate(data, {
            onError(error: any, variables: ResultType, context: unknown) {
                const message = error.response ? errorMessage : error.message;
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

export function useAuthSubmiter<D extends {}, R>(
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
