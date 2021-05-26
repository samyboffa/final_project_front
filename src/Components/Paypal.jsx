import React, { useEffect, useRef, useState } from "react";

export const Paypal = ({ amount }) => {
    console.log(amount);
    const paypal = useRef();
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, error) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "table",
                                amount: {
                                    value: 3.2,
                                    currency: "USD",
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
};
