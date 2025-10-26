import { Link } from 'react-router-dom';
import { useLog } from '../Hooks/useLog';

const Login = () => {
  const { handleSubmit, errors, onsubmit, register, mutation } = useLog();

  return (
    <section className="container login-container my-5">
      <div className="login-card shadow-lg">
        <h2 className="fw-bold text-center mb-4">ورود به حساب</h2>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <label className="form-label">نام کاربری</label>
            <input
              {...register('name')}
              type="text"
              className="form-control login-input"
            />
            {errors?.name && (
              <p className="error-text">{errors?.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">رمز عبور</label>
            <input
              {...register('password')}
              type="password"
              className="form-control login-input"
            />
            {errors?.password && (
              <p className="error-text">{errors?.password.message}</p>
            )}
          </div>

          <button type="submit" className="btn login-btn w-100">
            ورود
          </button>
        </form>

        {mutation.isError && (
          <p className="error-text">{mutation.error?.response?.data}</p>
        )}
        {mutation.isSuccess && <p className="success-text">خوش آمدید</p>}
        {mutation.isPending && <p className="loading-text">منتظر بمانید...</p>}

        <p className="text-center mt-3">
          ثبت‌نام نکردی؟{' '}
          <Link to="/sign" className="register-link">
            ساخت حساب
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
