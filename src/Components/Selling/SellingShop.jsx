import React, { useEffect } from "react";
import "./SellingShop.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers, getMyOffers } from "../../Redux/actions/offer";
import { SellingShopCard } from "./SellingShopCard";

export const SellingShop = () => {
    const offers = useSelector((state) =>
        state.offerReducer.offer.filter((el) => el.status === "Approved")
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOffers());
        dispatch(getMyOffers());
    }, []);

    return (
        <div className="allOffers">
            {offers.map((item, index) => (
                <SellingShopCard item={item} key={index} />
            ))}
        </div>
    );
};
