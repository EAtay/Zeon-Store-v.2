import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// COMPONENTS
import logo from "../../assets/img/logo.png";
import love from "../../assets/icon/love.svg";
import baskets from "../../assets/icon/shop.svg";
import search from "../../assets/icon/search.svg";
import close from "../../assets/icon/close.svg";
import SearchInput from "../Search/SearchInput";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getProdcutInform } from "../../redux/productact";
import SearchMobile from "../Search/SearchMobile";

const Navbar = ({ itemsCount }) => {
  // basket
  const basket = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.basket;
  });
  // FAVORITES
  const favorites = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.favorites;
  });

  // MOBILE
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  // inform
  const dispatch = useDispatch();
  const inform = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.inform;
  });
  useEffect(() => {
    dispatch(getProdcutInform());
  }, []);

  const [mobileSearch, setMobileSearch] = useState(false);
  const handleMobileSearchHide = () => {
    setMobileSearch(false);
  };
  const handleMobileSearchShow = () => {
    setMobileSearch(true);
  };
  return (
    <div className="header_container">
      {/* MOBILE */}
      <div className="mobile_mav">
        <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <Link to="/">
          <img src={logo} alt="logo" className="mobile_logo" />
        </Link>
        {mobileSearch ? (
          <button className="mobile_seacr" onClick={handleMobileSearchHide}>
            <img src={close} alt="" className="mobile_img" />
          </button>
        ) : (
          <button className="mobile_seacr" onClick={handleMobileSearchShow}>
            <img src={search} alt="" className="mobile_img" />
          </button>
        )}
        {mobileSearch ? (
          <div className="mobile_seacrhh">
            <SearchMobile />
          </div>
        ) : null}
      </div>
      <div className={active}>
        <div className="mobile_one">
          <p>Меню</p>
          <div onClick={navToggle} className={icon}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
        <div className="mobile_link">
          <Link to="/about" onClick={navToggle} className="mobile_links_text">
            О нас
          </Link>
          <Link
            to="/collection"
            onClick={navToggle}
            className="mobile_links_text"
          >
            Коллекции
          </Link>
          <Link to="/news" onClick={navToggle} className="mobile_links_text">
            Новости
          </Link>
        </div>
        <div className="mobile_line"></div>
        <div className="mobile_love">
          <img src={love} alt="love" className="mobile__links_icon" />
          <Link to="/favorites" onClick={navToggle} className="mobile_links">
            Избранное
          </Link>
        </div>
        <div className="mobile_love">
          <img src={baskets} alt="shop" className="mobile__links_icon" />
          <Link to="/basket" onClick={navToggle} className="mobile_links">
            Корзина
          </Link>
        </div>
        <div className="mobile_contact">
          <p className="mob_tel">Свяжитсь с нами:</p>
          <p className="tell_number">
            Тел:
            <a href="tel:+996555991507" className="tell_numbers">
              {inform.number1}
            </a>
          </p>
        </div>
      </div>

      {/* WEB */}
      <div className="header_link">
        <div className="header_links">
          <Link to="/about" className="header_links_text">
            О нас
          </Link>
          <Link to="/collection" className="header_links_text">
            Коллекции
          </Link>
          <Link to="/news" className="header_links_text">
            Новости
          </Link>
        </div>
        <div className="header_tell">
          <p className="tell_number">
            Тел:
            <a href="sss" className="tell_numbers">
              {inform.number1}
            </a>
          </p>
        </div>
      </div>
      <div className="header_logo">
        <div className="header_img">
          <Link to="/" className="header_links_text">
            <img src={inform.logo} alt="logo" className="img_logo" />
          </Link>
        </div>
        <div className="header_search">
          <SearchInput />
          <div className="header_shops">
            <div className="header_love">
              <div className="cart-button">
                <img src={love} alt="love" className="search_link_icon" />
                {favorites.length ? (
                  <span className="cart-button_icon">{favorites.length}</span>
                ) : null}
              </div>
              <Link to="/favorites" className="search_link">
                Избранное
              </Link>
            </div>
            <div className="header_line"> {/*line*/}</div>
            <div className="header_love">
              <div className="cart-button">
                <img src={baskets} alt="shop" className="search_link_icon" />
                {basket.length ? (
                  <span className="cart-button_icon">{basket.length}</span>
                ) : null}
              </div>
              <Link to="/basket" className="search_link">
                Корзина
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
