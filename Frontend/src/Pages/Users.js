import { useDelete } from '../Hooks/useDelete';
import { useGetUser } from '../Hooks/useGetUser';
import { useGetProf } from '../Hooks/useGetProf';

export const Users = () => {
  const { data, isLoading, isError } = useGetUser();
  const { mutation } = useDelete();
  const { data: profile } = useGetProf();

  return (
    <section className="container my-5">
      <h3 className="text-center fw-bold mb-4">👤 لیست کاربران</h3>

      <div className="row justify-content-center">
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border mb-3"></div>
            <p>لطفاً منتظر بمانید...</p>
          </div>
        )}

        {data
          ?.filter(item => item.name !== profile?.name)
          .map(item => (
            <div key={item._id} className="col-md-6 col-lg-4 col-sm-10 mb-4">
              <div className="card shadow-lg border-0 rounded-4 p-3 text-center user-card">
                <p className="fw-bold fs-5">اسم: {item.name}</p>
                <p className="text-muted">ایمیل: {item.email}</p>
                <span className="badge bg-primary px-3 py-2 mb-3">
                  {item.typeUser}
                </span>

                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() =>
                    mutation.mutate(
                      { type: 'user', id: item._id },
                      { onSuccess: () => window.location.reload() }
                    )
                  }
                  disabled={mutation.isPending}
                >
                  حذف کاربر
                </button>
              </div>
            </div>
          ))}
      </div>
      {!isLoading && !isError && data?.length === 1 && (
        <div className="alert alert-warning text-center mt-4 fw-bold">
          کاربری برای نمایش وجود ندارد
        </div>
      )}
    </section>
  );
};
