/** @format */

import React from "react";
import useProtectedRoute from "../hooks/auth/protected";
import { useStoreAuth } from "../hooks/auth/accounts";
const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = (
    props
) => {
    const isAuthenticated = useStoreAuth((state) => state.isAuthenticated);
    useProtectedRoute(isAuthenticated);
    return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthenticationProvider;
