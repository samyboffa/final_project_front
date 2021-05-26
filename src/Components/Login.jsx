import React, { useState } from "react";
import "./Login.css";
import { user, lock, okListing } from "../svg/svg";
import { Link, useHistory } from "react-router-dom";
import mainLogo from "../images/LOGO.png";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./Loading";
import { clearUser, login } from "../Redux/actions/user";

export const LoginSignUp = () => {
    const dispatch = useDispatch();
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");
    const error = useSelector((state) => state.userReducer.error);
    const userLoading = useSelector((state) => state.userReducer.loading);
    const registerySuccess = useSelector((state) => state.userReducer.user);
    const history = useHistory(); //for redirecting
    return userLoading ? (
        <Loading />
    ) : (
        <div className="loginPage">
            {registerySuccess ? (
                <div className="registerySuccess">
                    {okListing}
                    <h1>You Are Logged In </h1>

                    <button
                        className="registerySuccessButton"
                        onClick={() => {
                            dispatch(clearUser());
                            history.push("/");
                        }}
                    >
                        {" "}
                        Go To Home Page{" "}
                    </button>
                </div>
            ) : null}
            <Link to="/">
                <div className="logoLoginPage">
                    <img className="logoLogin" src={mainLogo} alt="" />
                </div>
            </Link>
            <div className="loginBox">
                <div className="loginTitle">Login to B-SHOP</div>
                <div className="loginInputs">
                    <h5 className="responseInfo">{error}</h5>

                    <form
                        action=""
                        onSubmit={(e) => {
                            dispatch(
                                login({ email: mail, password: password })
                            );

                            e.preventDefault();
                        }}
                    >
                        <div className="mailLogin field">
                            <span className="SVGLogin">{user}</span>

                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="email"
                                onChange={(e) => setmail(e.target.value)}
                            />
                        </div>

                        <div className="passwordLogin field">
                            <span className="SVGLogin">{lock}</span>

                            <input
                                type="password"
                                required
                                placeholder="password"
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="submitLogin">
                            {" "}
                            Login
                        </button>

                        <p>
                            Not a Member ?{" "}
                            <Link className="toSignUp" to="signup">
                                {" "}
                                Sign-Up Now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
