import React, { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getProdcutBest } from "../../redux/action";
import { Link, useNavigate } from "react-router-dom";
// COMPONENTS
import search from "../../assets/icon/search.svg";
import "./SearchInput.scss";

const SearchMobile = () => {
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
      <div className="mobile_search">
          <form className="header_inputq" onSubmit={link}>
      <input
        type="text"
        placeholder="Поиск"
        className="header_inputs"
        value={value}
        onChange={setValue}
        onClick={inputClickHandlerr}
        onBlur={() => setTimeout(() => setIsOpen(false), 1000)}
      />
      <ul className="autoCompleteq">
        {value && isOpen
          ? filterCard.map((best) => {
              return (
               <li className="autoCompItemq">
                 <Link to={`/card/${best.id}`} className="linkcompitemq" onClick={itemClickCard}>
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
      </div>
   
  );
};

export default SearchMobile;
