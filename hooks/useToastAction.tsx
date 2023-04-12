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
    status?: "success" | "error";
    id: any;
    title: string;
    message: string;
}> = ({ toast, title, id, message, status = "error" }) => (
    <Alert
        m="3"
        maxWidth="100%"
        alignSelf="center"
        flexDirection="row"
        variant="solid"
        status={status}
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
                        color="lightText"
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
        toastSuccess: (message: string = "l'ajout a reussi!") => {
            toast.show({
                duration: 10000,
                placement: "top",
                render: ({ id }) => (
                    <ToastAlert
                        id={id}
                        toast={toast}
                        status="success"
                        title="Ajout"
                        message={message}
                    />
                ),
            });
        },
    };
};
