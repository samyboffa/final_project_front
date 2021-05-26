import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SellingAdd.css";
import { addOffer } from "../../Redux/actions/offer";
import { okListing } from "../../svg/svg";
import { useHistory } from "react-router";

export const SellingAdd = () => {
    const dispatch = useDispatch();
    const [itemName, setItemName] = useState();
    const [itemType, setItemType] = useState();
    const [itemDescription, setItemDescription] = useState();
    const [itemPrice, setitemPrice] = useState();
    const offerAdded = useSelector((state) => state.offerReducer.offerAdded);

    const history = useHistory();
    return (
        <div className="SellingAddPage">
            {offerAdded ? (
                <div className="messageAfterAddingListing">
                    <div className="messageAfterAddingListingIcon">
                        {okListing}
                    </div>
                    <h1>Your Listing Is added And Under Review</h1>
                    <h3>Please Wait For Approval</h3>
                    <button
                        className="messageAfterAddingListingButton"
                        onClick={() => {
                            history.push("/sellshop");
                        }}
                    >
                        Go Back
                    </button>
                </div>
            ) : null}

            <h3 className="sellingAddTitle">
                Please Add The Product You Want To List
            </h3>
            <form
                className="SellingAddForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(
                        addOffer({
                            itemName,
                            itemType,
                            itemDescription,
                            itemPrice,
                        })
                    );
                }}
            >
                <div className="SellingInputBox">
                    <input
                        maxLength="80"
                        required
                        type="text"
                        className="SellingInputInput"
                        placeholder="Item Name"
                        onChange={(e) => {
                            setItemName(e.target.value);
                        }}
                    />
                </div>
                <div className="SellingInputBox">
                    <input
                        required
                        type="text"
                        className="SellingInputInput"
                        placeholder="Item Type"
                        onChange={(e) => {
                            setItemType(e.target.value);
                        }}
                    />
                </div>
                <div className="SellingInputBox sellingDescription">
                    <textarea
                        maxLength="250"
                        required
                        type="text"
                        className="SellingInputInput sellingDescriptioninput"
                        placeholder="Description"
                        onChange={(e) => {
                            setItemDescription(e.target.value);
                        }}
                    />
                </div>
                <div className="SellingInputBox">
                    <input
                        required
                        type="number"
                        className="SellingInputInput"
                        placeholder="Price DT"
                        onChange={(e) => {
                            setitemPrice(e.target.value);
                        }}
                    />
                </div>
                <div className="sellingButtonBox">
                    <button className="sellingButtonInput"> List Item </button>
                </div>
            </form>
        </div>
    );
};
