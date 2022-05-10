import React from 'react';

const CartAdva = ({product}) => {
    return (
        <div className="about_block">
        <div className="about_block_img">
          <img src={product.img} alt="" className="about_img" />
        </div>
        <div className="about_block_text">
          <p className="about_title">{product.title}</p>
          <p className="about_descr">
            {product.text}
          </p>
        </div>
      </div>
    );
};

export default CartAdva;