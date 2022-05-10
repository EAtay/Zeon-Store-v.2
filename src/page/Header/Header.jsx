import React, { useEffect, useState } from "react";
import "./Header.css";
// COMPONENTS
import Cart from "../../components/Cart/Cart";
import CartCol from "../../components/Cart/CartCol";  
import CartAdva from "../../components/Cart/CartAdva";
import CarouselBoot from "../../components/Carousel/CarouselBoot";
import Scroll from "../../components/Scroll/Scroll";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getProdcutAdvantage,
  getProdcutBestG,
  getProdcutBestLimit,
  getProdcutColLim,
} from "../../redux/productact";
import { useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  // bestseller
  const bestseller = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.bestsellerlimit;
  });
  const [limit, setLimit] = useState(4);
  useEffect(() => {
    dispatch(getProdcutBestLimit(1, limit));
  }, [limit]);

  // news
  const news = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.bestsellerlimitg;
  });
  const [limitq, setLimitq] = useState(4);
  useEffect(() => {
    dispatch(getProdcutBestG(1, limitq));
  }, [limitq]);

  // collection
  const collection = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.collectionlimit;
  });
  const [limits, setLimits] = useState(4);
  useEffect(() => {
    dispatch(getProdcutColLim(limits));
  }, [limits]);

  // advantage
  const advantage = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.advantage;
  });
  useEffect(() => {
    dispatch(getProdcutAdvantage());
  }, []);

  return (
    <div className="home_container">
      <Scroll />
      <CarouselBoot />
      <div className="home_container_cart">
        <div className="home_container_center">
          <p className="home_container_title">Хит продаж</p>
        </div>
        <div className="home_container_card">
          {bestseller.map((best) => (
            <Cart product={best} key={best.id} />
          ))}
        </div>
        <div className="home_container_center">
          <button
            className="home_container_btn"
            onClick={() => setLimit(limit + 4)}
          >
            Ещё
          </button>
        </div>
      </div>
      <div className="home_container_cart">
        <div className="home_container_center">
          <p className="home_container_title">Новинки</p>
        </div>
        <div className="home_container_card">
          {news.map((news) => (
            <Cart product={news} key={news.id} />
          ))}
        </div>
        <div className="home_container_center">
          <button
            className="home_container_btn"
            onClick={() => setLimitq(limitq + 4)}
          >
            Ещё
          </button>
        </div>
      </div>
      <div className="home_container_cart">
        <div className="home_container_center">
          <p className="home_container_title">Коллекция</p>
        </div>
        <div className="home_container_card">
          {collection.map((coll) => (
            <CartCol product={coll} key={coll.id} />
          ))}
        </div>
        <div className="home_container_center">
          <button
            className="home_container_btn"
            onClick={() => setLimits(limit + 4)}
          >
            Ещё
          </button>
        </div>
      </div>
      <div className="home_container_adv">
        <div className="home_container_cards">
          {advantage.map((adva) => (
            <CartAdva product={adva} key={adva.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
