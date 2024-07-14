import {useCallback, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

export const useBookmarksUpload = () => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)

    const {getAccessTokenSilently, isAuthenticated, isLoading: auth0Loading} = useAuth0();


    const postData = useCallback(async (urls: string[]) => {
        if (auth0Loading || !isAuthenticated) {
            console.log('Auth failed')
            return;
        }
        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.REACT_APP_WORKER_API_AUDIENCE,
                }
            })

            const response = await axios.post(`${process.env.REACT_APP_WORKER_API_URL}bookmarks/upload`,urls, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            return response.data
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }, []);
    return {
        postData,
        loading
    }
}