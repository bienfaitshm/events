import React from "react";
import { ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { View, Heading, Radio, Icon } from "native-base";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LabelInput from "./LabelInput";
import ButtonCreation from "./ButtonCreation";
import ControledInput from "./ControledInput";

export type DataInputType = {
    firstName: string;
    secondName: string;
    isCouple?: boolean;
    phone: string;
    email: string;
    place: string;
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

type CreatorGuestProps = {
    initialValue?: Partial<DataInputType>;
    onSubmit?(e: DataInputType): void;
    isLoading?: boolean;
};

const CreatorGuest: React.FC<CreatorGuestProps> = ({
    onSubmit,
    initialValue,
    isLoading = false,
}) => {
    const { control, handleSubmit } = useForm<DataInputType>({
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
                label="Place"
                inputProps={{
                    placeholder: "Par ex. Genese",
                }}
                viewProps={{
                    mx: "3",
                }}
            />

            <View m="5">
                <ButtonCreation
                    isLoading={isLoading}
                    onPress={handleSubmit(handlerSubmit)}
                />
            </View>
        </ScrollView>
    );
};

export default CreatorGuest;
