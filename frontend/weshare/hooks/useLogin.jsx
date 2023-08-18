import axios from "axios";
import { setCookie } from "nookies";
import { useState } from "react";

const useLogIn = () => {
  const [error, setError] = useState(null);
  const logIn = async (phone, password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, {
        provider: "native",
        phone,
        password
      });
      // eslint-disable-next-line camelcase
      const { access_token, user } = response.data.data;
      setCookie(null, "accessToken", access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
      setCookie(null, "userId", user.id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });

      window.location.href = "/"; // 登入成功後，導向首頁或其他頁面
    } catch (err) {
      setError(err.response?.data?.message || "登入失敗");
    }
  };

  return { logIn, error };
};

export default useLogIn;