import React from "react";
import { StyleSheet } from "react-native";
import { View, Button, Text, Icon } from "native-base";
import {
    BarCodeScannedCallback as ClbBarCodeScanner,
    BarCodeScanner,
} from "expo-barcode-scanner";
import Feather from "@expo/vector-icons/Feather";

export type BarCodeScannedCallback = ClbBarCodeScanner;
type CodeBarScannerProps = {
    onBarCodeScanned?: BarCodeScannedCallback;
    onScanAgain?(): void;
};

const CodeBarScanner: React.FC<CodeBarScannerProps> = ({
    onBarCodeScanned,
    onScanAgain,
}) => {
    const [hasPermission, setHasPermission] = React.useState<boolean>(false);
    const [scanned, setScanned] = React.useState<boolean>(false);

    const getBarCodeScannerPermissions = React.useCallback(async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
    }, []);

    const handlerScanAgain = React.useCallback(() => {
        setScanned(false);
        onScanAgain?.();
    }, []);

    const handleBarCodeScanned: BarCodeScannedCallback = React.useCallback(
        (params) => {
            setScanned(true);
            onBarCodeScanned?.(params);
        },
        []
    );

    React.useEffect(() => {
        getBarCodeScannerPermissions();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View flex={1} bg="blue.300">
            {!scanned && (
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                />
            )}
            {scanned && (
                <View
                    style={StyleSheet.absoluteFillObject}
                    bg="coolGray.200"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Button
                        rounded="full"
                        leftIcon={<Icon as={Feather} name="refresh-ccw" />}
                        onPress={handlerScanAgain}
                    >
                        Scanner encore
                    </Button>
                </View>
            )}
        </View>
    );
};

export default CodeBarScanner;
