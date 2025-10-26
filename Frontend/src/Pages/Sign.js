import { Link } from 'react-router-dom';
import { useSign } from '../Hooks/useSign';

export const Sign = () => {
  const { errors, handleSubmit, onSubmit, register, mutation } = useSign();

  return (
    <section className="container sign-container">
      <h2 className="text-center sign-title">ثبت نام</h2>

      <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">نام</label>
          <input {...register('name')} type="text" className="form-control" />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
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
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">ایمیل</label>
          <input {...register('email')} type="text" className="form-control" />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
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
          className="btn btn-primary w-100 sign-btn"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'در حال ثبت نام...' : 'ثبت نام'}
        </button>
      </form>

      {mutation.isError && (
        <p className="error-text text-center mt-3">
          {mutation.error.response?.data}
        </p>
      )}

      <p className="text-center mt-3">
        قبلاً ثبت نام کرده‌اید؟{' '}
        <Link to="/login" className="link-login">
          ورود
        </Link>
      </p>
    </section>
  );
};

export default Sign;
