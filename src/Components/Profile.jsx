import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

export const Profile = () => {
    const [user, setuser] = useState();
    const [admin, setadmin] = useState();
    //new Inputs Profile
    const [newName, setnewName] = useState();
    const [newEmail, setnewEmail] = useState();
    const [newPhoneNumber, setnewPhoneNumber] = useState();
    //new Inputs Password
    const [oldPassword, setoldPassword] = useState();
    const [newPassword, setnewPassword] = useState();
    const [newPasswordConfirmation, setnewPasswordConfirmation] = useState();
    //returned messages
    const [suceessProfileMessage, setsuceessProfileMessage] = useState("");
    const [failedProfileMessage, setfailedProfileMessage] = useState("");
    const [successPasswordMessage, setsuccessPasswordMessage] = useState("");
    const [failedPasswordMessage, setfailedPasswordMessage] = useState();

    const history = useHistory();
    //getting the user
    useEffect(async () => {
        try {
            let result = await axios.get("/getUser", {
                headers: { authorization: localStorage.token },
            });
            setuser(result.data);
            setnewName(result.data.name);
            setnewEmail(result.data.email);
            setnewPhoneNumber(result.data.phoneNumber);
            if (result.data.role === 2) {
                setadmin(result.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [suceessProfileMessage]);

    return !user ? (
        <h1>Loading</h1>
    ) : (
        <div className="allSetting">
            <form
                className="profileBox"
                onSubmit={(e) => {
                    e.preventDefault();
                    setsuceessProfileMessage("");
                    setfailedProfileMessage("");
                    axios
                        .post("/updateUser", {
                            token: localStorage.token,
                            newUser: { newName, newEmail, newPhoneNumber },
                        })
                        .then((data) => {
                            if (data.data === "USERUPDATED") {
                                setsuceessProfileMessage(
                                    "User Updated ... Redirecting"
                                );
                                document.getElementById(
                                    "loadingBar"
                                ).style.animation = "loading 4s ease-in";
                            }
                            setTimeout(() => {
                                history.push("/");
                            }, 3800);
                        })
                        .catch((err) =>
                            setfailedProfileMessage(err.response.data)
                        );
                }}
            >
                <h1 className="profileTitle">Edit Profile</h1>
                <hr />
                <h2 className="ProfileSubTitle">Full Name</h2>
                <div className="ProfileInputBox">
                    <input
                        required
                        type="text"
                        className="ProfileInput"
                        defaultValue={newName}
                        onChange={(e) => setnewName(e.target.value)}
                    />
                </div>
                <h2 className="ProfileSubTitle">Email</h2>
                <div className="ProfileInputBox">
                    <input
                        required
                        type="email"
                        className="ProfileInput"
                        defaultValue={newEmail}
                        onChange={(e) => setnewEmail(e.target.value)}
                    />
                </div>
                <h2 className="ProfileSubTitle">Phone Number</h2>
                <div className="ProfileInputBox">
                    <input
                        required
                        type="number"
                        className="ProfileInput"
                        defaultValue={newPhoneNumber}
                        onChange={(e) => setnewPhoneNumber(e.target.value)}
                    />
                </div>

                <h3 className="failedProfileMessage">{failedProfileMessage}</h3>
                <h3 className="suceessProfileMessage">
                    {suceessProfileMessage}{" "}
                    {suceessProfileMessage ? (
                        <div className="loadingBar">
                            <div className="activeLoadingBar" id="loadingBar">
                                {"    "}
                            </div>
                        </div>
                    ) : null}
                </h3>

                <div className="profileSubmit">
                    <button className="profileSubmitButton" type="submit">
                        {" "}
                        Save Changes
                    </button>
                </div>
            </form>
            <form
                className="profileBox"
                onSubmit={(e) => {
                    e.preventDefault();
                    setsuccessPasswordMessage("");
                    setfailedPasswordMessage("");
                    if (newPasswordConfirmation === newPassword) {
                        axios
                            .post("/updatePassword", {
                                token: localStorage.token,
                                oldPassword: oldPassword,
                                newPassword: newPassword,
                            })
                            .then((data) => {
                                if (data.data === "PASSWORDUPDATED") {
                                    setsuccessPasswordMessage(
                                        "Password Changed ... Logging Out and redirecting to Login Page"
                                    );
                                    localStorage.clear();
                                    document.getElementById(
                                        "loadingBar"
                                    ).style.animation = "loading 4s ease-in";
                                    setTimeout(() => {
                                        history.push("/login");
                                    }, 3800);
                                }
                            })
                            .catch((err) =>
                                setfailedPasswordMessage(err.response.data)
                            );
                    } else {
                        setfailedPasswordMessage(
                            "Password and Confirmation Password Are different"
                        );
                    }
                }}
            >
                <h1 className="profileTitle">Change Password</h1>
                <hr />
                <h2 className="ProfileSubTitle">Current Password</h2>
                <div className="ProfileInputBox">
                    <input
                        type="password"
                        className="ProfileInput"
                        onChange={(e) => setoldPassword(e.target.value)}
                    />
                </div>
                <h2 className="ProfileSubTitle">New Password</h2>
                <div className="ProfileInputBox">
                    <input
                        type="password"
                        className="ProfileInput"
                        onChange={(e) => setnewPassword(e.target.value)}
                    />
                </div>
                <h2 className="ProfileSubTitle">Confirm New Password</h2>
                <div className="ProfileInputBox">
                    <input
                        type="password"
                        className="ProfileInput"
                        onChange={(e) =>
                            setnewPasswordConfirmation(e.target.value)
                        }
                    />
                </div>
                <h3 className="failedProfileMessage">
                    {failedPasswordMessage}
                </h3>
                <h3 className="suceessProfileMessage">
                    {successPasswordMessage}{" "}
                    {successPasswordMessage ? (
                        <div className="loadingBar">
                            <div className="activeLoadingBar" id="loadingBar">
                                {"    "}
                            </div>
                        </div>
                    ) : null}
                </h3>
                <div className="profileSubmit">
                    <button className="profileSubmitButton" type="submit">
                        {" "}
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
};
