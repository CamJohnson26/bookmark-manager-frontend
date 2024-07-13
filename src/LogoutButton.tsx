import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@mui/material";

const LogoutButton = () => {
    const { logout, user } = useAuth0();

    return (
        user ? <Button onClick={() => logout({ logoutParams: { returnTo: process.env.REACT_APP_ORIGIN_URL } })}>
            Log Out
        </Button> : null
    );
};

export default LogoutButton;