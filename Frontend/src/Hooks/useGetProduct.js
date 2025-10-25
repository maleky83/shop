import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// گرفتن محصولات
export const useGetProduct = () => {
  const fetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product`, {
      headers: {
        'access-token': localStorage.getItem('token')
      }
    });
    return res.data;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['product'],
    queryFn: fetch
  });

  return { data, isError, isLoading, error };
};
