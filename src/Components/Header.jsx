import React, { useEffect, useState } from "react";
import "./Header.css";
import {
    navIcon,
    loop,
    back,
    profile,
    orders,
    notif,
    backRight,
    user as userIcon,
    userName,
    cart,
    controlPanel,
} from "../svg/svg";
import { Link, useHistory } from "react-router-dom";
import { GiftCardCard } from "./GiftCardCard";
import mainLogo from "../images/LOGO.png";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logout } from "../Redux/actions/user";
import { getProducts } from "../Redux/actions/products";
import { Loading } from "./Loading";
import { getTopUp } from "../Redux/actions/topUp";

export default function Header() {
    const [activeClass, setactiveClass] = useState("");
    const [searchInput, setsearchInput] = useState("0000");
    const [resultProducts, setresultProducts] = useState([1, 2]);
    const [searchShown, setsearchShown] = useState("none");
    const [activeUser, setactiveUser] = useState("");
    const history = useHistory();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUser());
        dispatch(getProducts());
        dispatch(getTopUp());
    }, []);
    useEffect(() => {
        setresultProducts(
            products.filter((el) =>
                el.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
    }, [searchInput]);
    const products = useSelector((state) => state.productsReducer.products);

    const user = useSelector((state) => state.userReducer.user);
    const admin = useSelector((state) => state.userReducer.admin);
    const userLoading = useSelector((state) => state.userReducer.loading);

    return userLoading ? (
        <Loading />
    ) : (
        <div className="allHeader">
            <div className="logoSearch">
                <Link to="/">
                    <div className="logo">
                        {" "}
                        <img className="mainLogo" src={mainLogo} alt="" />{" "}
                    </div>
                </Link>
                <div
                    className="searchBar"
                    onClick={() => setsearchShown("block")}
                >
                    <input type="text" placeholder="Search For Games" />
                    <div className="loop"> {loop}</div>
                </div>
            </div>
            <div className="navLogin">
                <div className={`nav ${activeClass}`}>
                    <Link to="/games">
                        <li
                            onClick={() => {
                                !activeClass
                                    ? setactiveClass("active")
                                    : setactiveClass("");
                            }}
                        >
                            Games
                        </li>
                    </Link>
                    <Link to="/topup">
                        <li
                            onClick={() => {
                                !activeClass
                                    ? setactiveClass("active")
                                    : setactiveClass("");
                            }}
                        >
                            Top-Up
                        </li>
                    </Link>
                    <Link to="/giftcards">
                        <li
                            onClick={() => {
                                !activeClass
                                    ? setactiveClass("active")
                                    : setactiveClass("");
                            }}
                        >
                            Gift Cards
                        </li>
                    </Link>
                    {user ? (
                        <Link to="/sellshop">
                            <li
                                onClick={() => {
                                    !activeClass
                                        ? setactiveClass("active")
                                        : setactiveClass("");
                                }}
                            >
                                Sell With B-SHOP
                            </li>
                        </Link>
                    ) : null}
                </div>
                <div
                    className="navIcon"
                    onClick={() => {
                        !activeClass
                            ? setactiveClass("active")
                            : setactiveClass("");
                    }}
                >
                    {navIcon}
                </div>

                <div className="login">
                    {user ? (
                        <div className="UserNameandCart">
                            <Link to="/cart">
                                <h4>
                                    <div className="cartAndNumber">
                                        {cart}{" "}
                                        <span className="cartQuantity">
                                            {user.cart.length
                                                ? user.cart.length
                                                : 0}
                                        </span>{" "}
                                    </div>
                                </h4>
                            </Link>
                            <h3
                                className="userName"
                                onClick={() =>
                                    !activeUser
                                        ? setactiveUser("active")
                                        : setactiveUser("")
                                }
                            >
                                {userName}
                                {user.name.split(" ")[0]}
                            </h3>
                        </div>
                    ) : (
                        <Link to="/login"> Login/Sign Up</Link>
                    )}
                </div>
            </div>
            {user ? (
                <div className={`userMenu ${activeUser}`}>
                    <div
                        className="backUser"
                        onClick={() =>
                            !activeUser
                                ? setactiveUser("active")
                                : setactiveUser("")
                        }
                    >
                        {backRight}
                    </div>
                    <div className="userMenuList">
                        {admin ? (
                            <Link to="/adminPanel">
                                <h4
                                    onClick={() =>
                                        !activeUser
                                            ? setactiveUser("active")
                                            : setactiveUser("")
                                    }
                                >
                                    Admin Control Panel {controlPanel}
                                </h4>
                            </Link>
                        ) : null}

                        <Link to="/profile">
                            <h4
                                onClick={() =>
                                    !activeUser
                                        ? setactiveUser("active")
                                        : setactiveUser("")
                                }
                            >
                                My Profile {profile}
                            </h4>
                        </Link>
                        <Link to="/myorders">
                            <h4
                                onClick={() =>
                                    !activeUser
                                        ? setactiveUser("active")
                                        : setactiveUser("")
                                }
                            >
                                {" "}
                                My Orders {orders}
                            </h4>
                        </Link>
                        <Link to="/notif">
                            <h4
                                onClick={() =>
                                    !activeUser
                                        ? setactiveUser("active")
                                        : setactiveUser("")
                                }
                            >
                                Notifications{notif}
                            </h4>
                        </Link>
                        <button
                            className="logOutButton"
                            onClick={() => {
                                dispatch(logout());
                                history.push("/");

                                !activeUser
                                    ? setactiveUser("active")
                                    : setactiveUser("");
                            }}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            ) : null}

            <div className="searchTotal" style={{ display: searchShown }}>
                {" "}
                <div
                    className="cancelSearch"
                    onClick={() => setsearchShown("none")}
                >
                    {back}
                </div>
                <div className="inputSearch">
                    <input
                        type="text"
                        name=""
                        placeholder="Search for Games, Gift Cards ..."
                        autoFocus={true}
                        onChange={(e) => setsearchInput(e.target.value)}
                    />
                </div>
                <div className="searchResult">
                    {resultProducts === undefined ? (
                        <h1>Loading</h1>
                    ) : resultProducts.length !== 0 ? (
                        resultProducts.map((product, index) => (
                            <Link
                                to={`/giftcards/${product._id}`}
                                onClick={() => {
                                    setTimeout(() => {
                                        setsearchShown("none");
                                    }, 200);
                                }}
                            >
                                <GiftCardCard
                                    key={index}
                                    img={product.img}
                                    currentPrice={product.currentPrice}
                                    originalPrice={product.originalPrice}
                                    name={product.name}
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="nothingFound">
                            <h1>Nothing Found</h1>
                            <h4>Please Search Again</h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
