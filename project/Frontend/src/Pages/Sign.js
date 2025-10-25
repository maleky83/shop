import { Link } from 'react-router-dom';
import { useSign } from '../Hooks/useSign';

export const Sign = () => {
  const { errors, handleSubmit, onSubmit, register, mutation } = useSign();

  return (
    <section className="container my-5">
      <h2 className="fw-bold text-center mb-4">ثبت نام</h2>

      <form
        className="mx-auto"
        style={{ maxWidth: '400px' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">نام</label>
          <input {...register('name')} type="text" className="form-control" />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">رمز عبور</label>
          <input
            {...register('password')}
            type="password"
            className="form-control"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">ایمیل</label>
          <input {...register('email')} type="text" className="form-control" />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        {/* User Type */}
        <div className="mb-3">
          <label className="form-label">نوع کاربر</label>
          <select {...register('typeUser')} className="form-select">
            <option value="customer">مشتری</option>
            <option value="admin">ادمین</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'در حال ثبت نام...' : 'ثبت نام'}
        </button>
      </form>

      {/* Mutation States */}
      {mutation.isError && (
        <p className="text-danger mt-3">{mutation.error.response?.data}</p>
      )}
      <p>
        اگر ثبت نام کردید لطفا روی <Link to="/login">ورود</Link> کلیک کنید
      </p>
    </section>
  );
};

export default Sign;
