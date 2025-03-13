import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.exchangerate-api.com/v4/latest/${currency}`, 
                    { signal: abortController.signal }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch currency data");
                }
                const result = await response.json();
                setData(result.rates);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching currency data:", error);
                }
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
