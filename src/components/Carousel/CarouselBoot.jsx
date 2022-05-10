import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProdcutSlider } from "../../redux/action";
import "./CarouselBoot.scss";

const CarouselBoot = () => {
  const dispatch = useDispatch();
  // SLIDER
  const slid = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.slider;
  });

  useEffect(() => {
    dispatch(getProdcutSlider());
  }, []);

  return (
    <div className="carousel_container">
      <Carousel className="carousel" controls={false}>
        {slid
          ? slid.map((slid, index) => (
              <Carousel.Item interval={1000} key={index}>
                <a href={slid.link} target="_blank">
                  <img src={slid.img} alt="First slide" className="carousel_img" />
                </a>
              </Carousel.Item>
            ))
          : null}
      </Carousel>
    </div>
  );
};

export default CarouselBoot;
