import React from "react";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { View, Text, Button, VStack } from "native-base";

const Loader = () => {
    return (
        <View flex={1} justifyContent="center" alignItems="center">
            <Text>Loading</Text>
        </View>
    );
};

const ErrorView: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <View flex={1} justifyContent="center" alignItems="center">
            <VStack space={3}>
                <Text>{error.message}</Text>
                <Button onPress={resetErrorBoundary}>Reasayer</Button>
            </VStack>
        </View>
    );
};

export default function SuspenseQueryFetch({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary onReset={reset} FallbackComponent={ErrorView}>
                    <React.Suspense fallback={<Loader />}>
                        {children}
                    </React.Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
}
