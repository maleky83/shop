import { useAddProduct } from '../Hooks/useAddProduct';

const AddProduct = () => {
  const { handleSubmit, register, onSubmit, errors, mutation } =
    useAddProduct();

  return (
    <section className="container my-5 add-product-container">
      <h2 className="fw-bold text-center mb-4">افزودن محصول جدید</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto shadow-lg p-4 rounded-4 bg-white add-product-form"
        style={{ maxWidth: '500px' }}
      >
        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-bold">نام محصول</label>
          <input
            {...register('name')}
            type="text"
            className="form-control rounded-pill"
          />
          {errors.name && (
            <p className="text-danger small mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label fw-bold">قیمت (تومان)</label>
          <input
            {...register('price')}
            type="number"
            className="form-control rounded-pill"
          />
          {errors.price && (
            <p className="text-danger small mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* About */}
        <div className="mb-3">
          <label className="form-label fw-bold">توضیحات</label>
          <input
            {...register('about')}
            type="text"
            className="form-control rounded-pill"
          />
          {errors.about && (
            <p className="text-danger small mt-1">{errors.about.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label fw-bold">لینک تصویر</label>
          <input
            {...register('img')}
            type="text"
            className="form-control rounded-pill"
          />
          {errors.img && (
            <p className="text-danger small mt-1">{errors.img.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 btn-lg rounded-pill mt-3 add-btn"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'در حال افزودن...' : 'افزودن محصول'}
          {mutation.isSuccess && (window.location.href = '/')}
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
