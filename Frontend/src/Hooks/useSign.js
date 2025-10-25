import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { usePost } from './usePost';
export const useSign = () => {
  // فرستادن فرم ثبت نام
  const { mutation } = usePost();
  const schema = yup.object({
    name: yup
      .string('لطفا نام کاربری خود را درست وارد کنید')
      .required('اجباری'),
    password: yup
      .string('لطفا رمز عبور درست وارد کنید')
      .min(5, 'بیشتر از 5رقمی باشه')
      .required('اجباری'),
    email: yup.string('لطفا ایمیل درست وارد کنید').required('اجباری'),
    typeUser: yup.string('لطفا نوع کاربری خود را وارد کنید').required('اجباری')
  });

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    mutation.mutate({ data: data, type: 'sign' });
  };
  return { handleSubmit, errors, register, onSubmit, mutation };
};
