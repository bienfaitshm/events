import React from "react";
import useAuthentication from "../hooks/useAuthentication";
import useProtectedRoute from "../hooks/useProtected";

const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = (
    props
) => {
    const { isAuthenticated } = useAuthentication();
    useProtectedRoute(isAuthenticated);
    return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthenticationProvider;
