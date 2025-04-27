import React from "react";
import { useNavigate } from "react-router-dom";
import "./MobileMenu.css";

const MobileMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="mobile-menu">
            <button className="menu-item" onClick={() => navigate("/")}>
                <i className="fas fa-comment"></i>
                <span>Messages</span>
            </button>
            <button className="menu-item" onClick={() => navigate("/connect")}>
                <i className="fas fa-user-plus"></i>
                <span>Connect</span>
            </button>
            <button className="menu-item" onClick={() => navigate("/calls")}>
                <i className="fas fa-phone"></i>
                <span>Calls</span>
            </button>
            <button className="menu-item" onClick={() => navigate("/profile")}>
                <i className="fas fa-user"></i>
                <span>Profile</span>
            </button>
        </div>
    );
};

export default MobileMenu;
