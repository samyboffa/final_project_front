import React, { useState } from "react";
import { useDispatch } from "react-redux";
import userIcon from "../../images/userIcon.png";
import { adminManageOffer } from "../../Redux/actions/offer";
import "./AdminOfferCard.css";

export const AdminOfferCard = ({ item }) => {
    const dispatch = useDispatch();
    const [reason, setreason] = useState("");
    return (
        <div className="adminoneOfferItemTotal">
            <div className="adminoneOfferItem">
                <img className="adminofferItemImg" src={userIcon} alt="" />
                <div className="adminofferItemAfterImage">
                    <div
                        className="adminofferItemNumber"
                        style={{
                            backgroundColor:
                                item.status === "Pending"
                                    ? "#f5f7b2"
                                    : item.status === "Approved"
                                    ? "#9fe6a0"
                                    : item.status === "Rejected"
                                    ? "#ff7b54"
                                    : "#f5f7b2",
                        }}
                    >
                        <span>{item.itemNumber}</span>

                        <span>status : {item.status}</span>
                    </div>

                    <div className="adminofferItemName">
                        <h2>{item.itemName}</h2>
                        <h5 className="adminofferItemNameDescription">
                            {item.itemDescription}
                        </h5>
                    </div>
                    <hr />
                    <div className="adminsellerSection">
                        <h5 className="adminbuyingFrom">
                            Seller : {item.sellerName}
                        </h5>
                        <h5 className="adminbuyingFrom">
                            N° : {item.sellerPhoneNumber}
                        </h5>
                    </div>
                    <hr />

                    <div className="adminbuyButtonOfferItem">
                        <h3 className="adminofferItemPrice">
                            {item.itemPrice} DT
                        </h3>
                    </div>
                </div>
            </div>
            <div className="adminButtonsManage">
                <button
                    className="adminButtonsManageButtons adminAccept"
                    onClick={() => {
                        dispatch(
                            adminManageOffer(
                                item.itemNumber,
                                "Approved",
                                `Your Listing Number ${item.itemNumber} Is Approved`
                            )
                        );
                    }}
                >
                    {" "}
                    Accept Offer
                </button>
                <button
                    className="adminButtonsManageButtons adminDecline"
                    disabled={reason.length < 5 ? true : false}
                    onClick={() => {
                        dispatch(
                            adminManageOffer(
                                item.itemNumber,
                                "Rejected",
                                `Your Listing Number ${item.itemNumber} Is Rejected.. reason : ${reason}`
                            )
                        );
                    }}
                >
                    Decline Offer
                </button>
                <div className="adminButtonsManageReasons">
                    <input
                        type="text"
                        placeholder="Reasons Of Declining The Offer"
                        onChange={(e) => setreason(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
