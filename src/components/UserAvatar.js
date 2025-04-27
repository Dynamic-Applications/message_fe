import React from "react";
import "./UserAvatar.css";

const UserAvatar = ({ src, alt, size = "medium" }) => {
    return (
        <div className={`avatar-container ${size}`}>
            <img src={src} alt={alt} className="avatar-image" />
        </div>
    );
};

export default UserAvatar;
