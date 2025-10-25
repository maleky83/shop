import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export const useEdite = () => {
  const fetch = async id => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/shop/${id}`,
      form
    );
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: fetch
  });
  const [form, setForm] = useState();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { handleChange, mutation };
};
