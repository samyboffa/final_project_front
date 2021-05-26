import React from "react";
import "./GiftCardCard.css";
export const GiftCardCard = ({ img, name, currentPrice, originalPrice }) => {
    return (
        <div className="gCardCard">
            <div>
                <img className="poster" src={img} alt="" />
            </div>
            <div className="info">
                <h4> {name} </h4>
                <div className="discount">
                    <h2>{`${Math.ceil(
                        100 - (currentPrice * 100) / originalPrice
                    )}%`}</h2>{" "}
                </div>
                <div className="prices">
                    <h4 className="originalPrice"> {`${originalPrice}DT`} </h4>
                    <h1 className="currentPrice"> {`${currentPrice}DT`} </h1>
                </div>
            </div>
        </div>
    );
};
