import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Scroll.scss";
// COMPONENTS
import massen from "../../assets/icon/chat.svg";
import up from "../../assets/icon/up.svg";
import close from "../../assets/icon/close.svg";
import tel from "../../assets/icon/tell.png";
import tell from "../../assets/icon/tell.svg";
import teleg from "../../assets/icon/telegram.png";
import wat from "../../assets/icon/wa.png";
import user from "../../assets/icon/user.svg";
import complite from "../../assets/icon/complite.svg";
import { getProdcutInform } from "../../redux/action";
// BOOTSTRAP
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function MyVerticallyCenteredModal(props) {
  const [complitMode, setCompliteMode] = useState(false);
  // user
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState("");

  const handleComliper = () => {
    setCompliteMode(false);
  };
  const handleUpdateChat = async (e) => {
    e.preventDefault();
    setUserName(e.target.value);
    setUserName(e.target.value);
    await axios.post(" http://localhost:3000/chat", {
      userName: userName,
      number: number,
    });
    setNumber("");
    setUserName("");
    setCompliteMode(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {complitMode ? (
        <form className="modalmode_block" onSubmit={handleComliper}>
          <div className="modal_complite_header">
            <img src={complite} alt="" className="modal_complite_img" />
            <p className="modal_complite_title">Спасибо!</p>
            <p className="modal_complite_descr">
              Ваша заявка была принята ожидайте, скоро Вам перезвонят
            </p>
          </div>
          <div className="modal_complite_button">
            <button onClick={props.onHide} type="submit">
              Продолжить покупки
            </button>
          </div>
        </form>
      ) : (
        <div className="modalChat_block">
          <img
            src={close}
            alt=""
            className="modalChat_block_close"
            onClick={props.onHide}
          />
          <div className="modalChat_block_title">
            <p className="block_title_text">Если у Вас остались вопросы</p>
            <p className="block_title_descr">
              Оставьте заявку и мы обязательно Вам перезвоним
            </p>
          </div>
          <form className="modalChat_block_input" onSubmit={handleUpdateChat}>
            <div className="block_input_from">
              <img src={user} alt="" className="block_input_img" />
              <input
                type="text"
                placeholder="Как к Вам обращаться?"
                className="block_input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                minLength={2}
              />
            </div>
            <div className="block_input_from">
              <img src={tell} alt="" className="block_input_img" />
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="Номер телефона"
                className="block_input"
                value={number}
                minLength={10}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={number && userName ? "block_input_btnss": "block_input_btns"}
            >
              Заказать звонок
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
}

const Scroll = () => {
  const [chatMode, setChatMode] = useState(true);
  const chatShow = () => {
    setChatMode(false);
  };
  const chatHide = () => {
    setChatMode(true);
  };

  const upScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  // INFORM
  const dispatch = useDispatch();
  const inform = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.inform;
  });
  useEffect(() => {
    dispatch(getProdcutInform());
  }, []);

  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="chat_container">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <img src={up} alt="" className="chat_container_up" onClick={upScroll} />

      {chatMode ? (
        <img
          src={massen}
          alt="shat"
          className="chat_container_chat"
          onClick={chatShow}
        />
      ) : (
        <div className="chat_close">
          <a href={inform.inst} target="_blank" className="link">
            <img src={teleg} alt="" className="chat_link_teleg" />
          </a>

          <a href={inform.tel} target="_blank" className="link">
            <img src={wat} alt="" className="chat_link_wat" />
          </a>
          <img
            src={tel}
            alt=""
            className="chat_link_tel"
            onClick={() => setModalShow(true)}
          />
          <img
            src={close}
            alt=""
            className="chat_link_close"
            onClick={chatHide}
          />
        </div>
      )}
    </div>
  );
};

export default Scroll;
