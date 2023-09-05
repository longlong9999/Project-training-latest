import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPostsHandler = async (url, requestBody) => {
    setIsLoading(true);
    setError(null);
    const requestUrl = url ?? requestConfig.url;
    const requestOptios = {
      method: requestConfig.method,
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestBody ? JSON.stringify(requestBody) : requestConfig.body ? JSON.stringify(requestConfig.body) : null
    }
    try {
      const response = await fetch(requestUrl, requestOptios);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log('data', data);

      applyData(data);
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    fetchPostsHandler
  };
};

export default useHttp;
