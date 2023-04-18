import React from "react";
import { View, Heading, VStack, Text } from "native-base";
import CodeBarScanner, {
    BarCodeScannedCallback,
} from "../../components/CodeBarScanner";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";
import { useScanQrCode } from "../../hooks/apis";

type InfoUserScanned = {
    url: string;
};

const InfoUserScanned: React.FC<InfoUserScanned> = ({ url }) => {
    const { data } = useScanQrCode(url);
    return (
        <View>
            <Text>{JSON.stringify(data, null, 4)}</Text>
        </View>
    );
};

export default function ScannerPage() {
    const [url, setUrl] = React.useState<undefined | string>(undefined);

    const handlerScanAgain = React.useCallback(() => {
        setUrl(undefined);
    }, []);

    const handlerScan: BarCodeScannedCallback = React.useCallback(
        ({ data }) => {
            setUrl(data);
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
            <SuspenseQueryFetch>
                <View>{url && <InfoUserScanned url={url} />}</View>
            </SuspenseQueryFetch>
        </View>
    );
}
