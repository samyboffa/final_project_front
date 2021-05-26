import axios from "axios";
import { Loading } from "./Loading";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { user, lock, phone, okListing } from "../svg/svg";
import "./SignUp.css";
import mainLogo from "../images/LOGO.png";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, register } from "../Redux/actions/user";

export const SignUp = () => {
    //form values
    const [fullName, setfullName] = useState("");
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");
    const [passwordAgain, setpasswordAgain] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [resError, setresError] = useState(); //success message
    const history = useHistory(); //for redirecting
    const dispatch = useDispatch();
    const error = useSelector((state) => state.userReducer.error);
    const userLoading = useSelector((state) => state.userReducer.loading);
    const registerySuccess = useSelector((state) => state.userReducer.user);

    return userLoading ? (
        <Loading />
    ) : (
        <div className="signUpPage">
            {registerySuccess ? (
                <div className="registerySuccess">
                    {okListing}
                    <h1>You Are Successfully Registered </h1>
                    <button
                        className="registerySuccessButton"
                        onClick={() => {
                            dispatch(clearUser());
                            history.push("/login");
                        }}
                    >
                        {" "}
                        Go To Login{" "}
                    </button>
                </div>
            ) : null}
            <Link to="/">
                <div className="logoSignUpPage">
                    <img className="logoSignUp" src={mainLogo} alt="" />
                </div>
            </Link>
            <div className="SignUpBox">
                <div className="SignUpTitle">Sign Up to B-SHOP</div>
                <div className="SignUpInputs">
                    {/* the error message to be shown */}
                    <h5 className="responseInfo">
                        {error}
                        {resError}
                    </h5>

                    <form
                        action="/login"
                        onSubmit={(e) => {
                            setresError("");
                            e.preventDefault();
                            if (password === passwordAgain) {
                                dispatch(
                                    register({
                                        name: fullName,
                                        email: mail,
                                        password: password,
                                        phoneNumber: phoneNumber,
                                    })
                                );
                            } else {
                                setresError(
                                    "Password & Confirmation are different"
                                );
                            }
                        }}
                    >
                        <div className="nameSignUp field">
                            <span className="SVGSignUp">{user}</span>

                            <input
                                type="text"
                                name="name"
                                required
                                onChange={(e) => setfullName(e.target.value)}
                                placeholder="Full-Name"
                            />
                        </div>
                        <div className="mailSignUp field">
                            <span className="SVGSignUp">{user}</span>

                            <input
                                type="email"
                                name="email"
                                required
                                onChange={(e) => setmail(e.target.value)}
                                placeholder="email"
                            />
                        </div>

                        <div className="passwordSignUp field">
                            <span className="SVGSignUp">{lock}</span>

                            <input
                                type="password"
                                required
                                onChange={(e) => setpassword(e.target.value)}
                                placeholder="password"
                            />
                        </div>
                        <div className="passwordConfirmSignUp field">
                            <span className="SVGSignUp">{lock}</span>

                            <input
                                type="password"
                                required
                                onChange={(e) =>
                                    setpasswordAgain(e.target.value)
                                }
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="phoneNumberSignUp field">
                            <span className="SVGSignUp">{phone}</span>

                            <input
                                type="text"
                                required
                                onChange={(e) => setphoneNumber(e.target.value)}
                                placeholder="Phone Number"
                            />
                        </div>
                        <button
                            type="submit"
                            className="submitSignUp"
                            onClick={() => {}}
                        >
                            {" "}
                            SignUp
                        </button>

                        <p>
                            Already a Member ?{" "}
                            <Link className="toLogin" to="/login">
                                {" "}
                                Login Now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
