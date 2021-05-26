import React from "react";
import "./AccessDenied.css";
import logo from "../images/LOGOLOADING.png";
import { Link } from "react-router-dom";

export default function AccesDenied() {
    return (
        <div className="accessDeniedTotal">
            <img src={logo} />
            <h1 className="accessDeniedTitle">
                You Are Not Allowed Please{" "}
                <Link to="/login">
                    <span className="accessDeniedLogin">Login</span>{" "}
                </Link>
                To Proceed
            </h1>
        </div>
    );
}
