import { Link, useParams } from 'react-router-dom';
import { useDelete } from '../Hooks/useDelete';
import { useGetShop } from '../Hooks/useGetShop';
import { usePost } from '../Hooks/usePost';
import { useContext } from 'react';
import { authContext } from '../Components/authContext';
import { useEdite } from '../Hooks/useEdite';

export const Details = () => {
  const { handleChange, mutation: edit } = useEdite();
  const { typeUser } = useContext(authContext);
  const { mutation } = usePost();
  const { mutation: deleted } = useDelete();
  const { data } = useGetShop();
  const { id } = useParams();
  const product = data?.find(name => name._id === id);

  return (
    <section className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product?.img}
            alt={product?.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          {!typeUser && (
            <>
              <h2 className="fw-bold mb-3">{product?.name}</h2>
              <p className="text-muted mb-3">{product?.price} تومان</p>
              <p>{product?.about}</p>
              <Link
                onClick={() => {
                  mutation.mutate({ data: product, type: 'product' });
                }}
                to={'/Cart'}
                className="btn btn-primary mt-3"
              >
                افزودن به سبد خرید
              </Link>
            </>
          )}
          {typeUser && (
            <>
              <form>
                <label className="form-label">اسم</label>
                <input
                  name="name"
                  defaultValue={product?.name}
                  onChange={handleChange}
                  className="form-control"
                />

                <label className="form-label">قیمت</label>
                <input
                  name="price"
                  defaultValue={product?.price}
                  type="number"
                  onChange={handleChange}
                  className="form-control"
                />

                <label className="form-label">لینک عکس</label>
                <input
                  name="img"
                  defaultValue={product?.img}
                  onChange={handleChange}
                  className="form-control"
                />

                <label className="form-label">توضیحات</label>
                <input
                  name="about"
                  defaultValue={product?.about}
                  onChange={handleChange}
                  className="form-control"
                />

                <Link
                  className="btn btn-outline-success w-100 mt-3"
                  onClick={() => {
                    edit.mutate(product._id);
                  }}
                >
                  ویرایش محصول
                </Link>
                <Link
                  className="btn btn-outline-danger w-100 mt-3"
                  onClick={() => {
                    deleted.mutate({ type: 'shop', id: product._id });
                    window.location.href = '/';
                  }}
                >
                  حذف محصول
                </Link>
              </form>
              {edit.isError && (
                <p className="text-danger m-3">{edit.error.response?.data}</p>
              )}
              {edit.isSuccess && (window.location.href = '/')}
              {deleted.isError && (
                <p className="text-danger m-3">
                  {deleted.error.response?.data}
                </p>
              )}
              <p></p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
