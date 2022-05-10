import React from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Right } from "../../assets/icon/right.svg";

const CartCol = ({product}) => {
    return (
        <div className="renderCardColl_container">
        <div className="rendColl_card_block">
          <img src={product.img} alt="" className="rendColl_card_img" />
          <p className="rendColl_card_text">{product.title}</p>
        </div>
        <div className="rendColl_card_form">
          <Link
            className="rendColl_card_btn"
            to={`/collectionProducts/${product.id}`}
          >
            Смотреть все
            <Right className="rendColl_card_icon" />
          </Link>
        </div>
      </div>
    );
};

export default CartCol;