import { useDelete } from '../Hooks/useDelete';
import { useGetUser } from '../Hooks/useGetUser';

export const Users = () => {
  // گرفتن داده های کاربران از بک اند
  const { data } = useGetUser();
  const { mutation } = useDelete();

  return (
    <section className="container my-4">
      <h3 className="text-center mb-4">لیست کاربران</h3>
      {data?.map(item => {
        if (item.typeUser === 'customer') {
          return (
            <div
              key={item._id}
              className="card shadow-sm p-3 mx-auto text-center mb-3"
              style={{ maxWidth: '500px' }}
            >
              <p className="fw-bold">{item.name}</p>
              <p className="text-muted">{item.email}</p>
              <p className="badge bg-info text-dark">مشتری</p>

              <button
                className="btn btn-outline-danger mt-2"
                onClick={() => mutation.mutate({ type: 'user', id: item._id })}
              >
                حذف کاربر
              </button>
            </div>
          );
        }
      })}
    </section>
  );
};
