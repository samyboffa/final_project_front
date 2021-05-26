import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Cart.css";
import { CartElement } from "./CartElement";
import logoCart from "../images/LOGOLOADING.png";
import { back, cashOut } from "../svg/svg";
import ReactDOM from "react-dom";
import { Paypal } from "./Paypal";

export const Cart = () => {
    const [cart, setcart] = useState();
    const history = useHistory();
    const [totalPrice, settotalPrice] = useState();
    const [userId, setuserId] = useState();
    const [display, setdisplay] = useState("none");
    const getCart = () => {
        axios
            .get("/getUser", { headers: { authorization: localStorage.token } })
            .then((data) => {
                let x = 0;
                setcart(data.data.cart);
                setuserId(data.data._id);
                data.data.cart.forEach((el) => {
                    x = x + el.currentPrice * el.quantity;
                    settotalPrice(x);
                });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getCart();
    }, []);
    const clearCart = () => {
        axios.post(
            "/clearCart",
            {},
            {
                headers: { authorization: localStorage.token },
            }
        );
    };

    const removeItemFromCart = (id) => {
        axios
            .post(
                "removeFromCart",
                { gameToRemove: id },
                {
                    headers: { authorization: localStorage.token },
                }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        history.goBack();
        setTimeout(() => {
            history.push("/cart");
        }, 100);
    };
    return !cart ? (
        <h1>Loading</h1>
    ) : (
        <div>
            <div className="windowAfterPurchase" style={{ display: display }}>
                <div className="windowAfterPurchaseLogo">{cashOut}</div>
                <div className="windowAfterPurchaseText">
                    <h2>THANK YOU FOR YOUR PURCHASE</h2> <h2>Order Saved</h2>{" "}
                    <h4>Purchase Receipt Sent To Your Mail</h4>
                    <h4>Please Wait For Delivery</h4>
                    <Link to="/">
                        <button className="windowAfterPurchaseButton">
                            Back To Home Page
                        </button>
                    </Link>
                </div>
            </div>
            <div className="cartHeader">
                <Link to="/">
                    <img className="cartHeaderImg" src={logoCart} alt="" />
                </Link>
                <h1>B-SHOP CHECKOUT</h1>
            </div>
            <Link to="/">
                <div className="backButton">{back}</div>
            </Link>{" "}
            <div className="allCart">
                <div className="leftCart">
                    <h1 className="cartTitle">Cart</h1>
                    <div className="cartBody">
                        {cart === undefined ? (
                            <div>Loading</div>
                        ) : cart.length === 0 ? (
                            <div className="emptyCart">
                                <h1 className="emptyCartTitle">
                                    No Items In Cart
                                </h1>
                                <Link to="/">Go Back Shopping</Link>
                            </div>
                        ) : (
                            cart.map((element, key) => (
                                <CartElement
                                    productprops={element}
                                    key={key}
                                    removeIt={removeItemFromCart}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className="rightCart">
                    {" "}
                    <h1 className="rightCartTitle">Summary</h1>
                    <div className="numberOfProductAndPrice">
                        <div className="rightCartNumberOfProduct">
                            {cart.length === 0 ? null : cart.length === 1 ? (
                                <h3>{cart.length} Product </h3>
                            ) : (
                                <h3>{cart.length} Products</h3>
                            )}
                        </div>
                        <div className="rightCartTotal">
                            {" "}
                            <h2> Total : {totalPrice} DT</h2>
                        </div>
                    </div>
                    <hr />
                    <div className="checkoutBox">
                        {" "}
                        <h1 className="checkoutBoxTotal">
                            TOTAL : {totalPrice} DT
                        </h1>
                        <div className="checkoutButtonBox">
                            <button
                                className="checkoutButton"
                                onClick={() => {
                                    axios
                                        .post(
                                            "/newOrder",
                                            {
                                                clientId: userId,
                                                products: cart,
                                                totalPrice: totalPrice,
                                            },
                                            {
                                                headers: {
                                                    authorization:
                                                        localStorage.token,
                                                },
                                            }
                                        )
                                        .then((res) => {
                                            if (res.status === 200) {
                                                setdisplay("flex");
                                                clearCart();
                                            }
                                        })
                                        .catch((err) => console.log(err));
                                }}
                            >
                                Checkout Now(fake)
                            </button>
                        </div>
                        <div className="checkoutBoxPaypal">
                            <Paypal amount={totalPrice / 3.2} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
