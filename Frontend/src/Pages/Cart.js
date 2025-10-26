import { useDelete } from '../Hooks/useDelete';
import { useGetProduct } from '../Hooks/useGetProduct';
import { usePost } from '../Hooks/usePost';

export const Cart = () => {
  const { data, isError, isLoading, error, refetch } = useGetProduct();
  const { mutation: updateQty } = usePost();
  const { mutation: removeItem } = useDelete();

  const total = data?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQty = (id, type) => {
    updateQty.mutate(
      { type: 'product/quantity', data: { id, type } },
      { onSuccess: () => window.location.reload() }
    );
  };

  const handleDelete = id => {
    removeItem.mutate(
      { type: 'product', id },
      { onSuccess: () => window.location.reload() }
    );
  };

  return (
    <section className="container my-5 cart-container">
      <div className="card shadow-lg rounded-4 overflow-hidden">
        <div className="card-header bg-light">
          <h5 className="mb-0 fw-bold">سبد خرید</h5>
        </div>

        <div className="card-body p-0">
          {isLoading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-2">لطفا منتظر بمانید...</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-4 text-danger">
              <p>خطا در دریافت اطلاعات</p>
              <p>{error?.message}</p>
            </div>
          )}

          {data?.length === 0 && !isLoading && (
            <div className="empty-cart">
              <p>سبد خرید شما خالی است</p>
            </div>
          )}

          {data?.length > 0 && (
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover">
                <thead className="table-light">
                  <tr>
                    <th>محصول</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                    <th>مجموع</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map(item => (
                    <tr key={item._id}>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price.toLocaleString()} تومان</td>
                      <td>
                        {(item.price * item.quantity).toLocaleString()} تومان
                      </td>

                      <td className="d-flex gap-1">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-sm btn-outline-danger rounded-pill"
                          disabled={removeItem.isPending}
                        >
                          حذف
                        </button>

                        <button
                          className="btn btn-sm btn-outline-primary rounded-pill"
                          onClick={() => handleQty(item._id, 'plus')}
                          disabled={updateQty.isPending}
                        >
                          +
                        </button>

                        <button
                          className="btn btn-sm btn-outline-primary rounded-pill"
                          onClick={() => handleQty(item._id, 'min')}
                          disabled={updateQty.isPending}
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {data?.length > 0 && (
          <div className="card-footer d-flex justify-content-between align-items-center bg-light">
            <h5 className="mb-0 fw-bold">
              جمع کل: {total.toLocaleString()} تومان
            </h5>
            <button className="btn btn-success rounded-pill px-4">
              ادامه به پرداخت
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
