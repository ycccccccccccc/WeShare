/* eslint-disable no-shadow */
import { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const useCreateOrder = () => {
  const [isLoading1, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const accessToken = Cookies.get("accessToken");

  const createOrder = async (itemId, quantity) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/${itemId}`, {
        quantity
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });

      setOrder(response.data.order);
    } catch (error) {
      setError(error.response?.data?.message || "Could not create order");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading1,
    error,
    order,
    createOrder
  };
};

export default useCreateOrder;
