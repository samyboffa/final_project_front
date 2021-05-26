import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { rateSeller } from "../Redux/actions/user";
import { rateDisLike, rateLike } from "../svg/svg";
import "./OrderProductCard.css";

export default function OrderProductCard({ product, num, status }) {
    const [note, setnote] = useState();
    const [likeClicked, setlikeClicked] = useState(false);
    const [dislikeClicked, setdislikeClicked] = useState(false);
    const [msg, setmsg] = useState("");
    const dispatch = useDispatch();
    return (
        <div className="productItem">
            <h3 className="productItemName">
                <span className="productItemNameName">
                    item {num + 1} : {product.name}
                </span>{" "}
                <hr />
                <span className="productItemNameUnitPrice">
                    unit Price : {product.currentPrice} DT
                </span>
                <hr />
                <span> quantity : {product.quantity}</span>
                <hr />
                <span>{product.currentPrice * product.quantity} DT</span>
            </h3>
            <hr />
            {status === "Complete" && product.seller ? (
                <div className="RatingSeller">
                    <h3>please Rate The Seller : </h3>
                    <div className="RatingSellerBtnsInput">
                        <h5
                            className={`RatingSellerBtn likeBtn ${
                                likeClicked ? "likeClicked" : null
                            }`}
                            onClick={() => {
                                setlikeClicked(true);
                                setdislikeClicked(false);
                                setnote(100);
                            }}
                        >
                            {" "}
                            like {rateLike}
                        </h5>
                        <h5
                            className={`RatingSellerBtn dislikeBtn ${
                                dislikeClicked ? "dislikeClicked" : null
                            }`}
                            onClick={() => {
                                setlikeClicked(false);
                                setdislikeClicked(true);
                                setnote(0);
                            }}
                        >
                            {" "}
                            dislike {rateDisLike}
                        </h5>
                        <div className="inputRateSeller">
                            {" "}
                            <input
                                placeholder="Please Leave A Comment"
                                className="inputRateSellerInput"
                                type="text"
                                onChange={(e) => setmsg(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="submitRateBox">
                        {" "}
                        <button
                            className="submitRateBoxButton"
                            onClick={() => {
                                if ((likeClicked || dislikeClicked) && msg) {
                                    dispatch(
                                        rateSeller({
                                            sellerId: product.sellerId,

                                            note: note,
                                            msg: msg,
                                        })
                                    );
                                } else {
                                    console.log("nooo");
                                }
                            }}
                        >
                            {" "}
                            Submit Rating
                        </button>
                    </div>
                </div>
            ) : null}
            <hr />
        </div>
    );
}
