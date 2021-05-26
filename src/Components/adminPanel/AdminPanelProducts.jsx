import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllOffers } from "../../Redux/actions/offer";
import { clearProduct, getProducts } from "../../Redux/actions/products";
import { okListing } from "../../svg/svg";
import { Loading } from "../Loading";
import { AdminAddingProductCard } from "./AdminAddingProductCard";
import { AdminGiftCardCard } from "./AdminGiftCardCard";
import "./AdminPanelProducts.css";

export const AdminPanelProducts = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchField, setsearchField] = useState("");

    useEffect(() => {
        dispatch(getProducts());

        dispatch(getAllOffers());
    }, []);
    const allProducts = useSelector((state) => state.productsReducer.products);
    const loadingProducts = useSelector(
        (state) => state.productsReducer.loading
    );
    const productUpdated = useSelector(
        (state) => state.productsReducer.productUpdated
    );
    const productAdded = useSelector(
        (state) => state.productsReducer.productAdded
    );
    const productDeleted = useSelector(
        (state) => state.productsReducer.productDeleted
    );
    const [filteredProducts, setfilteredProducts] = useState(allProducts);

    useEffect(() => {
        setfilteredProducts(
            allProducts.filter((el) =>
                el.name.toUpperCase().includes(searchField.toUpperCase())
            )
        );
    }, [searchField]);

    return loadingProducts ? (
        <Loading />
    ) : productUpdated || productAdded || productDeleted ? (
        <div className="messageAfterUpdatinggProduct">
            <div className="messageAfterUpdatinggProductIcon">{okListing}</div>
            <h1>
                Your Product Is{" "}
                {productUpdated
                    ? "Updated"
                    : productDeleted
                    ? "Deleted"
                    : "Added"}{" "}
            </h1>

            <button
                className="messageAfterUpdatinggProductButton"
                onClick={() => {
                    history.push("/AdminPanel");
                    dispatch(clearProduct());
                    dispatch(getProducts());
                }}
            >
                Go Back
            </button>
        </div>
    ) : (
        <div className="adminPanelProductsPage">
            <div className="adminSearchField">
                <input
                    type="text"
                    placeholder="Search For The Item To Edit"
                    onChange={(e) => {
                        setsearchField(e.target.value);
                    }}
                />
            </div>
            <div className="adminAllCards">
                <AdminAddingProductCard />
                {!filteredProducts ? (
                    <Loading />
                ) : (
                    filteredProducts.map((product, index) => (
                        <AdminGiftCardCard
                            key={index}
                            id={product._id}
                            img={product.img}
                            currentPrice={product.currentPrice}
                            originalPrice={product.originalPrice}
                            name={product.name}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
