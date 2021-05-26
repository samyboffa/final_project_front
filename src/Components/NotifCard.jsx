import React from "react";
import "./NotifCard.css";

export default function NotifCard({ notif }) {
    return (
        <div className="NotifItem">
            <div className="notifItemText">{notif.msg}</div>
        </div>
    );
}
