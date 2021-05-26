import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./GiftCardDetail.css";
import { addedToCart, addToCart } from "../svg/svg";
import worldIcon from "../images/world.png";
import xboxLogo from "../images/xboxLogo.png";
import playstationLogo from "../images/playstationLogo.png";
import androidLogo from "../images/androidLogo.png";
import steamLogo from "../images/steamLogo.png";
import rockstarLogo from "../images/rockstarLogo.png";
import originLogo from "../images/originLogo.png";
import battleNetLogo from "../images/battleNetLogo.png";
import gogLogo from "../images/gogLogo.png";
import otherLogo from "../images/otherLogo.png";
import keysLogo from "../images/keysLogo.png";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const GiftCardDetail = (match) => {
    const history = useHistory();
    const [product, setproduct] = useState({});
    const [platform, setplatform] = useState();
    const [region, setregion] = useState("");
    const [msgAfterAddToCart, setmsgAfterAddToCart] = useState();
    const [display, setdisplay] = useState("notVisible");

    //the product to be added to the cart

    const order = {
        productId: match.match.params.id,
        quantity: 1,
    };

    //getting the user
    const user = useSelector((state) => state.userReducer.user);
    useEffect(() => {
        axios
            .get("/getProductById", {
                headers: { id: match.match.params.id },
            })
            .then((res) => {
                setproduct(res.data);
            })
            .then((res) => setregion(res.data.region))
            .catch((err) => console.log(err));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        switch (product.platform) {
            case "XBOX":
                setplatform(xboxLogo);
                break;
            case "PS4-PS5":
                setplatform(playstationLogo);
                break;
            case "Android":
                setplatform(androidLogo);
                break;
            case "Steam":
                setplatform(steamLogo);
                break;
            case "Rockstar":
                setplatform(rockstarLogo);
                break;
            case "Origin":
                setplatform(originLogo);
                break;
            case "Battle.net":
                setplatform(battleNetLogo);
                break;
            case "GOG.com":
                setplatform(gogLogo);
                break;
            default:
                setplatform(otherLogo);
                break;
        }
        if (product.region !== undefined) {
            setregion(product.region.split(" ")[0]);
        }
    }, [product]);

    return (
        <div>
            <Header />
            <div className={`afterAddToCart ${display}`}>
                <div className="addedToCartIcon">{addedToCart}</div>
                <h1 className="afterAddToCartTitle">
                    {msgAfterAddToCart ? (
                        <span className="alreadyInCart">
                            {msgAfterAddToCart}
                        </span>
                    ) : (
                        "Product Added To Cart"
                    )}
                </h1>
                <div className="afterAddToCartButtons">
                    <Link to="/cart">
                        {" "}
                        <button
                            className="afterAddToCartButton"
                            onClick={() => {
                                setdisplay("notVisible");
                            }}
                        >
                            Go To Cart
                        </button>{" "}
                    </Link>{" "}
                    <button
                        className="afterAddToCartButton"
                        onClick={() => {
                            history.goBack();
                            setdisplay("notVisible");
                        }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
            {product === undefined ? (
                <h1>Loading</h1>
            ) : (
                <div className="cardDetails">
                    <div className="cardImgContainer">
                        <img className="cardImg" src={product.img} alt="card" />
                    </div>
                    <div className="cardDescription">
                        <h1 className="cardName">{product.name}</h1>
                        <div className="buyBox">
                            <div className="priceBox">
                                <h5 className="priceTitle">
                                    Price{" "}
                                    <span className="originalPrice">
                                        {product.originalPrice !==
                                        product.currentPrice
                                            ? product.originalPrice + "DT"
                                            : null}
                                    </span>
                                </h5>
                                <h3 className="priceNumber">
                                    {product.currentPrice} DT
                                </h3>
                            </div>
                            <div className="buyAddToCart">
                                <div className="addToCartButton"></div>{" "}
                                <div className="buyButton">
                                    <button
                                        disabled={user ? false : true}
                                        onClick={() => {
                                            setdisplay("");
                                            axios
                                                .post(
                                                    "/addToCart",
                                                    {
                                                        newProduct: {
                                                            ...product,
                                                            quantity: 1,
                                                        },
                                                    },
                                                    {
                                                        headers: {
                                                            authorization:
                                                                localStorage.getItem(
                                                                    "token"
                                                                ),
                                                        },
                                                    }
                                                )
                                                .then((res) => {
                                                    if (res.status === 201) {
                                                        setmsgAfterAddToCart(
                                                            "Product Already In Cart"
                                                        );
                                                    }
                                                })
                                                .catch((err) =>
                                                    console.log(err)
                                                );
                                        }}
                                    >
                                        {user ? "Buy" : "Please Login To Buy"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="informations">
                            <div className="infoBox region">
                                {" "}
                                <img
                                    className="infoIcons"
                                    src={worldIcon}
                                    alt="region"
                                ></img>
                                <div className="afterIcon">
                                    <h3>Region</h3>
                                    <h1> {region}</h1>
                                </div>
                            </div>
                            <div className="infoBox region">
                                {" "}
                                <img
                                    className="infoIcons"
                                    src={platform}
                                    alt="platform"
                                ></img>
                                <div className="afterIcon">
                                    <h3>Platform</h3>
                                    <h1> {product.platform}</h1>
                                </div>
                            </div>
                            <div className="infoBox type">
                                {" "}
                                <img
                                    className="infoIcons"
                                    src={keysLogo}
                                    alt="platform"
                                ></img>
                                <div className="afterIcon">
                                    <h3>Content</h3>
                                    <h1>Digital Key</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
