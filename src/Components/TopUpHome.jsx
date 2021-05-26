import React from "react";
import "./TopUpHome.css";
import fortniteLogo from "../images/fortniteLogo.jpg";
import pubgLogo from "../images/pubgLogo.jpg";
import ffLogo from "../images/ffLogo.jpg";
import codMobileLogo from "../images/codMobileLogo.jpg";
import codWarzoneLogo from "../images/codWarzoneLogo.jpg";
import valorantLogo from "../images/valorantLogo.jpg";
import lolLogo from "../images/lolLogo.jpg";
import robloxLogo from "../images/robloxLogo.jpg";
import { Link } from "react-router-dom";

export const TopUpHome = () => {
    return (
        <div className="topUpHome">
            <h1>Games Top-Up</h1>
            <div className="topUpCards">
                <div className="topUpCard fortnite">
                    {" "}
                    <Link to="/topup/Fortnite">
                        <div className="logoTopUp">
                            <img src={fortniteLogo} alt="" />
                        </div>
                        <h3> Fortnite</h3>{" "}
                    </Link>
                </div>
                <div className="topUpCard pubg">
                    {" "}
                    <Link to="/topup/PUBGMobile">
                        <div className="logoTopUp">
                            <img src={pubgLogo} alt="" />
                        </div>
                        <h3> PUBG</h3>{" "}
                    </Link>
                </div>
                <div className="topUpCard ff">
                    {" "}
                    <Link to="/topup/FreeFire">
                        <div className="logoTopUp">
                            <img src={ffLogo} alt="" />
                        </div>
                        <h3> Free Fire</h3>{" "}
                    </Link>
                </div>
                <div className="topUpCard codMobile">
                    {" "}
                    <Link to="/topup/CODMobile">
                        <div className="logoTopUp">
                            <img src={codMobileLogo} alt="" />
                        </div>
                        <h3> COD (Mobile) </h3>{" "}
                    </Link>
                </div>
                <div className="topUpCard codWarzone">
                    {" "}
                    <Link to="/topup/CODWarzone">
                        <div className="logoTopUp">
                            <img src={codWarzoneLogo} alt="" />
                        </div>
                        <h3> COD (Warzone) </h3>{" "}
                    </Link>
                </div>
                <div className="topUpCard valorant">
                    {" "}
                    <Link to="/topup/Valorant">
                        <div className="logoTopUp">
                            <img src={valorantLogo} alt="" />
                        </div>
                        <h3> Valorant </h3>
                    </Link>
                </div>

                <div className="topUpCard lol">
                    <Link to="/topup/LeagueOfLegends">
                        <div className="logoTopUp">
                            <img src={lolLogo} alt="" />
                        </div>
                        <h3> League Of Legends </h3>
                    </Link>
                </div>

                <div className="topUpCard roblox">
                    <Link to="/topup/ROBLOX">
                        <div className="logoTopUp">
                            <img src={robloxLogo} alt="" />
                        </div>
                        <h3> ROBLOX </h3>{" "}
                    </Link>
                </div>
            </div>
        </div>
    );
};
