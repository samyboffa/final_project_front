import React, { useEffect } from "react";
import { Loading } from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers } from "../../Redux/actions/offer";
import { getAllOrders } from "../../Redux/actions/orders";
import { getProducts } from "../../Redux/actions/products";
import "./AdminPanel.css";
import { AdminPanelHeader } from "./AdminPanelHeader";
import {
    adminOffers,
    adminOrders,
    adminProduct,
    adminUsers,
} from "../../svg/svg";

export const AdminPanel = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getAllOrders());
        dispatch(getAllOffers());
    }, []);

    const allProducts = useSelector((state) => state.productsReducer.products);
    const allOrders = useSelector((state) => state.ordersReducer.orders);
    const allOffers = useSelector((state) => state.offerReducer.offer);
    const loadingProducts = useSelector(
        (state) => state.productsReducer.loading
    );
    const loadingOrders = useSelector((state) => state.ordersReducer.loading);
    const loadingOffers = useSelector((state) => state.offerReducer.loading);

    return loadingProducts || loadingOrders || loadingOffers ? (
        <Loading />
    ) : (
        <div className="aminPanelPage">
            <AdminPanelHeader />
            <h1 className="adminPanelGreetings">Hello Admin</h1>
            <div className="adminPanelBoxes">
                <div className="adminPanelBox userBox">
                    <h4 className="adminPanelBoxText">
                        {adminUsers}
                        <span className="adminPanelBoxTextNumber">30</span>{" "}
                        <br /> Users
                    </h4>{" "}
                </div>
                <div className="adminPanelBox productsBox">
                    {adminProduct}
                    <h4 className="adminPanelBoxText">
                        <span className="adminPanelBoxTextNumber">
                            {allProducts.length}
                        </span>{" "}
                        <br /> Products
                    </h4>
                </div>
                <div className="adminPanelBox OrdersBox">
                    <h4 className="adminPanelBoxText">
                        {adminOrders}
                        <span className="adminPanelBoxTextNumber">
                            {allOrders.length}
                        </span>
                        <br /> Orders
                    </h4>
                </div>
                <div className="adminPanelBox OffersBox">
                    <h4 className="adminPanelBoxText">
                        {adminOffers}
                        <span className="adminPanelBoxTextNumber">
                            {allOffers.length}{" "}
                        </span>
                        <br /> Seller's Offer
                    </h4>
                </div>
            </div>
        </div>
    );
};
