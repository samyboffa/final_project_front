import React, { useEffect, useState } from "react";
import { bin, moin, plus, verified } from "../svg/svg";
import "./CartElement.css";
import worldIcon from "../images/world.png";
import axios from "axios";
import { useHistory } from "react-router";
import userIcon from "../images/userIcon.png";

export const CartElement = ({ productprops, removeIt }) => {
    const [product, setproduct] = useState(productprops);
    const [productSubTotal, setProductSubTotal] = useState(
        productprops.currentPrice * productprops.quantity
    );
    console.log(product);
    const history = useHistory();

    const changeQuantity = (operation) => {
        axios
            .post(
                "/changeQuantity",
                {
                    id: productprops._id,
                    operation: operation,
                },
                { headers: { authorization: localStorage.token } }
            )
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        history.push("/");
        setTimeout(() => {
            history.push("/cart");
        }, 50);
    };

    return !product ? (
        <h1>loadind</h1>
    ) : (
        <div className="cartElt">
            <img
                className="cartEltImg"
                src={
                    product.type === "TOPUP" ? product.currencyImg : product.img
                }
                alt=""
            />

            <div className="cartEltDescription">
                <h5 className="cartEltSeller">
                    {" "}
                    You Are buying from
                    <br />
                    {product.seller ? (
                        product.seller
                    ) : (
                        <span className="sellerBSHOP">{verified}B-SHOP</span>
                    )}
                </h5>
                <h3 className="cartEltName">{product.name}</h3>
                <div className="CartEltStore">
                    <img className="CartEltRegionIcon" src={worldIcon} alt="" />{" "}
                    <h5>
                        {product.region ? product.region.split(" ")[0] : null}
                    </h5>
                </div>
                <h3>Price : {productprops.currentPrice}DT</h3>
            </div>

            <div className="plusMoinExt">
                <div className="plusMoin">
                    <button
                        className="CartEltMoin CartEltButton"
                        onClick={() => {
                            changeQuantity("minus");
                        }}
                    >
                        {" "}
                        {moin}{" "}
                    </button>
                    <h2>{productprops.quantity}</h2>
                    <button
                        className="CartEltPlus CartEltButton"
                        onClick={() => {
                            changeQuantity("plus");
                        }}
                    >
                        {" "}
                        {plus}{" "}
                    </button>
                </div>
            </div>
            <h1 className="cartEltSubTotal">{productSubTotal}DT</h1>

            <div
                className="cartEltRemove"
                onClick={() => {
                    removeIt(product._id);
                }}
            >
                {" "}
                {bin}
            </div>
        </div>
    );
};
