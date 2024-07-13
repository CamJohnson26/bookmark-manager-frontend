import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, user } = useAuth0();

    return (
        user ? <button onClick={() => logout({ logoutParams: { returnTo: process.env.REACT_APP_ORIGIN_URL } })}>
            Log Out
        </button> : null
    );
};

export default LogoutButton;