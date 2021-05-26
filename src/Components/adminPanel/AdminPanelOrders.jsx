import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeStatusOrders,
    clearOrders,
    getAllOrders,
} from "../../Redux/actions/orders";
import { okListing } from "../../svg/svg";
import { Loading } from "../Loading";
import "./AdminPanelOrders.css";

export const AdminPanelOrders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrders());
    }, []);

    const allOrders = useSelector((state) => state.ordersReducer.orders);
    const loadingOrders = useSelector((state) => state.ordersReducer.loading);
    const orderUpdated = useSelector(
        (state) => state.ordersReducer.orderUpdated
    );

    return loadingOrders ? (
        <Loading />
    ) : orderUpdated ? (
        <div className="msgAfterUpdatingOrder">
            <div className="msgAfterUpdatingOrderIcon">{okListing}</div>
            <h1>Order Status Updated</h1>
            <button
                className="msgAfterUpdatingOrderButton"
                onClick={() => {
                    dispatch(clearOrders());
                    dispatch(getAllOrders());
                }}
            >
                Go Back
            </button>
        </div>
    ) : (
        allOrders.map((el, index) => (
            <>
                <div className="oneOrder adminOneOrder" key={index}>
                    <h5 className="ordersNumber">
                        order number : {el.orderNumber}
                    </h5>
                    <hr />
                    <div className="orderItems">
                        {el.products.map((product, ind) => (
                            <div className="productItem" key={ind}>
                                <h3 className="productItemName">
                                    <div className="productItemNameName">
                                        item {ind + 1} : {product.name}
                                    </div>{" "}
                                    <hr />
                                    <span className="productItemNameUnitPrice">
                                        unit Price : {product.currentPrice} DT
                                    </span>
                                    <hr />
                                    <span> quantity : {product.quantity}</span>
                                    <hr />
                                    <span>
                                        {product.currentPrice *
                                            product.quantity}{" "}
                                        DT
                                    </span>
                                </h3>
                                <hr />
                            </div>
                        ))}
                    </div>
                    <hr />
                    <h4
                        className="orderStatus"
                        style={{
                            backgroundColor:
                                el.status === "Pending"
                                    ? "#f5f7b2"
                                    : el.status === "Preparing"
                                    ? "#aad8d3"
                                    : el.status === "Delivered"
                                    ? "#9fe6a0"
                                    : el.status === "Complete"
                                    ? "#4aa96c"
                                    : el.status === "Delivered"
                                    ? "#9fe6a0"
                                    : el.status === "Canceled"
                                    ? "#ff7b54"
                                    : "#f5f7b2",
                        }}
                    >
                        <span>Status : {el.status}</span>{" "}
                        <div className="totalAndPriceOrders">
                            Total : {el.totalPrice} DT
                        </div>{" "}
                    </h4>
                </div>
                <div className="adminOrdersButtonsBox">
                    <h2>Update Status : </h2>
                    <button
                        className="adminOrdersButtons"
                        onClick={() => {
                            dispatch(
                                changeStatusOrders(
                                    el.orderNumber,
                                    "Preparing",
                                    `Order Number ${el.orderNumber} ,  Is being prepared. Please wait for delivery`
                                )
                            );
                        }}
                    >
                        {" "}
                        set as Preparing{" "}
                    </button>
                    <button
                        className="adminOrdersButtons completeBtn "
                        onClick={() => {
                            dispatch(
                                changeStatusOrders(
                                    el.orderNumber,
                                    "Complete",
                                    `Order Number ${el.orderNumber} ,  Is Delivered A mail was Sent with All Keys`
                                )
                            );
                        }}
                    >
                        {`set as Deliverd & complete`}{" "}
                    </button>
                </div>
            </>
        ))
    );
};
