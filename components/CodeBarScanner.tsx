import React from "react";
import { StyleSheet } from "react-native";
import { View, Button, Text } from "native-base";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";

type CodeBarScannerProps = {
    onBarCodeScanned?: BarCodeScannedCallback;
};

const CodeBarScanner: React.FC<CodeBarScannerProps> = ({
    onBarCodeScanned,
}) => {
    const [hasPermission, setHasPermission] = React.useState<boolean>(false);
    const [scanned, setScanned] = React.useState<boolean>(false);

    const getBarCodeScannerPermissions = React.useCallback(async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
    }, []);

    const handleBarCodeScanned: BarCodeScannedCallback = React.useCallback(
        (params) => {
            setScanned(true);
            onBarCodeScanned?.(params);
            alert(
                `Bar code with type ${params.type} and data ${params.data} has been scanned!`
            );
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
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button onPress={() => setScanned(false)}>
                    Tap to Scan Again
                </Button>
            )}
        </View>
    );
};

export default CodeBarScanner;
