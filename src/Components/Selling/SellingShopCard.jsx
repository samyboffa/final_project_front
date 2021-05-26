import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import userIcon from "../../images/userIcon.png";
import { getCurrentUser } from "../../Redux/actions/user";
import "./SellingShopCard.css";

export const SellingShopCard = ({ item }) => {
    const dispatch = useDispatch();
    const [msg, setmsg] = useState("Buy Now");
    console.log(item.sellerRate);
    let x = 0;
    item.sellerRate.forEach((element) => {
        x = x + element.note;
    });
    x = x / item.sellerRate.length;

    return (
        <div className="oneOfferItem">
            <img className="offerItemImg" src={userIcon} alt="" />
            <div className="offerItemAfterImage">
                <div className="offerItemNumber">{item.itemNumber}</div>

                <div className="offerItemName">
                    <h2>{item.itemName}</h2>
                    <h5 className="offerItemNameDescription">
                        {item.itemDescription}
                    </h5>
                </div>
                <hr />
                <div className="sellerSection">
                    <div>
                        <h5 className="buyingFrom ">
                            Seller : {item.sellerName}
                        </h5>
                        <h5 className="buyingFrom">
                            N° : {item.sellerPhoneNumber}
                        </h5>
                    </div>
                    <div className="sellerRate">
                        <h4 className="ordersNumber">
                            {item.sellerRate.length} Orders :{" "}
                        </h4>
                        <h4 className="successfullRate">
                            {item.sellerRate.length === 0
                                ? "No Successfull Orders"
                                : "Successfull Rate:" +
                                  Math.round(x * 100) / 100 +
                                  "%"}
                        </h4>
                    </div>
                </div>
                <hr />

                <div className="buyButtonOfferItem">
                    <h3 className="offerItemPrice">{item.itemPrice} DT</h3>
                    <button
                        className="buyButtonOfferItemButton"
                        onClick={() => {
                            axios
                                .post(
                                    "/addToCart",
                                    {
                                        newProduct: {
                                            _id: item._id,
                                            sellerId: item.sellerId,
                                            seller: item.sellerName,
                                            itemNumber: item.itemNumber,
                                            name: item.itemName,
                                            currentPrice: item.itemPrice,
                                            rated: false,
                                            img: "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
                                            quantity: 1,
                                        },
                                    },
                                    {
                                        headers: {
                                            authorization:
                                                localStorage.getItem("token"),
                                        },
                                    }
                                )
                                .then((res) => {
                                    if (res.status === 201) {
                                        setmsg("Product Already In Cart");
                                    }
                                    if (res.status === 200) {
                                        setmsg("Product Added To Cart");
                                    }
                                    setTimeout(() => {
                                        setmsg("Buy Now");
                                    }, 2500);
                                    dispatch(getCurrentUser());
                                })
                                .catch((err) => console.log(err));
                        }}
                    >
                        {" "}
                        {msg}
                    </button>
                </div>
            </div>
        </div>
    );
};
