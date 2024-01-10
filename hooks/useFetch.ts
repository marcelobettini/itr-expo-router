import { useEffect, useState } from "react";
const base_url = "https://jsonplaceholder.typicode.com/";
interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

function useFetch<T>(endpoint: string): UseFetchResult<T> {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(base_url + endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Request Error");
        return res.json();
      })
      .then((resOk) => setData(resOk))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return { data, isLoading, error };
}
export default useFetch;
