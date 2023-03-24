import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    Box,
    Text,
    VStack,
    Avatar,
    Input,
    HStack,
    ScrollView,
    Button,
    IInputProps,
} from "native-base";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Inputs = {
    name: string;
    description: string;
    start: Date;
    end: Date;
    date: Date;
};

/**
 * Label Input
 * @param props{}
 * @returns ReactNode
 */
const LabelInput: React.FC<{
    label: string;
    children: React.ReactNode;
    labelColor?: string;
}> = ({ label, labelColor, children }) => {
    return (
        <VStack flex={1}>
            <Text fontSize="md" color={labelColor}>
                {label}
            </Text>
            {children}
        </VStack>
    );
};

/**
 * Date Time input component
 */
type DateTimeInputProps = {} & IInputProps;

const DateTimeInput: React.FC<DateTimeInputProps> = ({ ...inputProps }) => {
    return (
        <Input
            flex={1}
            fontSize="md"
            variant="underlined"
            placeholderTextColor="white"
            color="white"
            {...inputProps}
        />
    );
};

const CreatorEvents = () => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <ScrollView>
            <VStack p="4" pb="10" bg="black" space={10}>
                <VStack space={4}>
                    <Avatar
                        bg="green.500"
                        size="lg"
                        source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                        }}
                    >
                        AJ
                    </Avatar>
                    <Text color="white" fontSize="2xl">
                        Creation Event
                    </Text>
                </VStack>
                <VStack space={4}>
                    <LabelInput label="Nom Event" labelColor="white">
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <Input
                                    fontSize="md"
                                    variant="underlined"
                                    placeholderTextColor="white"
                                    color="white"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="name"
                        />
                    </LabelInput>
                    <LabelInput label="Date" labelColor="white">
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <Input
                                    fontSize="md"
                                    variant="underlined"
                                    placeholderTextColor="white"
                                    color="white"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="name"
                        />
                    </LabelInput>

                    <HStack space={10}>
                        <LabelInput label="Debut" labelColor="white">
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <DateTimeInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="name"
                            />
                        </LabelInput>
                        <LabelInput label="Fin" labelColor="white">
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <DateTimeInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="name"
                            />
                        </LabelInput>
                    </HStack>
                </VStack>
            </VStack>
            <VStack p="4" space={8}>
                <LabelInput label="Description">
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                fontSize="md"
                                variant="underlined"
                                multiline
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="description"
                    />
                </LabelInput>
                <Button
                    colorScheme="black"
                    bgColor="black"
                    onPress={handleSubmit(onSubmit)}
                >
                    Enregistrer
                </Button>
            </VStack>
        </ScrollView>
    );
};

export default CreatorEvents;
