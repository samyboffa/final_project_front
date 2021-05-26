import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import "./MyNotifications.css";
import NotifCard from "./NotifCard";

export default function MyNotifications() {
    const notif = useSelector((state) => state.userReducer.user.notifications);
    const notifLoading = useSelector((state) => state.userReducer.loading);
    console.log(notif);
    console.log(notif.reverse());

    return notifLoading ? (
        <Loading />
    ) : !notif ? (
        <h1>empty</h1>
    ) : (
        <div className="allNotif">
            {notif.reverse().map((el, index) => (
                <NotifCard notif={el} key={index} />
            ))}
        </div>
    );
}
