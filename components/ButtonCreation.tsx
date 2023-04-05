import React from "react";
import { Button } from "native-base";

export type CallBackType = (state: boolean) => void;

export type ButtonCreationProps = {
    onPress?: (callback?: CallBackType) => void;
};

const ButtonCreation: React.FC<ButtonCreationProps> = ({ onPress }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const handlerSubmit = React.useCallback(() => {
        onPress?.(setLoading);
    }, []);

    return (
        <Button
            disabled={loading}
            isLoading={loading}
            rounded="full"
            size="lg"
            colorScheme="black"
            bgColor="black"
            onPress={handlerSubmit}
        >
            Enregistrer
        </Button>
    );
};

export default ButtonCreation;
