import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import "./CollectionProducts.css";
import Scroll from "../../components/Scroll/Scroll";
import { ReactComponent as Right } from "../../assets/icon/right.svg";
import { ReactComponent as Left } from "../../assets/icon/left.svg";
import Best from "../../components/Plagin/Best";
import PaginBest from "../../components/Plagin/PlagBes";
import { useDispatch, useSelector } from "react-redux";
import {
  getProdcutBestLimit,
  getProdcutCollectionId,
} from "../../redux/productact";
import CartNews from "../../components/Cart/CartNews";

const CollectionProducts = () => {
  // PLAGIN
  const [product, setBestseller] = useState([]);
  const [bestsellerPage, setCurrentPage] = useState(1);
  const [bestsellerPerPage] = useState(12);
  useEffect(() => {
    const getCounries = async () => {
      const res = await axios.get("http://localhost:3000/products");
      setBestseller(res.data);
    };
    getCounries();
  }, []);
  const lastCountryIndex = bestsellerPage * bestsellerPerPage;
  const firstCountryIndex = lastCountryIndex - bestsellerPerPage;
  const correntCounry = product.slice(firstCountryIndex, lastCountryIndex);
  const paginatee = (pageNumbere) => setCurrentPage(pageNumbere);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);
  // ID COL
  const { id } = useParams();
  const dispatch = useDispatch();
  const collection = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.collectionId;
  });
  useEffect(() => {
    dispatch(getProdcutCollectionId(id));
  }, [id]);
  // BESTSELLER
  const bestseller = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.bestsellerlimit;
  });
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    dispatch(getProdcutBestLimit(1, limit));
  }, [limit]);

  return (
    <div className="wrapper">
      <Scroll />
      <Breadcrumbs aria-label="breadcrumb" className="crumbs">
        <Link to="/" className="crumbs_link1">
          Главная
        </Link>
        <Link to="/collection" className="crumbs_link1">
          Коллекция
        </Link>
        <p className="crumbs_link2">{collection.title}</p>
      </Breadcrumbs>
      <section className="collection_section">
        <div className="collection_header">
          <p className="interesting_title">{collection.title}</p>
        </div>
        <div className="collection_render_card">
          <Best product={correntCounry} />
        </div>
        <div className="collection_pagination">
          <button className="pagination_next" onClick={prevPage}>
            <Left className="pagination_svg" />
          </button>
          <PaginBest
            paginatee={paginatee}
            bestsellerPerPage={bestsellerPerPage}
            totalCounris={product.length}
          />
          <button onClick={nextPage} className="pagination_next">
            <Right className="pagination_svg" />
          </button>
        </div>
      </section>
      <section className="collection_section">
        <p className="interesting_title">Новинки</p>
        <div className="interesting_block">
          {bestseller.map((best) => (
            <div className="mini_card">
              <CartNews product={best} key={best.id} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CollectionProducts;
