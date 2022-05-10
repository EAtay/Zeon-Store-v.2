import React, { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getProdcutBest } from "../../redux/productact";
import { Link, useNavigate } from "react-router-dom";
// COMPONENTS
import search from "../../assets/icon/search.svg";
import "./SearchInput.css";

const SearchInput = () => {
  // bestseller
  const dispatch = useDispatch();
  const bestseller = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.bestseller;
  });
  // value
  const value = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.value;
  });
  useEffect(() => {
    dispatch(getProdcutBest());
  }, []);
  const setValue = (e) => {
    dispatch({
      type: "SET_VALUE",
      data: e.target.value,
    });
  };
  // filter
  const filterCard = bestseller.filter((best) => {
    return best.title.toLowerCase().includes(value.toLowerCase());
  });
  // search
  const [isOpen, setIsOpen] = useState(true);
  const itemClickCard = (e) => {
    setValue(e.target.textContent);
    setIsOpen(!isOpen);
  };
  const inputClickHandlerr = () => {
    setIsOpen(true);
  };
  // naviget
  const naviget = useNavigate();
  const link = () => {
    if (value) {
      naviget("/search");
    }
  };

  return (
    <form className="header_input" onSubmit={link}>
      <input
        type="text"
        placeholder="Поиск"
        className="header_inputs"
        value={value}
        onChange={setValue}
        onClick={inputClickHandlerr}
        onBlur={() => setTimeout(() => setIsOpen(false), 1000)}
      />
      <ul className="autoComplete">
        {value && isOpen
          ? filterCard.map((best) => {
              return (
               <li className="autoCompItem">
                 <Link to={`/card/${best.id}`} className="linkcompitem" onClick={itemClickCard}>
                  {best.title} 
                </Link>
               </li> 
              );
            })
          : null}
      </ul>
      <button className="header_input_button" type="submit">
        <img src={search} alt="" />
      </button>
    </form>
  );
};

export default SearchInput;
