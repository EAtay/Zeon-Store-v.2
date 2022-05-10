import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Collection.scss";
import axios from "axios";
// COMPONENTS
import Scroll from "../../components/Scroll/Scroll";
import Counris from "../../components/Plagin/Counris";
import Pagin from "../../components/Plagin/Pagin";
import { ReactComponent as Right } from "../../assets/icon/right.svg";
import { ReactComponent as Left } from "../../assets/icon/left.svg";
// MUI
import Breadcrumbs from "@mui/material/Breadcrumbs";

const Collection = () => {
  // plaginat
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(8);
  useEffect(() => {
    const getCounries = async () => {
      const res = await axios.get("http://localhost:3000/collection");
      setCountries(res.data);
    };
    getCounries();
  }, []);
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;
  const correntCounry = countries.slice(firstCountryIndex, lastCountryIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className="collection_wrapper">
      <Scroll />
      <Breadcrumbs aria-label="breadcrumb" className="crumbs">
        <Link to="/" className="crumbs_link1">
          Главная
        </Link>
        <p className="crumbs_link2">Коллекция</p>
      </Breadcrumbs>
      <section className="collection_section">
        <div className="collection_header">
          <p className="interesting_title">Коллекция</p>
          <Counris countries={correntCounry} />
        </div>
        <div className="collection_pagination">
          <button className="pagination_next" onClick={prevPage}>
            <Left className="pagination_svg" />
          </button>
          <Pagin
            paginate={paginate}
            countriesPerPage={countriesPerPage}
            totalCounris={countries.length}
          />
          <button onClick={nextPage} className="pagination_next">
            <Right className="pagination_svg" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Collection;
