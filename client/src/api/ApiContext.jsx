import { createContext, useContext, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export const API = "http://localhost:3000";
const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [tags, setTags] = useState({});

  const headers = { "Content-Type": "application/json" };
  const { token } = useAuth();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  async function request(resource, options) {
    const response = await fetch(API + resource, {
      ...options,
      headers,
    });
    const isJson = /json/.test(response.headers.get("Content-Type"));
    const result = isJson ? await response.json() : undefined;
    if (!response.ok) throw Error(result?.message ?? "Something went wrong with request");
    return result;
  }

  function storeTag(tag, query) {
    setTags({ ...tags, [tag]: query });
  }

  function invalidateTags(tagsToInvalidate) {
    tagsToInvalidate.forEach((tag) => {
      const query = tags[tag];
      if (query) query();
    });
  }

  const value = { request, storeTag, invalidateTags };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within the provider");
  return context;
}
