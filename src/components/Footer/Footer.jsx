import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
// COMPONENTS
import tel from "../../assets/icon/tel.svg";
import mail from "../../assets/icon/mail.svg";
import ins from "../../assets/icon/instagram.svg";
import teleg from "../../assets/icon/telegram.svg";
import wat from "../../assets/icon/wa.svg";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getProdcutInform } from "../../redux/action";

const Footer = () => {
  // INFORM
  const dispatch = useDispatch();
  const inform = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.inform;
  });
  useEffect(() => {
    dispatch(getProdcutInform());
  }, []);

  return (
    <div className="footer_container">
      <div className="footer_block">
        <div className="footer_block_img">
          <img src={inform.logo} alt="" className="block_img" />
        </div>
        <div className="footer_block_info">
          <div className="block_info_one">
            <div className="info_one_title">
              <p>Компания</p>
            </div>
            <div className="info_one_link">
              <p className="info_one_link_descr">
                <Link to="/about" className="link">
                  О нас
                </Link>
              </p>
              <p className="info_one_link_descr">
                <Link to="/news" className="link">
                  Новости
                </Link>
              </p>
              <p className="info_one_link_descr">
                <Link to="/help" className="link">
                  Помощь
                </Link>
              </p>
            </div>
          </div>
          <div className="block_info_one">
            <div className="info_one_title">
              <p>Контакты</p>
            </div>
            <div className="info_one_link">
              <div className="info_link_flex">
                <img src={tel} alt="" className="info_link_img" />
                <a href="tel:+996 500 123 456" className="link">
                  {inform.number1}
                </a>
              </div>
              <div className="info_link_flex">
                <img src={tel} alt="" className="info_link_img" />
                <a href="tel:+996 500 123 456" className="link">
                  {inform.number2}
                </a>
              </div>
              <div className="info_link_flex">
                <img src={mail} alt="" className="info_link_img" />
                <a href="mailto:mail@gmail.com" className="link">
                  {inform.mail}
                </a>
              </div>
            </div>
          </div>
          <div className="block_info_one">
            <div className="info_one_title">
              <p>Мы в социальных сетях:</p>
            </div>
            <div className="info_one_link">
              <div className="info_link_flex">
                <img src={ins} alt="" className="info_link_img" />
                <a href={inform.inst} target="_blank" className="link">
                  Instagram
                </a>
              </div>
              <div className="info_link_flex">
                <img src={teleg} alt="" className="info_link_img" />
                <a href={inform.tel} target="_blank" className="link">
                  Telegram
                </a>
              </div>
              <div className="info_link_flex">
                <img src={wat} alt="" className="info_link_img" />
                <a href={inform.wat} target="_blank" className="link">
                  Whatsapp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_desrc">
        <p>Developed by Zeon 2022</p>
      </div>
    </div>
  );
};

export default Footer;
