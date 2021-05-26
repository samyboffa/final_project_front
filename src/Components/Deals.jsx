import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiftCardCard } from "./GiftCardCard";
import "./Deals.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loading } from "./Loading";

export const Deals = () => {
    const dealsProducts = useSelector(
        (state) => state.productsReducer.products
    );

    dealsProducts.sort(
        (a, b) =>
            100 -
            (b.currentPrice * 100) / b.originalPrice -
            (100 - (a.currentPrice * 100) / a.originalPrice)
    );
    return dealsProducts === undefined ? (
        <Loading />
    ) : (
        <div>
            <div>
                <h1>SUPER DEALS</h1>
            </div>

            <div className="superDeals">
                {dealsProducts.map((product, index) =>
                    index < 12 ? (
                        <Link to={`/giftcards/${product._id}`}>
                            <GiftCardCard
                                key={index}
                                img={product.img}
                                currentPrice={product.currentPrice}
                                originalPrice={product.originalPrice}
                                name={product.name}
                            />
                        </Link>
                    ) : null
                )}
            </div>
        </div>
    );
};
