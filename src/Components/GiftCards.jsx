import React, { useState, useEffect } from "react";

import { GiftCardCard } from "./GiftCardCard";
import "./GiftCards.css";
import { back, setting } from "../svg/svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions/products";
import { Loading } from "./Loading";

export const GiftCards = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    const loading = useSelector((state) => state.productsReducer.loading);
    const products = useSelector((state) => state.productsReducer.products);
    const [filteredProducts, setfilteredProducts] = useState();
    useEffect(() => {
        setfilteredProducts(products);
    }, [products]);
    const [filters, setfilters] = useState([]);

    const initialise = () => {
        setfilteredProducts(products);
    };
    let arr1 = [];
    const letsFilter = () => {
        initialise();
        filters.forEach((element) => {
            if (element.type === "platform") {
                console.log("platform");
                arr1 = filteredProducts.filter(
                    (product) => product.platform === element.value
                );
                setfilteredProducts(arr1);
            }
            if (element.type === "type") {
                arr1 = arr1.filter((product) => product.type === element.value);
                setfilteredProducts(arr1);
            }
            if (element.type === "region") {
                arr1 = arr1.filter((product) =>
                    product.region.includes(element.value)
                );
                setfilteredProducts(arr1);
            }
            if (element.type === "sort") {
                if (arr1.length === 0) {
                    setfilteredProducts(products);
                    arr1 = [...products];
                }
                if (element.value === "LTH") {
                    arr1.sort((a, b) =>
                        a.currentPrice - b.currentPrice ? 1 : -1
                    );
                }
                if (element.value === "HTL") {
                    arr1.sort((a, b) => b.currentPrice - a.currentPrice);
                }
                if (element.value === "DEALS") {
                    arr1.sort(
                        (a, b) =>
                            Math.ceil(
                                100 - (b.currentPrice * 100) / b.originalPrice
                            ) -
                            Math.ceil(
                                100 - (a.currentPrice * 100) / a.originalPrice
                            )
                    );
                }
            }
            setfilteredProducts(arr1);
        });
    };
    useEffect(
        () => letsFilter(),
        // eslint-disable-next-line
        [filters]
    );
    return loading ? (
        <Loading />
    ) : (
        <div>
            <div className="totalGiftCards">
                <div>
                    <h1>Gift Cards</h1>
                </div>
                <div
                    className="svgSetting"
                    onClick={() =>
                        document
                            .querySelector(".filterBox")
                            .classList.toggle("active")
                    }
                >
                    {" "}
                    {setting}
                </div>
                <div className="filterBox">
                    <div
                        className="backFilter"
                        onClick={() =>
                            document
                                .querySelector(".filterBox")
                                .classList.toggle("active")
                        }
                    >
                        {back}
                    </div>
                    <form
                        action=""
                        id="filter"
                        onChange={(e) => {
                            initialise();
                            let arr = Array.prototype.slice.call(e.target.form);
                            let tab = [];
                            arr.forEach((element, key) => {
                                let obj = {};
                                obj.value = element.value;
                                obj.checked = element.checked;
                                if (key < 4) {
                                    obj.type = "platform";
                                }
                                if (key >= 4 && key < 6) {
                                    obj.type = "type";
                                }
                                if (key >= 6 && key < 8) {
                                    obj.type = "region";
                                }
                                if (key >= 8 && key < 11) {
                                    obj.type = "sort";
                                }
                                if (obj.checked) {
                                    tab = [...tab, obj];
                                }
                            });
                            setfilters(tab);
                        }}
                    >
                        <div>
                            <h3> Platform</h3>
                            <label className="container">
                                <input
                                    type="radio"
                                    name="platform"
                                    value="PS4-PS5"
                                />
                                Playstation
                            </label>{" "}
                            <label className="container">
                                <input
                                    type="radio"
                                    name="platform"
                                    value="XBOX"
                                />
                                Microsoft Xbox
                            </label>{" "}
                            <label className="container">
                                <input
                                    type="radio"
                                    name="platform"
                                    value="Android"
                                />
                                Android
                            </label>{" "}
                            <label className="container">
                                <input
                                    type="radio"
                                    name="platform"
                                    value="STEAM"
                                />
                                Steam
                            </label>{" "}
                        </div>{" "}
                        <div>
                            <h3> Type</h3>
                            <label className="container">
                                <input type="radio" value="GC" name="type" />
                                Gift Card
                            </label>{" "}
                            <label className="container">
                                <input type="radio" value="SUB" name="type" />
                                Subscription
                            </label>{" "}
                        </div>
                        <div>
                            <h3> Region</h3>
                            <label className="container">
                                <input
                                    type="radio"
                                    value="FRANCE"
                                    name="region"
                                />
                                FRANCE
                            </label>{" "}
                            <label className="container">
                                <input type="radio" value="USA" name="region" />
                                USA
                            </label>{" "}
                        </div>
                        <div>
                            <h3> Show By </h3>
                            <label className="container">
                                <input type="radio" value="LTH" name="sort" />
                                Price Lowest to Highest
                            </label>{" "}
                            <label className="container">
                                <input type="radio" value="HTL" name="sort" />
                                Price Highest to Lowest
                            </label>
                            <label className="container">
                                <input type="radio" value="DEALS" name="sort" />
                                Best Deals
                            </label>
                        </div>{" "}
                        <button className="resetFilters"> Reset Filters</button>
                    </form>
                </div>
                <div className="bodyCards">
                    <div className="allCards">
                        {!filteredProducts ? (
                            <h1>Loading</h1>
                        ) : (
                            filteredProducts.map((product, index) => (
                                <Link to={`/giftcards/${product._id}`}>
                                    <GiftCardCard
                                        key={index}
                                        img={product.img}
                                        currentPrice={product.currentPrice}
                                        originalPrice={product.originalPrice}
                                        name={product.name}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
