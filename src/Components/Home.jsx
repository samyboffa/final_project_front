import React from "react";
import { Deals } from "./Deals";
import { MyCarousel } from "./MyCarousel";

import "./Home.css";

import { TopUpHome } from "./TopUpHome";

export const Home = () => {
    return (
        <div>
            <div className="home">
                <Deals />
            </div>
            <TopUpHome />
        </div>
    );
};
