import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Basket.scss";
//COMPONENTS
import CartTrash from "../../components/Cart/CartTrash";
import { ReactComponent as Clo } from "../../assets/icon/close.svg";
import Scroll from "../../components/Scroll/Scroll";
import complite from "../../assets/icon/complite.svg";
//MUI
import Dialog from "@mui/material/Dialog";
//REDUX
import { getProdcutBestLimit, getbasket } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { matemSell } from "../../utils/matematika";
import axios from "axios";
import line from "../../assets/icon/Line.png";
import CartNews from "../../components/Cart/CartNews";

const Basket = () => {
  // modal
  const [modalMod, setModalMod] = useState(true);
  const handleCloseModal = () => {
    setModalMod(true);
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClosee = () => {
    setOpen(false);
  };

  // Basket
  const dispatch = useDispatch();
  const basket = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.basket;
  });
  useEffect(() => {
    dispatch(getbasket());
  }, []);

  const totalSell = matemSell(basket);
  // CHECKBOX
  const [btnStatus, setBtnStatus] = useState(true);
  function handleChange(e) {
    const elements = document.getElementsByName("checkbox");
    let checkedCount = 0;
    elements.forEach((element) => {
      if (element.checked) {
        checkedCount++;
      }
    });
    if (checkedCount > 1 || checkedCount === 0) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  }
  // POST
  const [number, setNumber] = useState();
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();

  const handleUpdateSale = async (e) => {
    e.preventDefault();
    await axios.post(" http://localhost:3000/sale", {
      lastName,
      number,
      firstName,
      email,
      country,
      city,
    });
    setNumber("");
    setLastName("");
    setFirstName("");
    setEmail("");
    setCountry("");
    setCity("");
    await setModalMod(false);
    localStorage.removeItem("basket");
  };
  // MODE
  const [modalSale, setModalSale] = useState(false);
  const handleHide = () => {
    setModalSale(true);
  };
  const handleShow = () => {
    setModalSale(false);
  };

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
    <div className="basket_wrapper">
      <Scroll />
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {modalMod ? (
          <form className="modal_basket" onSubmit={handleUpdateSale}>
            <div className="modal_header">
              <p className="modal_header_title">???????????????????? ????????????</p>
              <button className="modal_button_close" onClick={handleClosee}>
                <Clo className="close_svg" />
              </button>
            </div>
            <div className="modal_input">
              <p className="modal_basket_descr">???????? ??????</p>
              <input
                type="text"
                placeholder="???????????????? ????????"
                className="modal_basket_input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="modal_input">
              <p className="modal_basket_descr">???????? ??????????????</p>
              <input
                type="text"
                placeholder="???????????????? ????????????"
                className="modal_basket_input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="modal_input">
              <p className="modal_basket_descr">?????????????????????? ??????????</p>
              <input
                type="email"
                placeholder="example@mail.com"
                className="modal_basket_input"
                value={email}
                minLength={5}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="modal_input">
              <p className="modal_basket_descr">?????? ?????????? ????????????????</p>
              <input
                type="text"
                pattern="[0-9]*"
                minLength={10}
                placeholder="?????????????? ?????????? ????????????????"
                className="modal_basket_input"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div className="modal_input">
              <p className="modal_basket_descr">????????????</p>
              <input
                type="text"
                placeholder="?????????????? ????????????"
                className="modal_basket_input"
                value={city}
                minLength={2}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="modal_input">
              <p className="modal_basket_descr">??????????</p>
              <input
                type="text"
                placeholder="?????????????? ??????????"
                className="modal_basket_input"
                value={country}
                minLength={2}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="modal_checkbox">
              <input
                name="checkbox"
                type="checkbox"
                onChange={handleChange}
                className="modal_basket_checkbox"
              />
              <p className="modal_basket_text">
                ???????????????? ?? ?????????????????? <Link to="/public">?????????????????? ????????????</Link>
              </p>
            </div>
            <div className="modal_input">
              <button
                className={
                  btnStatus ? "modal_sall_button" : "modal_sall_buttons"
                }
                type="submit"
                disabled={btnStatus}
              >
                ????????????????
              </button>
            </div>
          </form>
        ) : (
          <div className="modal_complite">
            <div className="modal_complite_header">
              <img src={complite} alt="" className="modal_complite_img" />
              <p className="modal_complite_title">??????????????!</p>
              <p className="modal_complite_descr">
                ???????? ???????????? ???????? ?????????????? ????????????????, ?????????? ?????? ????????????????????
              </p>
            </div>
            <div className="modal_complite_button">
              <button onClick={handleCloseModal}>???????????????????? ??????????????</button>
            </div>
          </div>
        )}
      </Dialog>
      <div className="basket_container">
        {basket.length ? (
          basket.map((item) => (
            <section className="basket_information">
              <div className="information_card">
                <CartTrash product={item} key={item.product.id} />
              </div>
              <div className="information_price">
                <div className="price_block">
                  <p className="price_block_title">?????????? ????????????</p>
                  <div>
                    <div className="price_card">
                      <p className="price_card_title">???????????????????? ????????????:</p>
                      <p className="price_card_descr">
                        {totalSell.totalQty} ????
                      </p>
                    </div>
                    <div className="price_card">
                      <p className="price_card_title">???????????????????? ??????????????:</p>
                      <p className="price_card_descr">
                        {totalSell.modelQty} ????
                      </p>
                    </div>
                    <div className="price_card">
                      <p className="price_card_title">??????????????????:</p>
                      <p className="price_card_descr">
                        {totalSell.amount} ????????????
                      </p>
                    </div>
                    <div className="price_card">
                      <p className="price_card_title">????????????:</p>
                      <p className="price_card_descr">
                        {totalSell.discontAmount} ????????????
                      </p>
                    </div>
                  </div>
                </div>
                <div className="line_block">
                  <img src={line} alt="" />
                </div>
                <div className="price_card">
                  <p className="price_card_title">?????????? ?? ????????????:</p>
                  <p className="price_card_descr">
                    {totalSell.totalSum} ????????????
                  </p>
                </div>
                <div className="price_card_button">
                  <button
                    className="price_card_button"
                    onClick={handleClickOpen}
                    disabled={!basket.length}
                  >
                    ???????????????? ??????????
                  </button>
                </div>
              </div>
            </section>
          ))
        ) : (
          <section className="interesting_container">
            <p className="interesting_title">??????????????</p>
            <p className="interesting_descr">
              ?? ?????? ???????? ?????? ?????????????? ?? ??????????????
            </p>
            <p className="interesting_interest">???????????????? ?????? ????????????????????????</p>
            <div className="collection_render">
              {bestseller.map((best) => (
                  <CartNews product={best} key={best.id} />
              ))}
            </div>
          </section>
        )}
        {basket.length ? (
          <div className="mobile_sale">
            <div className="price_block">
              {modalSale ? (
                <div>
                  <p className="price_block_p">?????????? ????????????</p>
                  <div className="price_card">
                    <p className="price_card_title">?????????? ????????????????????:</p>
                    <p className="price_card_descr">
                      {totalSell.totalQty} ???????????? ({totalSell.modelQty} ????.)
                    </p>
                  </div>
                  <div className="price_card">
                    <p className="price_card_title">??????????????????:</p>
                    <p className="price_card_descr">
                      {totalSell.amount} ????????????
                    </p>
                  </div>
                  <div className="line_block">
                    <img src={line} alt="" className="line_block" />
                  </div>
                </div>
              ) : null}
              <div className="price_card">
                <p className="price_card_title">?????????? ?? ????????????:</p>
                <p className="price_card_descr">{totalSell.totalSum} ????????????</p>
              </div>
              <div>
                {modalSale ? (
                  <button onClick={handleShow} className="mobile_button_hide">
                    ????????????
                  </button>
                ) : (
                  <button onClick={handleHide} className="mobile_button_hide">
                    ???????????????????? ?? ????????????
                  </button>
                )}
              </div>
            </div>
            <div className="price_card_button">
              <button
                className="price_card_button"
                onClick={handleClickOpen}
                disabled={!basket.length}
              >
                ???????????????? ??????????
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Basket;
