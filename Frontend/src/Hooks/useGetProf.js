import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// گرفتن پروفایل
export const useGetProf = () => {
  const fetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
      headers: {
        'access-token': localStorage.getItem('token')
      }
    });
    return res.data;
  };

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetch
  });

  return { data, isError, error, isLoading };
};
