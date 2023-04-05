import React from "react";
import { useSegments, useRouter } from "expo-router";

export default function useProtectedRoute(authenticated: boolean = false) {
    const segments = useSegments();
    const router = useRouter();

    React.useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";
        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !authenticated &&
            !inAuthGroup
        ) {
            // Redirect to the sign-in page.
            router.replace("/welcome");
        } else if (authenticated && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace("/");
        }
    }, [authenticated, segments]);
}
