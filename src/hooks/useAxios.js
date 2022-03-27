import axios from 'axios';
import { useEffect, useState } from 'react';
axios.defaults.baseURL = 'https://api.boardgameatlas.com';

const cache = {};

const useAxios = (axiosParams) => {
  if (!axiosParams) return;
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    if (cache[axiosParams.url]) {
      const data = cache[axiosParams.url];
      setResponse(data);
      setLoading(false);
    } else {
      try {
        const result = await axios.request(params);
        cache[axiosParams.url] = result.data;
        setResponse(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { response, error, loading };
};
export default useAxios;
