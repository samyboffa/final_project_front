import React from "react";
import "./OnlyAdmins.css";
import logo from "../images/LOGOLOADING.png";
import { useHistory } from "react-router";

export default function OnlyAdmins() {
    const history = useHistory();
    return (
        <div className="accessDeniedTotal">
            <img src={logo} />
            <h1 className="accessDeniedTitle">Access Denied</h1>
            <h2>You will Be Redirected to Home Page</h2>
            {setTimeout(() => {
                history.push("/");
            }, 4000)}
        </div>
    );
}
