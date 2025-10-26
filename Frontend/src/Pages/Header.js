import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../Components/authContext';

export const Header = () => {
  const { isLog, typeUser } = useContext(authContext);

  return (
    <nav className="navbar navbar-expand-lg glass-nav shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 brand-logo" to="/">
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
          {/* RIGHT MENU */}
          <ul className="navbar-nav ms-auto gap-2">
            {!typeUser && (
              <li className="nav-item">
                <Link className="nav-link nav-item-custom" to="/">
                  خانه
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link nav-item-custom" to="/Products">
                محصولات
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-item-custom" to="/About">
                درباره ما
              </Link>
            </li>

            {isLog && !typeUser && (
              <li className="nav-item">
                <Link className="nav-link nav-item-custom" to="/Cart">
                  سبد خرید 🛍
                </Link>
              </li>
            )}
          </ul>

          {/* LEFT BUTTONS */}
          <div className="d-flex gap-2 ms-3">
            {isLog && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-outline-info rounded-pill"
                >
                  پروفایل
                </Link>

                {typeUser && (
                  <>
                    <Link
                      className="btn btn-outline-success rounded-pill"
                      to="/AddProduct"
                    >
                      افزودن محصول
                    </Link>
                    <Link
                      className="btn btn-outline-secondary rounded-pill"
                      to="/Users"
                    >
                      مدیریت کاربران
                    </Link>
                  </>
                )}
              </>
            )}

            {!isLog && (
              <>
                <Link
                  to="/Sign"
                  className="btn btn-outline-primary rounded-pill"
                >
                  ثبت نام
                </Link>
                <Link
                  to="/Login"
                  className="btn btn-outline-secondary rounded-pill"
                >
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
