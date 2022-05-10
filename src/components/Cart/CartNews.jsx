import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.scss";
// MUI
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/action";
import { addAndDeleteProductInFavorites } from "../../utils/utilis";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const CartNews = ({ product }) => {
  const dispatch = useDispatch();
  // FAVORITES
  const favorites = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.favorites;
  });

  useEffect(() => {
    dispatch(getFavorites());
  }, []);

  let checkInFavorites = favorites.some(
    (item) => item.product.id === product.id
  );

  return (
    <div className="mini_card">
      <div className="section_img_min">
        {product.discount ? (
          <div className="block_dicount">
            <p>{product.discountSale} %</p>
          </div>
        ) : (
          ""
        )}
        <div className="block_favorites">
          <IconButton
            onClick={() => {
              addAndDeleteProductInFavorites(product);
              dispatch(getFavorites());
            }}
          >
            {checkInFavorites ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </div>
        <div className="block_swiper">
          <Swiper
             spaceBetween={30}
             pagination={{
               clickable: true,
             }}
             modules={[Pagination]}
             className="mySwiper"
          >
            {product.img
              ? product.img.map((item) => (
                  <SwiperSlide>
                    <img src={item} alt="" className="swiper_img" />
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
      </div>
      <div className="section_text">
        <div className="block_text">
          <Link to={`/card/${product.id}`} className="text_title">
            {product.title}
          </Link>
          <p className="text_sell">{product.sell} р</p>
          <p className="text_size">Размер: {product.size}</p>
        </div>
        <div className="block_color">
          {product.color
            ? product.color.map((item) => (
                <div
                  className="block_color_row"
                  style={{ background: item }}
                ></div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default CartNews;
