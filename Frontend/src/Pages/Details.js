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
  const { mutation: add } = usePost();
  const { mutation: deleted } = useDelete();
  const { data } = useGetShop();
  const { id } = useParams();
  const product = data?.find(p => p._id === id);

  return (
    <section className="container my-5 details-container">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="img-wrapper shadow-lg rounded">
            <img
              src={product?.img}
              alt={product?.name}
              className="img-fluid details-img"
            />
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center">
          {!typeUser && (
            <div className="product-info">
              <h2 className="fw-bold mb-3">{product?.name}</h2>
              <p className="text-muted fs-5 mb-3">
                {product?.price.toLocaleString()} تومان
              </p>
              <p className="mb-3">{product?.about}</p>
              <Link
                onClick={() =>
                  add.mutate(
                    { data: product, type: 'product' },
                    {
                      onSuccess: () => (window.location.href = '/cart')
                    }
                  )
                }
                className="btn btn-primary btn-lg mt-3 details-btn"
              >
                افزودن به سبد خرید
              </Link>
            </div>
          )}

          {typeUser && (
            <form className="admin-form shadow-sm rounded p-4">
              <label className="form-label mt-2">اسم</label>
              <input
                name="name"
                defaultValue={product?.name}
                onChange={handleChange}
                className="form-control rounded-pill"
              />

              <label className="form-label mt-2">قیمت</label>
              <input
                name="price"
                defaultValue={product?.price}
                type="number"
                onChange={handleChange}
                className="form-control rounded-pill"
              />

              <label className="form-label mt-2">لینک عکس</label>
              <input
                name="img"
                defaultValue={product?.img}
                onChange={handleChange}
                className="form-control rounded-pill"
              />

              <label className="form-label mt-2">توضیحات</label>
              <textarea
                name="about"
                defaultValue={product?.about}
                onChange={handleChange}
                className="form-control rounded-pill"
                rows={3}
              />

              <div className="d-flex flex-column gap-2 mt-3">
                <Link
                  className="btn btn-outline-success w-100"
                  onClick={() =>
                    edit.mutate(product._id, {
                      onSuccess: () => window.location.reload()
                    })
                  }
                >
                  {edit.isPending ? 'درحال ویرایش' : 'ویرایش محصول'}
                </Link>
                <Link
                  className="btn btn-outline-danger w-100"
                  onClick={() => {
                    deleted.mutate(
                      { type: 'shop', id: product._id },
                      {
                        onSuccess: () => (window.location.href = '/products')
                      }
                    );
                  }}
                >
                  {deleted.isPending ? 'درحال حذف...' : 'حذف محصول'}
                </Link>
              </div>

              {edit.isError && (
                <p className="text-danger mt-2">{edit.error.response?.data}</p>
              )}

              {deleted.isError && (
                <p className="text-danger mt-2">
                  {deleted.error.response?.data}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
