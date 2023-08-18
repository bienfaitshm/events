/** @format */

import * as React from "react";

import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";

const clientId =
    "720203986210-edqm7jdvoau0h5m1ipe74fsf1p7eempp.apps.googleusercontent.com";
const iosClientId =
    "720203986210-d0l1j0gqkj27b1u0doppg4pp9sq0mn2k.apps.googleusercontent.com";
const androidClientId =
    "720203986210-tr8m0r61nvc43pf8h86v8tuo1j60h33b.apps.googleusercontent.com";

const FBID = "524264546141594";

export const useGoogleAuthProviders = () => {
    const [request, responce, promptAsync] = Google.useAuthRequest({
        clientId,
        iosClientId,
        androidClientId,
    });
    React.useEffect(() => {
        if (responce?.type === "success") {
            const accessToken = responce.authentication?.accessToken || "";
            const tokenType = responce.authentication?.tokenType || "bearer";
            console.log(
                "Google",
                JSON.stringify(responce.authentication, null, 4)
            );
        }
    }, [responce]);

    return () => promptAsync();
};

export const useFacebookAuthProviders = () => {
    const [FBrequest, FBresponse, FBpromptAsync] = Facebook.useAuthRequest({
        clientId: FBID,
        responseType: ResponseType.Token,
    });

    React.useEffect(() => {
        if (FBresponse?.type === "success") {
            const access_token = FBresponse.authentication?.accessToken || "";
            const token_type = "Bearer";
            console.log("Facebook", JSON.stringify(FBresponse, null, 4));
        }
    }, [FBresponse]);

    return () => FBpromptAsync();
};
