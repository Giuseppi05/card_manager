import { useState, useEffect } from "react";

export interface UseFetchReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useFetch<T = any>(url: string | null): UseFetchReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        if (!url) return;
        
        setLoading(true);
        setError(null);

        fetch(url)
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || `Error ${response.status}`);
                }
                return response.json();
            })
            .then(setData)
            .catch((err) => setError(err.message || "Error desconocido"))
            .finally(() => setLoading(false));

    }, [url, trigger]);

    const refetch = () => setTrigger(prev => prev + 1);

    return {
        data,
        loading,
        error,
        refetch
    };
}