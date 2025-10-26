export const About = () => {
  return (
    <section className="container my-5 text-center about-container">
      <h2 className="fw-bold mb-3">درباره فروشگاه ما</h2>
      <p className="text-muted mb-4 fs-5">
        فروشگاه ما با هدف ارائه بهترین محصولات با کیفیت بالا و قیمت مناسب ایجاد
        شده است.
      </p>
      <div className="img-wrapper mx-auto shadow-lg rounded-4">
        <img
          src="https://files.virgool.io/upload/users/842318/posts/triowpolnmxy/xq9kfndte8ii.jpeg?width=1024"
          alt="About us"
          className="img-fluid about-img"
        />
      </div>
    </section>
  );
};
