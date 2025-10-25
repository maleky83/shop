import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// گرفتن محصولات
export const useGetShop = () => {
  const fetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/shop`, {
      headers: {
        'access-token': localStorage.getItem('token')
      }
    });
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['shop'],
    queryFn: fetch
  });

  return { data, isLoading, isError, error };
};
