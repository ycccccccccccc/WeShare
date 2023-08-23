import { useState } from "react";
import Cookies from "js-cookie";

function useGiveRating() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const accessToken = Cookies.get("accessToken");
  const giveRating = async (id, ratingValue) => {
    setIsLoading(true);
    setError(null);

    const url = `/${id}/rating`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorize: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        rating: ratingValue,
      }),
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to give rating.");
      }

      setResponse(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    response,
    giveRating,
  };
}

export default useGiveRating;
