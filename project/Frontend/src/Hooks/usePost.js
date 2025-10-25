import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../Components/authContext';

// فرستادن هر نوع پستی به بک اند
export const usePost = () => {
  const { Log } = useContext(authContext);
  const fetch = async obj => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/${obj.type}`,
      obj.data,
      {
        headers: {
          'access-token': localStorage.getItem('token')
        }
      }
    );
    if (res.data.token) {
      Log(res.data.token, res.data.typeUser);
    }
    return res.data;
  };
  const mutation = useMutation({
    mutationFn: fetch
  });
  return { mutation };
};
