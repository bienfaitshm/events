import { IInputProps, Input, View } from "native-base";
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types";
import { Controller, Control, Path } from "react-hook-form";
import LabelInput, { LabelInputProps } from "./LabelInput";

type ControledInputProps<D extends {}, P extends IInputProps> = Omit<
    LabelInputProps,
    "children"
> & {
    name: Path<D>;
    viewProps?: InterfaceViewProps;
    control?: Control<D, any>;
    inputProps?: P;
    Children?: React.FC<P>;
};

export default function ControledInput<D extends {}, P extends IInputProps>({
    name,
    control,
    viewProps,
    inputProps,
    Children = Input,
    ...props
}: ControledInputProps<D, P>) {
    return (
        <View my="3" flex={1} {...viewProps}>
            <Controller
                control={control}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => (
                    <LabelInput
                        errorMessage={error?.message}
                        isInvalid={Boolean(error)}
                        {...props}
                    >
                        <Children
                            fontSize="md"
                            variant="underlined"
                            placeholderTextColor="white"
                            color="white"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value as string}
                            {...inputProps}
                        />
                    </LabelInput>
                )}
                name={name}
            />
        </View>
    );
}
