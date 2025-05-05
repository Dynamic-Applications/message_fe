import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MobileMenu.css";

const MobileMenu = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("/messages"); // Default active menu

    const handleMenuClick = (path) => {
        setActiveMenu(path); // Set the active menu
        navigate(path); // Navigate to the selected path
    };

    return (
        <div className="mobile-menu">
            <button
                className={`menu-item ${
                    activeMenu === "/messages" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("/messages")}
            >
                <i className="fas fa-comment"></i>
                <span>Messages</span>
            </button>
            <button
                className={`menu-item ${
                    activeMenu === "/connect" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("/connect")}
            >
                <i className="fas fa-user-plus"></i>
                <span>Connect</span>
            </button>
            <button
                className={`menu-item ${
                    activeMenu === "/calls" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("/calls")}
            >
                <i className="fas fa-phone"></i>
                <span>Calls</span>
            </button>
            <button
                className={`menu-item ${
                    activeMenu === "/profile" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("/profile")}
            >
                <i className="fas fa-user"></i>
                <span>Profile</span>
            </button>
        </div>
    );
};

export default MobileMenu;