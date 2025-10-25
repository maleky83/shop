import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { usePost } from './usePost';

// فرستادن فرم افزودن محصول
export const useAddProduct = () => {
  const { mutation } = usePost();
  const schema = yup.object({
    name: yup.string('رشته باشه').required('اجباری'),
    price: yup
      .number('عدد باشه')
      .min(9999, 'بیشتر از 10 هزار ')
      .required('اجباری'),
    about: yup.string().required('اجباری'),
    img: yup.string('لینک باشه').required('اجباری')
  });

  const {
    handleSubmit: handleSubmit,
    formState: { errors },
    register: register,
    reset: reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    mutation.mutate({ data: data, type: 'shop' });
    reset();
  };

  return {
    errors,
    register,
    handleSubmit,
    reset,
    onSubmit,
    mutation
  };
};
