import { useAddProduct } from '../Hooks/useAddProduct';

const AddProduct = () => {
  const { handleSubmit, register, onSubmit, errors, mutation } =
    useAddProduct();

  return (
    <section className="container my-5">
      <h2 className="fw-bold text-center mb-4">افزودن محصول جدید</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto shadow p-4 rounded bg-white"
        style={{ maxWidth: '500px' }}
      >
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">نام محصول</label>
          <input {...register('name')} type="text" className="form-control" />
          {errors.name && (
            <p className="text-danger small mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">قیمت (تومان)</label>
          <input
            {...register('price')}
            type="number"
            className="form-control"
          />
          {errors.price && (
            <p className="text-danger small mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* About */}
        <div className="mb-3">
          <label className="form-label">توضیحات</label>
          <input {...register('about')} type="text" className="form-control" />
          {errors.about && (
            <p className="text-danger small mt-1">{errors.about.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">لینک تصویر</label>
          <input {...register('img')} type="text" className="form-control" />
          {errors.img && (
            <p className="text-danger small mt-1">{errors.img.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
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
