import React from "react";
import { ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import {
    View,
    Input,
    Heading,
    Button,
    Radio,
    Icon,
    IInputProps,
} from "native-base";
import {
    useForm,
    SubmitHandler,
    Controller,
    Control,
    FieldErrors,
} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LabelInput, { LabelInputProps } from "./LabelInput";
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types";

type DataInputType = {
    firstName: string;
    secondName: string;
    isCouple?: boolean;
    phone: string;
    email: string;
    place: string;
};

type CreatorGuestProps = {
    initialValue?: Partial<DataInputType>;
    onSubmit?(e: DataInputType): void;
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Le premier nom est obligatoire"),
    secondName: Yup.string().notRequired(),
    email: Yup.string()
        .email("Email pas valide")
        .required("L'email est obligatoire"),
    phone: Yup.string().required("Le numero de telephone est obligatoire"),
    place: Yup.string().required("La place est obligatoire"),
    isCouple: Yup.boolean().nonNullable(),
});

type ControledInputProps<D extends {}> = Omit<LabelInputProps, "children"> & {
    viewProps?: InterfaceViewProps;
    control?: Control<D, any>;
    errors?: FieldErrors<D>;
    name: keyof D;
    inputProps?: IInputProps;
};

const ControledInput: React.FC<ControledInputProps<DataInputType>> = ({
    viewProps,
    control,
    errors,
    name,
    inputProps,
    ...props
}) => {
    return (
        <View my="3" {...viewProps}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <LabelInput
                        errorMessage={errors?.[name]?.message}
                        isInvalid={Boolean(errors?.[name])}
                        {...props}
                    >
                        <Input
                            fontSize="md"
                            variant="underlined"
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
};

const CreatorGuest: React.FC<CreatorGuestProps> = ({
    onSubmit,
    initialValue,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<DataInputType>({
        defaultValues: { isCouple: false, ...initialValue },
        resolver: yupResolver(validationSchema),
    });

    const handlerSubmit: SubmitHandler<DataInputType> = (data) =>
        onSubmit?.(data);

    return (
        <ScrollView>
            <View bg="black" p="3" py="3">
                <Heading color="white" mb="10">
                    Ajout invite
                </Heading>
                <ControledInput
                    name="firstName"
                    control={control}
                    errors={errors}
                    label="Premier invite"
                    labelProps={{ color: "white" }}
                    inputProps={{
                        placeholderTextColor: "white",
                        color: "white",
                    }}
                />
                <ControledInput
                    name="secondName"
                    control={control}
                    errors={errors}
                    label="Deuxieme mom invite"
                    labelProps={{ color: "white" }}
                    inputProps={{
                        placeholderTextColor: "white",
                        color: "white",
                    }}
                />
                <View my="3">
                    <LabelInput label="Categorie" labelColor="white">
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Radio.Group
                                    value={value ? "couple" : "single"}
                                    name="couple"
                                    size="lg"
                                    accessibilityLabel="Category"
                                    color="white"
                                    _text={{ color: "white" }}
                                    onChange={(e) => onChange(e == "couple")}
                                >
                                    <Radio
                                        icon={<Icon as={Entypo} name="users" />}
                                        value="couple"
                                        my="2"
                                        _text={{
                                            color: "white",
                                        }}
                                    >
                                        Couple
                                    </Radio>
                                    <Radio
                                        icon={<Icon as={Entypo} name="user" />}
                                        value="single"
                                        my="2"
                                        _text={{
                                            color: "white",
                                        }}
                                    >
                                        Single
                                    </Radio>
                                </Radio.Group>
                            )}
                            name="isCouple"
                        />
                    </LabelInput>
                </View>
                <ControledInput
                    name="phone"
                    control={control}
                    errors={errors}
                    label="Telephone"
                    labelProps={{ color: "white" }}
                    inputProps={{
                        placeholderTextColor: "white",
                        color: "white",
                        placeholder: "+243...",
                    }}
                />
                <ControledInput
                    name="email"
                    control={control}
                    errors={errors}
                    label="Email"
                    labelProps={{ color: "white" }}
                    inputProps={{
                        placeholderTextColor: "white",
                        color: "white",
                        placeholder: "exemple@event.com",
                        keyboardType: "email-address",
                    }}
                />
            </View>
            <ControledInput
                name="place"
                control={control}
                errors={errors}
                label="Place"
                inputProps={{
                    placeholder: "Par ex. Genese",
                }}
                viewProps={{
                    mx: "3",
                }}
            />

            <View m="5">
                <Button
                    rounded="full"
                    size="lg"
                    colorScheme="black"
                    bgColor="black"
                    onPress={handleSubmit(handlerSubmit)}
                >
                    Enregistrer
                </Button>
            </View>
        </ScrollView>
    );
};

export default CreatorGuest;
