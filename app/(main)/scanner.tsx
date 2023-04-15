import { View, Heading, VStack, Text } from "native-base";
import CodeBarScanner from "../../components/CodeBarScanner";

export default function ScannerPage() {
    return (
        <View flex={1}>
            <VStack space="3">
                <Heading>Scan Qr Code</Heading>
                <Text>scan le code sur l'invitation</Text>
            </VStack>
            <CodeBarScanner />
        </View>
    );
}
