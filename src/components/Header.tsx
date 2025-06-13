import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../store/slices/user";
import hotToast from "../common/hotToast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const user = useSelector((state: any) => state.user.user);
  const history = useNavigate();
  return (
    <header>
      <a href="#" className="logo">
        <img src="img/logo.png" alt="شعار الجمعية" />
      </a>
      <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu}>
        <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
      </div>
      <nav id="navbar" className={isMenuOpen ? "open" : ""}>
        <ul>
          <li>
            <a href="#home" className="active">
              الرئيسية
            </a>
          </li>
          <li>
            <a href="#about">عن الجمعية</a>
          </li>
          <li>
            <a href="#services">مشاريع ثابتة</a>
          </li>
          <li>
            <a href="#season">مشاريع موسمية</a>
          </li>
          <li>
            <a href="#contact">اتصل بنا</a>
          </li>
        </ul>
      </nav>
      {user ? (
        <button
          className="sin desktop-only"
          onClick={() => {
            localStorage.removeItem("user");
            dispatch(logOut());
            history("/login");
            hotToast({ type: "success", message: "تم تسجيل الخروج بنجاح" });
          }}
        >
          تسجيل الخروج
        </button>
      ) : (
        <Link to={"/login"} className="sin desktop-only">
          تسجيل الدخول
        </Link>
      )}
    </header>
  );
};

export default Header;
