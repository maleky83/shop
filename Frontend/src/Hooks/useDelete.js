import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
// درخواست حذف برای هر کاری
export const useDelete = () => {
  const funcDelete = async obj => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/${obj.type}/${obj.id}`
    );
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: funcDelete
  });

  return { mutation };
};
