import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@mui/material";

const LoginButton = () => {
    const { loginWithRedirect, user } = useAuth0();
    return user?.nickname ? null : (
        <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => loginWithRedirect()}
            sx={{
                padding: '12px 24px',
                fontSize: '1.1rem',
                fontWeight: 600,
                minHeight: '48px',
                alignSelf: 'center'
            }}
        >
            Log In
        </Button>
    );
};

export default LoginButton;
