import React from "react";
import "./Loading.css";
import ReactLoading from "react-loading";

export const Loading = () => {
    return (
        <div className="loadingPage">
            <ReactLoading
                height="150px"
                width="150px"
                type="bubbles"
                color="#ff6400"
            />
        </div>
    );
};
