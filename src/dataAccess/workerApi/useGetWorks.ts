import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

export const useGetWorks = () => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)

    const {getAccessTokenSilently, isAuthenticated, isLoading: auth0Loading} = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            console.log('Auth: ', auth0Loading, isAuthenticated)

            try {
                if (auth0Loading || !isAuthenticated) {
                    throw `Auth failed ${auth0Loading} ${isAuthenticated}`
                }
                if (process.env.REACT_APP_WORKER_API_URL) {
                    const url =`${process.env.REACT_APP_WORKER_API_URL}works`
                    console.log('Yo')
                    const token = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: process.env.REACT_APP_WORKER_API_URL,
                        }
                    })

                    console.log('Token', token)

                    const response = await fetch(url, {
                        cache: 'no-store',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const textData = await response.text();
                    setData(textData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
            setLoading(false)
        };

        void fetchData();
    }, [auth0Loading, isAuthenticated]); // Empty dependency array means it only runs once when the component mounts

    return {
        data,
        loading
    }
}