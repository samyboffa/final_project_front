import React, { useState } from "react";
import "./ListingCard.css";
import userIcon from "../../images/userIcon.png";
import {
    clearOffers,
    deleteOffer,
    getMyOffers,
    updateOffers,
} from "../../Redux/actions/offer";
import { useDispatch, useSelector } from "react-redux";
import { okListing } from "../../svg/svg";
import { useHistory } from "react-router";

export const ListingCard = ({ item }) => {
    const [display, setdisplay] = useState("none");
    const [itemName, setItemName] = useState();
    const [itemType, setItemType] = useState();
    const [itemDescription, setItemDescription] = useState();
    const [itemPrice, setitemPrice] = useState();
    const dispatch = useDispatch();
    const offerUpdated = useSelector(
        (state) => state.offerReducer.offerUpdated
    );
    const offerDeleted = useSelector(
        (state) => state.offerReducer.offerDeleted
    );
    const history = useHistory();

    return (
        <div>
            {offerUpdated || offerDeleted ? (
                <div className="messageAfterAddingListing messageAfterAddingListingMy">
                    <div className="messageAfterAddingListingIcon">
                        {okListing}
                    </div>
                    <h1>
                        Your Listing is{" "}
                        {offerUpdated ? "Modified And Under Review" : "Deleted"}{" "}
                    </h1>
                    <h3>{offerUpdated ? "Please Wait For Approval" : null}</h3>
                    <button
                        className="messageAfterAddingListingButton"
                        onClick={() => {
                            dispatch(clearOffers());
                            history.push("/sellmylisting");
                        }}
                    >
                        Go Back
                    </button>
                </div>
            ) : null}
            <div className="oneOfferItemBox">
                <div className="oneOfferItemMy">
                    <img className="offerItemImg" src={userIcon} alt="" />
                    <div className="offerItemAfterImage">
                        <div
                            className="offerItemNumber"
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

                        <div className="offerItemName">
                            <h2>{item.itemName}</h2>
                            <h5 className="offerItemNameDescription">
                                {item.itemDescription}
                            </h5>
                        </div>
                        <hr />
                        <div className="sellerSection">
                            <div>
                                <h5 className="buyingFrom">
                                    Seller : {item.sellerName}
                                </h5>
                                <h5 className="buyingFrom">
                                    N° : {item.sellerPhoneNumber}
                                </h5>
                            </div>
                        </div>
                        <hr />
                        <div className="buyButtonOfferItem">
                            <h3 className="offerItemPrice">
                                {item.itemPrice} DT
                            </h3>
                            <button
                                className="buyButtonOfferItemButtonMy"
                                onClick={() =>
                                    display === "none"
                                        ? setdisplay("block")
                                        : setdisplay("none")
                                }
                            >
                                {" "}
                                Edit Order
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`offerItemEdit `} style={{ display: display }}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="offerItemEditBoxInput">
                            <input
                                required
                                type="text"
                                placeholder="Item Name"
                                onChange={(e) => {
                                    setItemName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="offerItemEditBoxInput">
                            <input
                                required
                                type="text"
                                placeholder="Item Type"
                                onChange={(e) => {
                                    setItemType(e.target.value);
                                }}
                            />
                        </div>
                        <div className="offerItemEditBoxInput">
                            <textarea
                                required
                                type="text"
                                placeholder="Description"
                                onChange={(e) => {
                                    setItemDescription(e.target.value);
                                }}
                            />
                        </div>
                        <div className="offerItemEditBoxInput">
                            <input
                                required={true}
                                type="number"
                                placeholder="Price"
                                onChange={(e) => {
                                    setitemPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="buttonConfirmBox">
                            <button
                                className="buyButtonOfferItemButtonMy"
                                type="submit"
                                disabled={
                                    itemName &&
                                    itemType &&
                                    itemDescription &&
                                    itemPrice
                                        ? false
                                        : true
                                }
                                onClick={() => {
                                    dispatch(
                                        updateOffers({
                                            itemNumber: item.itemNumber,
                                            itemName: itemName,
                                            itemType: itemType,
                                            itemDescription: itemDescription,
                                            itemPrice: itemPrice,
                                        })
                                    );
                                    dispatch(getMyOffers());
                                }}
                            >
                                {" "}
                                confirm
                            </button>
                            <button
                                type="submit"
                                className="buyButtonOfferItemButtonMy deleteOffer"
                                onClick={() => {
                                    dispatch(
                                        deleteOffer({
                                            itemNumber: item.itemNumber,
                                        })
                                    );
                                    dispatch(getMyOffers());
                                }}
                            >
                                {" "}
                                Delete (Sold)
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
