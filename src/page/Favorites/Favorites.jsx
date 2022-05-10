import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Favorites.css";
// COMPONENTS
import Scroll from "../../components/Scroll/Scroll";
import Cart from "../../components/Cart/Cart";
// MUI
import Breadcrumbs from "@mui/material/Breadcrumbs";
// REDUX
import { getFavorites, getProdcutBestLimit } from "../../redux/action";
import CartNews from "../../components/Cart/CartNews";

const Favorites = () => {
  const dispatch = useDispatch();
  // favorites
  const favorites = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.favorites;
  });
  useEffect(() => {
    dispatch(getFavorites());
    console.log(favorites);
  }, []);
  // BESTSELLER
  const bestseller = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.bestsellerlimit;
  });
  const [limit] = useState(5);
  useEffect(() => {
    dispatch(getProdcutBestLimit(1, limit));
  }, [limit]);

  return (
    <div className="wrapper">
      <Scroll />
      <Breadcrumbs aria-label="Breadcrumbs" className="crumbs">
        <Link to="/" className="crumbs_link1">
          Главная
        </Link>
        <p className="crumbs_link2">Избранное</p>
      </Breadcrumbs>
      <section className="collection_section">
        <div className="collection_header">
          <p className="interesting_title">Избранное</p>
          {favorites.length ? (
            <p className="interesting_descr">
              Товаров в избранном: {favorites.length}
            </p>
          ) : (
            <p className="interesting_descr">
              У Вас пока нету избранных товаров
            </p>
          )}
        </div>
        <div className="collection_render">
          {favorites.length ? (
            favorites.map((item) => (
              <Cart product={item.product} key={item.product.id} />
            ))
          ) : (
            <section className="interesting_container">
           <p className="collection_title_textsss">Похожие товары</p>
            <div className="collection_render">
              {bestseller.map((best) => (
                  <CartNews product={best} key={best.id} />
              ))}
            </div>
          </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
