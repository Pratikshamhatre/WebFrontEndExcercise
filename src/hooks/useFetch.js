// hooks/useApi.js
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useFetch(
  apiFunctionOrThunk,
  dependencies = [],
  useThunk = false,
  shouldFetch = true
) {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch) return; 

    let mounted = true;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        let result;

        if (useThunk) {
          result = await dispatch(apiFunctionOrThunk()).unwrap();
        } else {
          result = await apiFunctionOrThunk();
        }

        if (mounted) setData(result);
      } catch (err) {
        if (mounted) setError(err?.message || "Failed to fetch API");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();

    return () => (mounted = false);
  }, [...dependencies, shouldFetch]); // ⬅ shouldFetch added as dependency

  return { data, loading, error };
}
