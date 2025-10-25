import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// گرفتن کاربر ها
export const useGetUser = () => {
  const fetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        'access-token': localStorage.getItem('token')
      }
    });
    return res.data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetch
  });

  return {
    data,
    isError,
    isLoading,
    error
  };
};
