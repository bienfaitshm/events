import * as React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
    VStack,
    Input,
    HStack,
    ScrollView,
    Button,
    IInputProps,
    View,
    Pressable,
    Icon,
} from "native-base";

import {
    useForm,
    SubmitHandler,
    Controller,
    FieldErrors,
    Control,
} from "react-hook-form";
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types";

import LabelInput, { LabelInputProps } from "./LabelInput";
import ButtonCreation, { CallBackType } from "./ButtonCreation";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export type DataInputType = {
    name: string;
    description: string;
    start: Date | string;
    end: Date | string;
    date: Date | string;
};

// date getter process
const DATE_FORMAT = "DD-MM-YYYY";
const DATE_FORMAT_ISO = "YYYY-MM-DD";
const TIME_FORMAT = "HH:mm";

const getParsedTime = (
    value: string | Date | undefined,
    format: string = TIME_FORMAT
) => {
    const datejs: dayjs.Dayjs =
        typeof value === "string" ? dayjs(value, format, true) : dayjs(value);
    return datejs.isValid() ? datejs : dayjs();
};

const getIsoFormatDateTime = (
    datetime?: Date | string,
    type: "TIME" | "DATE" = "TIME"
) => {
    return getParsedTime(datetime).format(
        type === "TIME" ? TIME_FORMAT : DATE_FORMAT_ISO
    );
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom de l'evenement est obligatoire"),
    date: Yup.string()
        .required("La date est obligatoire")
        .matches(
            /^\d{2}([./-])\d{2}\1\d{4}$/,
            "La Date est invalide utiliser par ex. 23-03-2023"
        ),
    start: Yup.string()
        .matches(/^\d{2}([:])\d{2}$/, "L'heure n'est pas correcte")
        .required("Le debut est obligatoire"),
    end: Yup.string()
        .matches(/^\d{2}([:])\d{2}$/, "L'heure n'est pas correcte")
        .required("La fin est obligatoire"),
    description: Yup.string().required("La description est obligatoire"),
});

/**
 * Date Time input component
 */
type DateTimeInputProps = {
    mode?: "time" | "date";
} & IInputProps;

const DateTimeInput: React.FC<DateTimeInputProps> = ({
    mode = "time",
    value,
    ...inputProps
}) => {
    const format = mode == "time" ? TIME_FORMAT : DATE_FORMAT;
    const onChange = (event: DateTimePickerEvent, date?: Date) => {
        if (event.type == "set") {
            const dateStr = dayjs(date).format(format);
            inputProps?.onChangeText?.(dateStr);
        }
    };

    const handlerOpenDatePicker = () => {
        DateTimePickerAndroid.open({
            value: getParsedTime(value, format).toDate(),
            onChange,
            mode: mode,
            is24Hour: true,
        });
    };
    return (
        <Input
            flex={1}
            fontSize="md"
            variant="underlined"
            InputRightElement={
                <Pressable onPress={handlerOpenDatePicker}>
                    <Icon
                        as={Ionicons}
                        name={mode == "date" ? "calendar" : "time"}
                    />
                </Pressable>
            }
            value={value}
            {...inputProps}
        />
    );
};

type ControledInputProps<
    D extends {},
    P = IInputProps | DateTimeInputProps
> = Omit<LabelInputProps, "children"> & {
    viewProps?: InterfaceViewProps;
    control?: Control<D, any>;
    errors?: FieldErrors<D>;
    name: keyof D;
    inputProps?: P;
    Children?: React.FC<P>;
};

const ControledInput: React.FC<ControledInputProps<DataInputType>> = ({
    viewProps,
    control,
    errors,
    name,
    inputProps,
    Children = Input,
    ...props
}) => {
    return (
        <View my="3" flex={1} {...viewProps}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <LabelInput
                        errorMessage={errors?.[name]?.message}
                        isInvalid={Boolean(errors?.[name])}
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
};

type CreatorEventsProps<D> = {
    initialValue?: Partial<D>;
    onSubmit?: (value: DataInputType, callback?: CallBackType) => void;
};

const CreatorEvents: React.FC<CreatorEventsProps<DataInputType>> = ({
    initialValue,
    onSubmit,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<DataInputType>({
        defaultValues: initialValue,
        resolver: yupResolver(validationSchema),
    });

    const handlerSubmit = (callback?: CallBackType) => {
        handleSubmit((data) => {
            callback?.(true);
            onSubmit?.(
                {
                    ...data,
                    date: getIsoFormatDateTime(data.date, "DATE"),
                },
                callback
            );
        })();
    };

    return (
        <ScrollView>
            <VStack p="4" pb="10" bg="black" space={10}>
                <VStack space={4}>
                    <ControledInput
                        label="Nom Event"
                        name="name"
                        errors={errors}
                        control={control}
                        labelProps={{ color: "white" }}
                        inputProps={{
                            placeholderTextColor: "white",
                            color: "white",
                        }}
                    />
                    <ControledInput
                        label="Date"
                        name="date"
                        control={control}
                        errors={errors}
                        Children={DateTimeInput}
                        inputProps={{ mode: "date" }}
                    />
                    <HStack space={10}>
                        <ControledInput
                            label="Debut"
                            name="start"
                            control={control}
                            errors={errors}
                            Children={DateTimeInput}
                            inputProps={{ flex: 1, w: "full" }}
                        />
                        <ControledInput
                            label="Fin"
                            name="end"
                            control={control}
                            errors={errors}
                            Children={DateTimeInput}
                            inputProps={{ flex: 1 }}
                        />
                    </HStack>
                </VStack>
            </VStack>
            <VStack p="4" space={8}>
                <ControledInput
                    label="Description"
                    name="description"
                    errors={errors}
                    control={control}
                    labelProps={{ color: "white" }}
                    inputProps={{
                        placeholderTextColor: "gray.800",
                        color: "gray.800",
                    }}
                />
                <ButtonCreation isLoading onPress={handlerSubmit} />
            </VStack>
        </ScrollView>
    );
};

export default CreatorEvents;
