import { Link } from 'react-router-dom';
import { useGetShop } from '../Hooks/useGetShop';
import { useContext } from 'react';
import { authContext } from '../Components/authContext';

export const Products = () => {
  const { data, error, isError, isLoading } = useGetShop();
  const { typeUser } = useContext(authContext);

  return (
    <section className="container products-container">
      <h2 className="products-title">تمام محصولات</h2>

      {isLoading && (
        <div className="loading-box">
          <div className="spinner-border mb-3" role="status"></div>
          <p>لطفا منتظر بمانید...</p>
        </div>
      )}

      {isError && (
        <div className="alert alert-danger text-center">
          {error?.response?.data || 'خطایی رخ داده است'}
        </div>
      )}

      {data?.length === 0 && !isLoading && !isError && (
        <div className="alert alert-warning text-center">محصولی وجود ندارد</div>
      )}

      <div className="row g-4">
        {data?.map(p => (
          <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card product-card h-100 text-center">
              <img
                src={p.img}
                className="card-img-top product-img"
                alt={p.name}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{p.name}</h5>
                <p className="card-text price-text">
                  {p.price.toLocaleString()} تومان
                </p>

                <Link
                  to={`/Details/${p._id}`}
                  className="btn btn-outline-primary mt-auto w-100 product-btn"
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

export default Products;
