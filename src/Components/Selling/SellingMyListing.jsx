import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOffers } from "../../Redux/actions/offer";
import "./SellingMyListing.css";
import { Loading } from "../Loading";
import { ListingCard } from "./ListingCard";
import AccesDenied from "../AccessDenied";

export const SellingMyListing = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyOffers());
    }, []);

    const myOffers = useSelector((state) => state.offerReducer.myOffer);

    return (
        <div className="allOffers">
            {myOffers.map((item, index) => (
                <ListingCard item={item} key={index} />
            ))}
        </div>
    );
};
