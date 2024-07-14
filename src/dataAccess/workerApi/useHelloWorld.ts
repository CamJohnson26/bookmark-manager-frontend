import {useEffect, useState} from "react";

export const useHelloWorld = () => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (process.env.REACT_APP_WORKER_API_URL) {
                    const response = await fetch(process.env.REACT_APP_WORKER_API_URL, {
                        cache: 'no-store',
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
    }, []); // Empty dependency array means it only runs once when the component mounts

    return {
        data,
        loading
    }
}