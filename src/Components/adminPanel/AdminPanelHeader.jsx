import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { verifyAdmin } from "../../Redux/actions/products";
import OnlyAdmins from "../OnlyAdmins";
import "./AdminPanelHeader.css";

export const AdminPanelHeader = () => {
    const errStatus = useSelector((state) => state.ordersReducer.error);
    const errStatus1 = useSelector((state) => state.offerReducer.error);
    console.log(errStatus);
    console.log(errStatus1);

    return errStatus === 401 || errStatus1 === 401 ? (
        <OnlyAdmins />
    ) : (
        <div className="adminPanelHeader">
            <Link to="/AdminPanel">
                <h4>Dashboard</h4>
            </Link>
            <Link to="/AdminPanelPoductsMngmt">
                <h4>My Products</h4>
            </Link>
            <Link to="/AdminPanelOrdersMngmt">
                <h4>Orders Management</h4>
            </Link>

            <Link to="/AdminPanelOffersMngmt">
                <h4>Seller's Offers</h4>
            </Link>
        </div>
    );
};
