import React from "react";
import Carousel from "t-a-e-3d-carousel-reactjs";
import "./MyCarousel.css";
import fortniteCarousel from "../images/fortniteCarousel.png";
import lolCarousel from "../images/lolCarousel.png";
import psnCarousel from "../images/psnCarousel.png";
import xBoxCarousel from "../images/xBoxCarousel.jpg";
import netflixCarousel from "../images/netflixCarousel.jpg";
import steamCarousel from "../images/steamCarousel.jpg";
import freeFireCarousel from "../images/freeFireCarousel.jpg";

export const MyCarousel = () => {
    const Images = [
        {
            title: "",
            url: fortniteCarousel,
        },
        {
            title: "",
            url: lolCarousel,
        },
        {
            title: "",
            url: psnCarousel,
        },
        {
            url: xBoxCarousel,
        },
        {
            url: netflixCarousel,
        },
        {
            url: freeFireCarousel,
        },
        {
            url: steamCarousel,
        },
    ];

    return (
        <Carousel
            interval="3000"
            className="myCarousel"
            autoplay={true}
            imageList={Images}
            imageClassName="imgCarousel"
            showArrows={false}
        />
    );
};
