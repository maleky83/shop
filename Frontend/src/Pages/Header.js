import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../Components/authContext';

export const Header = () => {
  const { isLog, typeUser } = useContext(authContext);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🛒 فروشگاه من
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* 🟦 لینک‌های سمت راست */}
          <ul className="navbar-nav ms-auto">
            {!typeUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  خانه
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/Products">
                محصولات
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">
                درباره ما
              </Link>
            </li>

            {isLog && !typeUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">
                  سبد خرید 🛍
                </Link>
              </li>
            )}
          </ul>

          {/* 🟩 دکمه‌های سمت چپ */}
          <div className="d-flex gap-2">
            {/* اگر لاگین بود */}
            {isLog && (
              <>
                <Link to="/profile" className="btn btn-outline-info">
                  پروفایل
                </Link>

                {typeUser && (
                  <>
                    <Link className="btn btn-outline-success" to="/AddProduct">
                      افزودن محصول
                    </Link>
                    <Link className="btn btn-outline-secondary" to="/Users">
                      مدیریت کاربران
                    </Link>
                  </>
                )}
              </>
            )}

            {/* اگر لاگین نبود */}
            {!isLog && (
              <>
                <Link to="/Sign" className="btn btn-outline-primary">
                  ثبت نام
                </Link>
                <Link to="/Login" className="btn btn-outline-secondary">
                  ورود
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
