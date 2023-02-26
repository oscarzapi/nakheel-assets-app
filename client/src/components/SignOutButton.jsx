import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "state";

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();
    const dispatch = useDispatch();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/dashboard" // redirects the top level app after logout
            }).then(() => {
                dispatch(logout())
            });
        }
    }

    return (
        <Button variant="secondary" onClick={() => handleLogout("popup")}>Sign out</Button>
    );
}