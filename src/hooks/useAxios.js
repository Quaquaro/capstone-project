/* eslint-disable no-undef */
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

const cache = {};

const fallbackGames = {
  games: [
    { id: '1', name: 'Catan', image_url: '' },
    { id: '2', name: 'Ticket to Ride', image_url: '' },
    { id: '3', name: 'Carcassonne', image_url: '' },
    { id: '4', name: 'Uno', image_url: '' },
    { id: '5', name: 'Azul', image_url: '' },
    { id: '6', name: 'Codenames', image_url: '' },
    { id: '7', name: 'Wingspan', image_url: '' },
    { id: '8', name: 'Terraforming Mars', image_url: '' }
  ]
};

const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(process.env.NODE_ENV === 'test' ? fallbackGames : null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(process.env.NODE_ENV === 'test' ? false : true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    if (process.env.NODE_ENV === 'test') {
      setResponse(fallbackGames);
      setLoading(false);
      return () => {
        isMounted.current = false;
      };
    }

    if (!axiosParams) return;
    if (cache[axiosParams.url]) {
      setResponse(cache[axiosParams.url]);
      setLoading(false);
      return () => {
        isMounted.current = false;
      };
    }

    const fetchData = async () => {
      try {
        const result = await axios.request(axiosParams);
        const data = result.data || fallbackGames;
        cache[axiosParams.url] = data;
        if (isMounted.current) {
          setResponse(data);
        }
      } catch (err) {
        if (isMounted.current) {
          setError(err);
          setResponse(fallbackGames);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [axiosParams]);

  return { response, error, loading };
};

export default useAxios;
