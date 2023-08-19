/** @format */

import React from "react";
import { View, Heading, VStack } from "native-base";
import {
    Button,
    Dialog,
    CheckBox,
    ListItem,
    Avatar,
    Text,
    Icon,
} from "@rneui/themed";
import CodeBarScanner, {
    BarCodeScannedCallback,
} from "../../components/CodeBarScanner";
import SuspenseQueryFetch from "../../containers/SuspenseQueryFetch";
import { useScanQrCode } from "../../hooks/apis/fetch";
import { TGuest } from "../../services/apis/types";

type InfoUserScanned = {
    url: string;
};

const InfoUserScanned: React.FC<InfoUserScanned> = ({ url }) => {
    const { data } = useScanQrCode<TGuest>(url);
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View>
                <Icon
                    color="green"
                    size={70}
                    name="checkmark-circle-outline"
                    type="ionicon"
                />
            </View>
            <Text style={{ fontSize: 14 }}>Bienvenu(e) à notre mariage</Text>
            <Text h3>
                {data?.first_name}{" "}
                {data?.second_name ? `et ${data.second_name}` : ""}
            </Text>
            <Text h4>Place: {data?.place}</Text>
        </View>
    );
};

const ShowGuestInfo: React.FC<{ url: string; setUrl(): void }> = ({
    url,
    setUrl,
}) => {
    return (
        <Dialog isVisible={Boolean(url)} onBackdropPress={setUrl}>
            {/* <Dialog.Title title="Dialog Title" /> */}
            <SuspenseQueryFetch>
                <View>{url && <InfoUserScanned url={url} />}</View>
            </SuspenseQueryFetch>
        </Dialog>
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
                <Text>scan le code sur l'invitation</Text>
            </VStack>
            <View mt="10" justifyContent="center" alignItems="center">
                <View h={300} w={300} rounded="md">
                    <CodeBarScanner
                        onScanAgain={handlerScanAgain}
                        onBarCodeScanned={handlerScan}
                    />
                </View>
            </View>
            {url && <ShowGuestInfo setUrl={handlerScanAgain} url={url} />}
        </View>
    );
}
