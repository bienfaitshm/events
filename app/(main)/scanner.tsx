import React from "react";
import { View, Heading, VStack, Text } from "native-base";
import CodeBarScanner, {
    BarCodeScannedCallback,
} from "../../components/CodeBarScanner";

export default function ScannerPage() {
    const [data, setData] = React.useState<undefined | string>(undefined);

    const handlerScanAgain = React.useCallback(() => {
        setData(undefined);
    }, []);

    const handlerScan: BarCodeScannedCallback = React.useCallback(
        ({ data }) => {
            setData(data);
        },
        []
    );

    return (
        <View flex={1}>
            <VStack
                my="5"
                space="3"
                alignItems="center"
                justifyContent="center"
            >
                <Heading>Scan Qr Code</Heading>
                <Text color="text.600">scan le code sur l'invitation</Text>
            </VStack>
            <View mt="10" justifyContent="center" alignItems="center">
                <View h={300} w={300} rounded="md">
                    <CodeBarScanner
                        onScanAgain={handlerScanAgain}
                        onBarCodeScanned={handlerScan}
                    />
                </View>
            </View>
            <View>{data && <Text>{data}</Text>}</View>
        </View>
    );
}
