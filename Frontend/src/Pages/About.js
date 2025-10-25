import { useContext } from 'react';
import { authContext } from '../Components/authContext';

export const About = () => {
  return (
    <section className="container my-5 text-center">
      <h2 className="fw-bold mb-3">درباره فروشگاه ما</h2>
      <p className="text-muted mb-4">
        فروشگاه ما با هدف ارائه بهترین محصولات با کیفیت بالا و قیمت مناسب ایجاد
        شده است.
      </p>
      <img
        src="https://sorinsport.com/wp-content/uploads/IMG_8066-600x600.jpg"
        alt="About us"
        className="img-fluid rounded shadow-sm"
      />
    </section>
  );
};
