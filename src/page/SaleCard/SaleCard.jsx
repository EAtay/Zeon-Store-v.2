import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SaleCard.css";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorites,
  getProdcutBestId,
  getProdcutBestLimit,
  getProdcutCollectionId,
  getbasket,
} from "../../redux/productact";
import {
  addAndDeleteProductInFavorites,
  addAndDeleteProductInbasket,
} from "../../utils/utilis";
// COMPONENTS
import Scroll from "../../components/Scroll/Scroll";
import { ReactComponent as Shop } from "../../assets/icon/shop.svg";
import CartNews from "../../components/Cart/CartNews";

// MUI
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// SWIPER
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SaleCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // collection
  // ID COL
  const collection = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.collectionId;
  });
  useEffect(() => {
    dispatch(getProdcutCollectionId(id));
  }, [id]);
  // bestseller
  const bestseller = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.bestsellerId;
  });
  useEffect(() => {
    dispatch(getProdcutBestId(id));
  }, [id]);
  // news
  const news = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.bestsellerlimit;
  });
  const [limit] = useState(5);
  useEffect(() => {
    dispatch(getProdcutBestLimit(1, limit));
  }, [limit]);
  // favorites
  const favorites = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.favorites;
  });
  useEffect(() => {
    dispatch(getFavorites());
  }, []);
  let checkInFavoritess = favorites.some(
    (item) => item.product.id === bestseller.id
  );
  // basket
  const basket = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.basket;
  });
  useEffect(() => {
    dispatch(getbasket());
  }, []);
  let checkInbasket = basket.some(
    (items) => items.product.id === bestseller.id
  );
  // naviget
  const naviget = useNavigate();
  const link = () => {
    if (basket) {
      naviget("/basket");
    }
  };

  const [zoom, setZoom] = useState(false);
  const [zomimg, setZomImg] = useState(0);
  const [color, setColor] = useState(0);

  return (
    <div className="wrapper">
      <Scroll />
      <Breadcrumbs aria-label="Breadcrumbs" className="crumbs">
        <Link to="/" className="crumbs_link1">
          Главная
        </Link>
        <Link to="/collection" className="crumbs_link1">
          Коллекция
        </Link>
        <Link to={`/collectionProducts/${id}`} className="crumbs_link1">
          {collection.title}
        </Link>
        <p className="crumbs_link2">{bestseller.title}</p>
      </Breadcrumbs>
      <section className="sallCard_container">
        <div className="sallCard_block">
          <div className="sallCard_img">
            {bestseller.img
              ? bestseller.img.map((item, index) => (
                  <img
                    src={item}
                    alt=""
                    className="img_block_img"
                    key={index}
                    onClick={() => {
                      setZoom(true);
                      setZomImg(index);
                    }}
                  />
                ))
              : null}
            {zoom ? (
              <div className="modal_img-zoom" onClick={() => setZoom(false)}>
                <img
                  src={bestseller.img[zomimg]}
                  alt=""
                  className="modal_img_img"
                />
              </div>
            ) : null}
          </div>
          <div className="sallCard_price">
            <div className="sallCard_information">
              <p className="information_title">{bestseller.title}</p>
              <p className="information_descr">
                Артикул:
                <span className="information_span">{bestseller.article}</span>
              </p>
              <div className="information_color">
                <p className="information_descr">Цвет :</p>
                <div className="information_colors">
                  {bestseller.color
                    ? bestseller.color.map((item, index) => (
                        <div
                          className={
                            color === index ? "renderborder" : "renderrow"
                          }
                          // style={{ background: item }}
                          onClick={() => setColor(index)}
                          key={index}
                        >
                          <div
                            className="renderblock_color_row"
                            style={{ background: item }}
                            onClick={() => setColor(index)}
                            key={index}
                          ></div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <p className="information_sale">{bestseller.sell} р</p>
              <p className="information_descr">О товаре:</p>
              <p className="information_span_about">{bestseller.descr}</p>
              <div className="information_color_js">
                <div>
                  <p className="information_descr">
                    Размерный ряд:
                    <span className="information_span">{bestseller.size}</span>
                  </p>
                  <p className="information_descr">
                    Количество в линейке:
                    <span className="information_span">
                      {bestseller.number}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="information_descr">
                    Состав ткани:
                    <span className="information_span">
                      {bestseller.composition}
                    </span>
                  </p>
                  <p className="information_descr">
                    Материал:{" "}
                    <span className="information_span">
                      {bestseller.material}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="sallCard_button">
              {checkInbasket ? (
                <button className="sallCard_button_shop" onClick={link}>
                  <span>Перейти в корзину</span>
                </button>
              ) : (
                <button
                  className="sallCard_button_shop"
                  onClick={() => {
                    addAndDeleteProductInbasket(bestseller, color);
                    dispatch(getbasket());
                  }}
                >
                  <Shop
                    width={20}
                    height={20}
                    className="sallCard_button_svg"
                  />
                  <span>Добавить в корзину</span>
                </button>
              )}
              <button className="sallCard_button_love">
                <IconButton
                  onClick={() => {
                    addAndDeleteProductInFavorites(bestseller);
                    dispatch(getFavorites());
                  }}
                >
                  {checkInFavoritess ? (
                    <FavoriteIcon sx={{ color: "white" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "white" }} />
                  )}
                </IconButton>
              </button>
            </div>
          </div>
        </div>
        <div className="interesting_container">
          <p className="interesting_title">Похожие товары</p>
          <div className="collection_render">
            {news.map((best) => (
              <CartNews product={best} key={best.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SaleCard;
