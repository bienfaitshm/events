import React from "react";
import { Button, IButtonProps } from "native-base";

const ButtonCreation: React.FC<IButtonProps> = ({
    isLoadingText = "Ajout encours...",
    ...props
}) => {
    return (
        <Button
            rounded="full"
            size="lg"
            colorScheme="black"
            bgColor="black"
            {...props}
        >
            Enregistrer
        </Button>
    );
};

export default ButtonCreation;
