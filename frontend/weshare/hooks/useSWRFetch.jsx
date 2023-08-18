import useSWR from 'swr';
import axios from 'axios';


const fetcher = (url) => axios.get(url).then((res) => res.data);

/**
 * 自定義 hook: useSWRfetch
 * @param {string} url - API 的 URL
 * @param {object} options - SWR 的額外配置選項
 */
function useSWRFetch(url, options = {}) {
  const { data, error, ...rest } = useSWR(url, fetcher, options);

  return {
    data,
    error,
    isLoading: !error && !data,
    isError: error,
    ...rest
  };
}

export default useSWRFetch;
