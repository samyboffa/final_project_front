import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOffers } from "../../Redux/actions/offer";
import AccesDenied from "../AccessDenied";
import { Loading } from "../Loading";
import "./SellingHeader.css";

export const SellingHeader = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOffers());
    }, []);

    const offerErr = useSelector((state) => state.offerReducer.error);
    const loading = useSelector((state) => state.offerReducer.loading);

    return offerErr === 401 ? (
        <AccesDenied />
    ) : loading ? (
        <Loading />
    ) : (
        <div className="sellingHeader">
            <Link to="/selladd">
                <h4>Propose Listing</h4>
            </Link>

            <Link to="sellshop">
                <h4> Shop</h4>
            </Link>
            <Link to="/sellmylisting">
                <h4>My Listing</h4>
            </Link>
        </div>
    );
};
