import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./About.scss";
import "../../App.scss";
// MUI
import Breadcrumbs from "@mui/material/Breadcrumbs";
// COMPONENTS
import Scroll from "../../components/Scroll/Scroll";
// REDUX
import { getProdcutAbout } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const About = () => {
  // about
  const dispatch = useDispatch();
  const about = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.about;
  });
  useEffect(() => {
    dispatch(getProdcutAbout());
  }, []);

  return (
    <div className="wrapper">
      <Scroll />
      <Breadcrumbs aria-label="Breadcrumbs" className="crumbs">
        <Link to="/" className="crumbs_link1">
          Главная
        </Link>
        <p className="crumbs_link2">О нас</p>
      </Breadcrumbs>
      <section className="about_wrapper">
        <div className="about_section_img">
          <div className="about_block_img1">
            <img src={about.img1} alt="" className="block_img1" />
            <img src={about.img2} alt="" className="block_img1" />
          </div>
          <div className="about_block_img2">
            <img src={about.img3} alt="" className="block_img1" />
          </div>
        </div>
        <div className="about_section_text">
          <p className="block_text_title">О нас</p>
          <p className="block_text_descr">{about.text}</p>
        </div>
      </section>
    </div>
  );
};

export default About;
