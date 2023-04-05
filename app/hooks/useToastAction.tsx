import {
    Alert,
    VStack,
    useToast,
    HStack,
    Text,
    IconButton,
    CloseIcon,
    IToastProps,
} from "native-base";

type toastType = {
    show: (props: IToastProps) => any;
    close: (id: any) => void;
    closeAll: () => void;
    isActive: (id: any) => boolean;
};

const ToastAlert: React.FC<{
    toast: toastType;
    id: any;
    title: string;
    message: string;
}> = ({ toast, title, id, message }) => (
    <Alert
        m="3"
        maxWidth="100%"
        alignSelf="center"
        flexDirection="row"
        status="error"
        variant="solid"
    >
        <VStack space={1} flexShrink={1} w="100%">
            <HStack
                flexShrink={1}
                alignItems="center"
                justifyContent="space-between"
            >
                <HStack space={2} flexShrink={1} alignItems="center">
                    <Alert.Icon />
                    <Text
                        fontSize="md"
                        fontWeight="medium"
                        flexShrink={1}
                        color="red.500"
                    >
                        {title}
                    </Text>
                </HStack>
                <IconButton
                    variant="unstyled"
                    icon={<CloseIcon size="3" />}
                    _icon={{
                        color: "lightText",
                    }}
                    onPress={() => toast.close(id)}
                />
            </HStack>
            <Text px="6" color="lightText">
                {message}
            </Text>
        </VStack>
    </Alert>
);

export const useToastAction = () => {
    const toast = useToast();
    return {
        toastError: (message: string) => {
            toast.show({
                duration: 10000,
                render: ({ id }) => (
                    <ToastAlert
                        id={id}
                        title="Errors"
                        toast={toast}
                        message={message}
                    />
                ),
            });
        },
        toastSuccess: () => {
            toast.show({
                render: ({ id }) => (
                    <ToastAlert
                        id={id}
                        title="Errors"
                        toast={toast}
                        message="l'ajout a reussi!"
                    />
                ),
            });
        },
    };
};
