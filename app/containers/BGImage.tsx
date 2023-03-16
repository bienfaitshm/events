import * as React from "react";
import { ImageBackground, ImageSourcePropType } from "react-native";
import { Box } from "native-base";

type IBGimage = {
    bg_color?: string;
    source: ImageSourcePropType;
    children: React.ReactNode;
};

const BGimage: React.FC<IBGimage> = ({ children, source, bg_color }) => {
    return (
        <ImageBackground
            style={{
                flex: 1,
                justifyContent: "center",
            }}
            imageStyle={{
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center",
            }}
            source={source}
        >
            <Box
                position="absolute"
                top="0"
                bottom={0}
                left={0}
                right={0}
                bg={bg_color}
            />
            {children}
        </ImageBackground>
    );
};

export default BGimage;
