import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";

export default function useQuery(resource, tag) {
  const { request, storeTag } = useApi();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function query() {
    setLoading(true);
    setError(null);

    try {
      const response = await request(resource);
      setData(response);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (tag) {
      storeTag(tag, query);
    }
    query();
  }, []);

  return { data, refetch: query, loading, error };
}
