import { Link } from 'react-router-dom';
import { useGetShop } from '../Hooks/useGetShop';
import { useContext } from 'react';
import { authContext } from '../Components/authContext';

export const Products = () => {
  const { data, error, isError, isLoading } = useGetShop();
  const { typeUser } = useContext(authContext);

  return (
    <section className="container my-5">
      <h2 className="fw-bold text-center mb-4">تمام محصولات</h2>

      {/* موقع لودینگ */}
      {isLoading && (
        <div className="text-center py-5">
          <div className="spinner-border mb-3" role="status"></div>
          <p>لطفا منتظر بمانید...</p>
        </div>
      )}

      {/* خطاها */}
      {isError && (
        <div className="alert alert-danger text-center">
          {error?.response?.data || 'خطایی رخ داده است'}
        </div>
      )}

      {/* خالی بودن */}
      {data?.length === 0 && !isLoading && !isError && (
        <div className="alert alert-warning text-center">محصولی وجود ندارد</div>
      )}

      {/* لیست محصولات */}
      <div className="row g-4">
        {data?.map(p => (
          <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm text-center">
              <img src={p.img} className="card-img-top" alt={p.name} />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{p.name}</h5>
                <p className="card-text text-muted">
                  {p.price.toLocaleString()} تومان
                </p>

                <Link
                  to={`/Details/${p._id}`}
                  className="btn btn-outline-primary mt-auto w-100"
                >
                  {!typeUser ? 'مشاهده جزئیات' : 'ویرایش'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
