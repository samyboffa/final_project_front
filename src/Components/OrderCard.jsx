import React from "react";
import "./OrderCard.css";
import OrderProductCard from "./OrderProductCard";

export default function OrderCard({ order }) {
    return (
        <div className="oneOrder">
            <h5 className="ordersNumber">order number : {order.orderNumber}</h5>
            <hr />
            <div className="orderItems">
                {order.products.map((product, ind) => (
                    <OrderProductCard
                        product={product}
                        key={ind}
                        num={ind}
                        status={order.status}
                    />
                ))}
            </div>
            <hr />
            <h4
                className="orderStatus"
                style={{
                    backgroundColor:
                        order.status === "Pending"
                            ? "#f5f7b2"
                            : order.status === "Preparing"
                            ? "#aad8d3"
                            : order.status === "Delivered"
                            ? "#9fe6a0"
                            : order.status === "Complete"
                            ? "#4aa96c"
                            : "#f5f7b2",
                }}
            >
                <span>Status : {order.status}</span>{" "}
                <div className="totalAndPriceOrders">
                    Total : {order.totalPrice} DT
                </div>{" "}
            </h4>
        </div>
    );
}
