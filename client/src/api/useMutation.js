import { useState } from "react";
import { useApi } from "./ApiContext";

export default function useMutation(method, resource, invalidTags) {
  const { request, invalidateTags } = useApi();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function mutate(body) {
    setLoading(true);
    setError(null);
    const options = {
      method,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await request(resource, options);
      setData(response);
      invalidateTags(invalidTags);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { mutate, data, loading, error };
}
