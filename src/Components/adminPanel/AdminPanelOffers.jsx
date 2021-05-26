import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    admindeleteAllRejectedOffers,
    clearOffers,
    getAllOffers,
    getMyOffers,
} from "../../Redux/actions/offer";
import { Loading } from "../Loading";
import "./AdminPanelOffers.css";
import { AdminOfferCard } from "./AdminOfferCard";
import { useHistory } from "react-router";
import { okListing } from "../../svg/svg";

export const AdminPanelOffers = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOffers());
        dispatch(getMyOffers());
    }, []);
    const pendingOffers = useSelector((state) =>
        state.offerReducer.offer.filter((el) => el.status === "Pending")
    );
    const approvedOffers = useSelector((state) =>
        state.offerReducer.offer.filter((el) => el.status === "Approved")
    );
    const rejectedOffers = useSelector((state) =>
        state.offerReducer.offer.filter((el) => el.status === "Rejected")
    );
    const loadingOffers = useSelector((state) => state.offerReducer.loading);
    const offerUpdated = useSelector(
        (state) => state.offerReducer.offerUpdated
    );
    const rejectedCleaned = useSelector(
        (state) => state.offerReducer.rejectedCleaned
    );

    return loadingOffers ? (
        <Loading />
    ) : offerUpdated || rejectedCleaned ? (
        <div className="messageAfterAddingListing">
            <div className="messageAfterAddingListingIcon">{okListing}</div>
            <h1>
                {offerUpdated
                    ? "The Listing Is Updated"
                    : "All Rejected Offers Have been deleted"}
            </h1>

            <button
                className="messageAfterAddingListingButton"
                onClick={() => {
                    dispatch(getAllOffers());
                    dispatch(clearOffers());
                }}
            >
                Go Back
            </button>
        </div>
    ) : (
        <div className="allOffers">
            <div className="adminClearRejectedBox">
                <button
                    className="adminClearRejectedButton"
                    onClick={() => {
                        dispatch(admindeleteAllRejectedOffers());
                    }}
                >
                    {" "}
                    Delete All Rejected Offers{" "}
                </button>
            </div>

            <h2>Pending Offers</h2>
            {pendingOffers.length === 0 ? (
                <div className="OffersEmpty">
                    <h4>No Pending Offers</h4>
                </div>
            ) : (
                pendingOffers.map((item, index) => (
                    <AdminOfferCard item={item} key={index} />
                ))
            )}
            <h2>Approved Offers</h2>
            {approvedOffers.length === 0 ? (
                <div className="OffersEmpty">
                    <h4>No Approved Offers</h4>
                </div>
            ) : (
                approvedOffers.map((item, index) => (
                    <AdminOfferCard item={item} key={index} />
                ))
            )}
            <h2>Rejected Offers</h2>
            {rejectedOffers.length === 0 ? (
                <div className="OffersEmpty">
                    <h4>No rejected Offers</h4>
                </div>
            ) : (
                rejectedOffers.map((item, index) => (
                    <AdminOfferCard item={item} key={index} />
                ))
            )}
        </div>
    );
};
