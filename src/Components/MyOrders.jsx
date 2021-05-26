import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./Loading";
import { getMyOrders } from "../Redux/actions/orders";
import "./MyOrders.css";
import OrderCard from "./OrderCard";

export const MyOrders = () => {
    const dispatch = useDispatch();

    useEffect(async () => {
        dispatch(getMyOrders(userId));
    }, []);
    const userId = useSelector((state) => state.userReducer.user._Id);
    const orderLoading = useSelector((state) => state.ordersReducer.loading);
    const myOrders = useSelector((state) => state.ordersReducer.orders);
    console.log(myOrders);

    return (
        <div className="myOrdersPage">
            <h1 className="myOrdersPageTitle">My Orders</h1>
            {orderLoading ? (
                <Loading />
            ) : myOrders.length === 0 ? (
                <div className="ordersEmptyBox">
                    <h1 className="ordersEmptyBoxText">You Have No Orders</h1>
                    <h2 className="ordersEmptyBoxText"> Go Back Shopping</h2>
                </div>
            ) : (
                myOrders.map((el, index) => (
                    <>
                        <OrderCard order={el} key={index} />
                        {/* <div className="cancelBox">
                            <button className="cancelBoxButton">
                                {" "}
                                {`Cancel Order & Ask For Refund`}
                            </button>
                        </div> */}
                    </>
                ))
            )}
        </div>
    );
};
