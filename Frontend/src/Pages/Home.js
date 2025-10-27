import { data, Link } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../Components/authContext';
import { useGetShop } from '../Hooks/useGetShop';
import { usePost } from '../Hooks/usePost';

const Home = () => {
  const { data: products, error, isError, isLoading } = useGetShop();
  const { isLog, typeUser } = useContext(authContext);
  const { mutation } = usePost();

  return (
    <>
      {!isLog && (
        <div className="alert alert-danger text-center m-3 fw-bold animate-fade">
          لطفاً اول وارد حساب کاربری شوید
        </div>
      )}

      {/* HERO SECTION */}
      <section className="py-5 text-center hero-home">
        <div className="container">
          <h1 className="fw-bold mb-3 hero-title">
            به فروشگاه ما خوش آمدید 🛍️
          </h1>
          <p className="text-light fs-5">
            جدیدترین محصولات با بهترین قیمت و ارسال سریع
          </p>
          <Link to="/Products" className="btn hero-btn btn-lg px-4 mt-2">
            مشاهده محصولات
          </Link>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">محصولات پرفروش</h2>

        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border mb-3"></div>
            <p>لطفاً منتظر بمانید...</p>
          </div>
        )}

        {isError && (
          <div className="alert alert-danger text-center">
            {error?.response?.data || 'خطایی رخ داده است'}
          </div>
        )}

        <div className="row g-4">
          {products?.map(p => (
            <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card product-card shadow-sm text-center animate-up">
                <div className="card-img-wrapper">
                  <img src={p.img} className="card-img-top" alt={p.name} />
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{p.name}</h5>
                  <p className="text-muted">{p.price.toLocaleString()} تومان</p>

                  {isLog ? (
                    <Link
                      to={`/details/${p._id}`}
                      className="btn btn-outline-primary mt-auto w-100 product-btn"
                    >
                      مشاهده جزئیات
                    </Link>
                  ) : (
                    <Link
                      onClick={() => {
                        window.location.href = '/';
                      }}
                      className="btn btn-outline-primary mt-auto w-100 product-btn"
                    >
                      مشاهده جزئیات
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isLoading && !isError && products?.length === 0 && (
          <div className="alert alert-warning text-center mt-4 fw-bold">
            محصولی برای نمایش وجود ندارد
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
