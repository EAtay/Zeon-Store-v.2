import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./News.css";
// COMPONENTS
import Scroll from "../../components/Scroll/Scroll";
// MUI
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Collapsible from "../../components/Collapsible/Collapsible";
const News = () => {
  // news
  const [news, setNews] = useState([]);
  const [curretpage, setCurrPage] = useState(1);
  const [fetching, setFetnch] = useState(true);
  useEffect(() => {
    if (fetching) {
      axios
        .get(`http://localhost:3000/newspost?_limit=6&_page=${curretpage}`)
        .then((response) => {
          setNews([...news, ...response.data]);
          setCurrPage((prevState) => prevState + 1);
        })
        .finally(() => setFetnch(false));
    }
  }, [fetching]);

  // plaginat
  useEffect(() => {
    document.addEventListener("scroll", scrollHandl);
    return function () {
      document.removeEventListener("scroll", scrollHandl);
    };
  });
  const scrollHandl = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      10
    ) {
      setFetnch(true);
    }
  };

  const [modeMob, setModeMob] = useState(false);
  const handleModeHide = () => {
    setModeMob(false);
  };
  const handleModeShow = () => {
    setModeMob(true);
  };

  return (
    <div className="newspage_container">
      <Scroll />
      <Breadcrumbs aria-label="breadcrumb" className="crumbs">
        <Link to="/" className="crumbs_link1">
          Главная
        </Link>
        <p className="crumbs_link2">Новости</p>
      </Breadcrumbs>
      <section className="collection_section">
        <p className="interesting_title">Новости</p>
        {news.map((news, index) => {
          return (
            <div className="news_card_render" key={index}>
              <img src={news.img} alt="" className="card_render_img" />
              <div>
                <p className="card_render_title">{news.title}</p>
                <p className="card_render_descr">{news.text}</p>
                {modeMob ? (
                  <div className="text_block_mobile">
                    <div className="text-hide">
                      <p className="card_render_descrs">{news.text}</p>
                    </div>
                    <button
                      onClick={handleModeHide}
                      className="btn-mobile_show"
                    >
                      Показать
                    </button>
                  </div>
                ) : (
                  <div className="text_block_mobile">
                    <div>
                      <p className="card_render_descrs">{news.text}</p>
                    </div>
                    <button
                      onClick={handleModeShow}
                      className="btn-mobile_show"
                    >
                      Скрыть
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default News;
