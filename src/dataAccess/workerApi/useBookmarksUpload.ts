import {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

export const useBookmarksUpload = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {getAccessTokenSilently, isLoading: auth0Loading} = useAuth0();


    const postData = async (urls: string[]) => {
        if (auth0Loading) {
            console.log('Auth loading', auth0Loading)
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Even if isAuthenticated is false, try to get the token
            // This helps on mobile where isAuthenticated might be incorrectly set
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.REACT_APP_WORKER_API_URL, // Match the audience in Auth0Provider
                }
            })

            const response = await axios.post(`${process.env.REACT_APP_WORKER_API_URL}bookmarks/upload`,urls, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            setLoading(false);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'An error occurred during upload');
            setLoading(false);
            throw error;
        }
    }
    return {
        postData,
        loading,
        error
    }
}
