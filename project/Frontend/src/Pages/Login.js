import { Link } from 'react-router-dom';
import { useLog } from '../Hooks/useLog';

const Login = () => {
  const { handleSubmit, errors, onsubmit, register, mutation } = useLog();
  return (
    <section className="container my-5">
      <h2 className="fw-bold text-center mb-4">ورود</h2>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="mx-auto"
        style={{ maxWidth: '400px' }}
      >
        <div className="mb-3">
          <label className="form-label">نام کاربری</label>
          <input
            {...register('name')}
            type="text"
            name="name"
            className="form-control"
          />
          {errors?.name && (
            <p className="text-danger">{errors?.name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">رمز عبور</label>
          <input
            {...register('password')}
            type="password"
            name="password"
            className="form-control"
          />
          {errors?.password && (
            <p className="text-danger">{errors?.password.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          ورود
        </button>
      </form>
      {mutation.isError && (
        <p className="text-danger">{mutation.error?.response?.data}</p>
      )}
      {mutation.isSuccess && <p className="text-success">خوش آمدید</p>}
      {mutation.isPending && <p className="text-secondary">منتظر بمانید</p>}
      <p>
        اگر ثبت نام نکردید لطفا روی <Link to="/sign">ثبت نام</Link> کلیک کنید
      </p>
    </section>
  );
};

export default Login;
