import { useContext } from 'react';
import { useGetProf } from '../Hooks/useGetProf';
import { authContext } from '../Components/authContext';
import { useDelete } from '../Hooks/useDelete';

export const Profile = () => {
  const { data, isLoading, isError, error } = useGetProf();
  const { Logout } = useContext(authContext);
  const { mutation } = useDelete();

  return (
    <section className="container my-5 d-flex justify-content-center">
      <div
        className="card shadow p-4 text-center"
        style={{ maxWidth: '450px', width: '100%' }}
      >
        {isLoading && <p className="text-primary">لطفا منتظر بمانید...</p>}
        {isError && (
          <p className="text-danger">
            {error?.response?.data || 'خطایی رخ داده'}
          </p>
        )}

        {data && (
          <>
            <h3 className="fw-bold mb-3">پروفایل کاربری</h3>
            <hr />

            <div className="text-end mt-3 gap-1 d-flex flex-column">
              <p>
                <span className="fw-bold text-secondary">نام کاربری:</span>{' '}
                {data.name}
              </p>
              <p>
                <span className="fw-bold text-secondary">نقش:</span>{' '}
                {data.typeUser === 'admin' ? 'ادمین' : 'مشتری'}
              </p>
              <p>
                <span className="fw-bold text-secondary">ایمیل:</span>{' '}
                {data.email}
              </p>
              <button
                onClick={() => {
                  window.location.href = '/';
                  Logout();
                }}
                className="btn btn-outline-danger"
              >
                خروج
              </button>
              <button
                onClick={() => {
                  mutation.mutate({ type: 'user', id: data._id });
                  Logout();
                }}
                className="btn btn-outline-danger"
              >
                حذف کامل حساب کاربری
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
