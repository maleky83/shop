import { useContext } from 'react';
import { useGetProf } from '../Hooks/useGetProf';
import { authContext } from '../Components/authContext';
import { useDelete } from '../Hooks/useDelete';

export const Profile = () => {
  const { data, isLoading, isError, error } = useGetProf();
  const { Logout } = useContext(authContext);
  const { mutation } = useDelete();
  return (
    <section className="container profile-container">
      <div className="card profile-card text-center">
        {isLoading && <p className="loading-text">لطفا منتظر بمانید...</p>}
        {isError && (
          <p className="error-text">
            {error?.response?.data || 'خطایی رخ داده'}
          </p>
        )}

        {data && (
          <>
            <h3 className="profile-title">پروفایل کاربری</h3>
            <hr />

            <div className="profile-info">
              <p>
                <span>نام کاربری:</span> {data.name}
              </p>
              <p>
                <span>نقش:</span>{' '}
                {data.typeUser === 'admin' ? 'ادمین' : 'مشتری'}
              </p>
              <p>
                <span>ایمیل:</span> {data.email}
              </p>
            </div>

            <div className="d-flex flex-column gap-2 mt-3">
              <button
                onClick={() => {
                  Logout();
                  window.location.href = '/';
                }}
                className="btn btn-outline-primary profile-btn"
              >
                خروج از حساب
              </button>

              <button
                onClick={() => {
                  mutation.mutate({ type: 'user', id: data._id });
                  Logout();
                }}
                className="btn btn-outline-danger profile-btn"
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

export default Profile;
