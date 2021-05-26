import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    addProducts,
    getProducts,
    updateProducts,
} from "../../Redux/actions/products";
import "./AdminAddingProductCard.css";
import addProduct from "../../images/addProduct.png";
import { addPlus } from "../../svg/svg";

export const AdminAddingProductCard = ({}) => {
    const [productName, setproductName] = useState();
    const [imgURL, setimgURL] = useState();
    const [type, settype] = useState("GC");
    const [platform, setplatform] = useState("Android");
    const [store, setstore] = useState();
    const [value, setvalue] = useState();
    const [currency, setcurrency] = useState("$");
    const [productOrignalPrice, setproductOriginalPrice] = useState();
    const [productCurrentPrice, setproductCurrentPrice] = useState();
    const [region, setregion] = useState("GLOBAL FRANCE GERMANY USA");
    const [description, setdescription] = useState();
    const [display, setdisplay] = useState("adminGiftCardInputBoxesNotShown");
    const dispatch = useDispatch();
    return (
        <div className="adminGiftCardAll">
            <div
                className="admingCardCard adminAddSvg"
                onClick={() =>
                    display === "adminGiftCardInputBoxesNotShown"
                        ? setdisplay("adminGiftCardInputBoxesShown")
                        : setdisplay("adminGiftCardInputBoxesNotShown")
                }
            >
                <h1>ADD Product</h1> {addPlus}
            </div>

            <form
                className={`${display} addFormAdmin`}
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(
                        addProducts({
                            name: productName,
                            type: type,
                            platform: platform,
                            store: store,
                            value: value,
                            currency: currency,
                            originalPrice: productOrignalPrice,
                            currentPrice: productCurrentPrice,
                            description: description,
                            region: region,
                            img: imgURL,
                        })
                    );
                }}
            >
                <div className="adminGiftCardInputBox">
                    <input
                        maxLength="150"
                        required
                        type="text"
                        className="adminGiftCardInputInput"
                        placeholder="Product Name"
                        onChange={(e) => {
                            setproductName(e.target.value);
                        }}
                    />
                </div>
                <div className="adminGiftCardInputBox">
                    <input
                        required
                        type="text"
                        className="adminGiftCardInputInput"
                        placeholder="Image URL"
                        onChange={(e) => {
                            setimgURL(e.target.value);
                        }}
                    />
                </div>
                <div className="adminGiftCardInputBox">
                    <input
                        required
                        type="text"
                        className="adminGiftCardInputInput"
                        placeholder="Store"
                        onChange={(e) => {
                            setstore(e.target.value);
                        }}
                    />
                </div>
                <div className="adminGiftCardInputBox">
                    <input
                        required
                        type="number"
                        className="adminGiftCardInputInput"
                        placeholder="Value"
                        onChange={(e) => {
                            setvalue(e.target.value);
                        }}
                    />
                </div>

                <div className="adminGiftCardInputBox">
                    {" "}
                    <input
                        required
                        type="number"
                        className="adminGiftCardInputInput"
                        placeholder="Initial Price"
                        onChange={(e) => {
                            setproductOriginalPrice(e.target.value);
                        }}
                    />
                </div>

                <div className="adminGiftCardInputBox">
                    <input
                        required
                        type="number"
                        className="adminGiftCardInputInput"
                        placeholder="Current Price"
                        onChange={(e) => {
                            setproductCurrentPrice(e.target.value);
                        }}
                    />
                </div>
                <div className="adminGiftCardInputBox">
                    <input
                        maxLength="500"
                        required
                        type="text"
                        className="adminGiftCardInputInput"
                        placeholder="Description"
                        onChange={(e) => {
                            setdescription(e.target.value);
                        }}
                    />
                </div>
                <h5>Type :</h5>
                <div className="adminGiftCardInputBox">
                    <select
                        className="adminGiftCardSelectBox"
                        onChange={(e) => settype(e.target.value)}
                    >
                        <option value="GC"> Gift Card</option>
                        <option value="SUB"> Subscription</option>
                        <option value="GAME"> Game</option>
                    </select>
                </div>
                <h5>Platform :</h5>
                <div className="adminGiftCardInputBox">
                    <select
                        className="adminGiftCardSelectBox"
                        onChange={(e) => setplatform(e.target.value)}
                    >
                        <option value="Android"> Android</option>
                        <option value="PS4-PS5"> PS4-PS5</option>
                        <option value="Steam"> Steam</option>
                        <option value="XBOX"> XBOX</option>
                        <option value="Other"> Other</option>
                    </select>
                </div>
                <h5>Currency :</h5>
                <div className="adminGiftCardInputBox">
                    <select
                        className="adminGiftCardSelectBox"
                        onChange={(e) => setcurrency(e.target.value)}
                    >
                        <option value="$"> US Dollar $</option>
                        <option value="€"> EURO €</option>
                        <option value="£">POUND £</option>
                        <option value="days"> days (subscription)</option>
                    </select>
                </div>
                <h5>Region :</h5>
                <div className="adminGiftCardInputBox">
                    <select
                        className="adminGiftCardSelectBox"
                        onChange={(e) => setregion(e.target.value)}
                    >
                        <option value="GLOBAL FRANCE GERMANY USA">
                            {" "}
                            GLOBAL
                        </option>
                        <option value="USA"> USA</option>
                        <option value="EUROPE FRANCE GERMANY"> EUROPE</option>
                        <option value="FR"> FRANCE</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="adminGiftCardButton adminGiftCardButtonEdit"
                >
                    {" "}
                    Confirm{" "}
                </button>
                <button
                    type="reset"
                    className="adminGiftCardButton adminGiftCardButtonDelete"
                >
                    {" "}
                    reset{" "}
                </button>
            </form>
        </div>
    );
};
