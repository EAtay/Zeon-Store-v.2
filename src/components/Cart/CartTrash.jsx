import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getFavorites, getbasket } from "../../redux/action";
import {
  addAndDeleteProductInFavorites,
  addAndDeleteProductInbasket,
  deleteCart,
} from "../../utils/utilis";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import "./Cart.scss";
// COMPONENTS
import { ReactComponent as Pls } from "../../assets/icon/pls.svg";
import { ReactComponent as Min } from "../../assets/icon/min.svg";
import { ReactComponent as Clo } from "../../assets/icon/close.svg";
import { changeCountProduct } from "../../utils/matematika";

const Cartbasket = ({ product }) => {
  const dispatch = useDispatch();

  const basket = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.basket;
  });

  useEffect(() => {
    dispatch(getbasket());
  }, []);

  const [count, setCount] = useState(product.count);
  useEffect(() => {
    //changeCountProduct(count, product.product.id)
    dispatch(getbasket());
  }, [count]);
  return (
    <div className="cartItem_block">
      <button
        className="cartItem_block_close"
        onClick={() => {
          deleteCart(product.product, product.color);
          dispatch(getbasket());
        }}
      >
        <Clo className="close_svg" />
      </button>
      <div className="cartItem_block_img">
        <img src={product.product.img[0]} alt="" />
      </div>
      <div className="cartItem_block_info">
        <div className="cartItem_title1">
          <p className="cartItem_title_text">{product.product.title}</p>
        </div>
        <div className="cartItem_title2">
          <p className="cartItem_title_size">Размер: {product.product.size}</p>
          <p className="cartItem_title_size">
            Цвет :
            <div
              className="renderborder"
              style={{
                marginLeft: 4,
              }}
            >
              <div
                className="renderblock_color_row"
                style={{
                  background: product.product.color[product.color],
                }}
              ></div>
            </div>
          </p>
          <div className="cartItem_title2_flex">
            <p className="cartItem_title2_sale1">
              {product.product.sell} р{" "}
              <span className="cartItem_title2_sale3">
                {product.product.discountSale}%
              </span>
            </p>
            {product.product.sellNews ? (
              <p className="cartItem_title2_sale2">
                {product.product.sellNews} р
              </p>
            ) : null}
          </div>
        </div>
        <div className="cartItem_btm">
          <button
            className="cartItem_btm_min"
            onClick={() => {
              if (count <= 1) {
                deleteCart(product.product, product.color);
                dispatch(getbasket());
              } else {
                setCount((prev) => {
                  addAndDeleteProductInbasket(
                    product.product,
                    product.color,
                    prev - 1
                  );
                  return prev - 1;
                });
              }
            }}
          >
            <Min className="cartItem_btm_min_svg" />
          </button>
          <p className="cartItem_btm_leng">{count}</p>
          <button
            className="cartItem_btm_min"
            onClick={() => {
              setCount((prev) => {
                addAndDeleteProductInbasket(
                  product.product,
                  product.color,
                  prev + 1
                );
                return prev + 1;
              });
            }}
          >
            <Pls className="cartItem_btm_min_svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartbasket;
