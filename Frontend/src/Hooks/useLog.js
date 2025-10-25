import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { usePost } from './usePost';

// ثبت پست ورود کاربر
export const useLog = () => {
  const { mutation } = usePost();
  const schema = yup.object({
    name: yup
      .string('لطفا نام کاربری خود را درست وارد کنید')
      .required('اجباری'),
    password: yup.string('لطفا رمز عبور درست وارد کنید').required('اجباری')
  });
  const {
    formState: { errors },
    handleSubmit,
    reset,
    register
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onsubmit = data => {
    mutation.mutate({ data: data, type: 'log' });
  };

  return { handleSubmit, onsubmit, register, errors, mutation };
};
