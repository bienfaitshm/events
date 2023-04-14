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
    IInputProps,
    Pressable,
    Icon,
} from "native-base";

import { useForm, SubmitHandler } from "react-hook-form";

import ButtonCreation from "./ButtonCreation";
import ControledInput from "./ControledInput";

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

type CreatorEventsProps<D> = {
    isLoading?: boolean;
    initialValue?: Partial<D>;
    onSubmit?: (value: DataInputType) => void;
};

const CreatorEvents: React.FC<CreatorEventsProps<DataInputType>> = ({
    initialValue,
    onSubmit,
    isLoading = false,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<DataInputType>({
        defaultValues: initialValue,
        resolver: yupResolver(validationSchema),
    });

    const handlerSubmit: SubmitHandler<DataInputType> = (data) =>
        onSubmit?.({
            ...data,
            date: getIsoFormatDateTime(data.date, "DATE"),
        });

    return (
        <ScrollView>
            <VStack p="4" pb="10" bg="black" space={10}>
                <VStack space={4}>
                    <ControledInput
                        label="Nom Event"
                        name="name"
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
                        Children={DateTimeInput}
                        inputProps={{ mode: "date" }}
                    />
                    <HStack space={10}>
                        <ControledInput
                            label="Debut"
                            name="start"
                            control={control}
                            Children={DateTimeInput}
                            inputProps={{ flex: 1, w: "full" }}
                        />
                        <ControledInput
                            label="Fin"
                            name="end"
                            control={control}
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
                    control={control}
                    labelProps={{ color: "white" }}
                    inputProps={{
                        placeholderTextColor: "gray.800",
                        color: "gray.800",
                    }}
                />
                <ButtonCreation
                    isLoading={isLoading}
                    onPress={handleSubmit(handlerSubmit)}
                />
            </VStack>
        </ScrollView>
    );
};

export default CreatorEvents;
