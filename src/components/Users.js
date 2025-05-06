import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";

const API_URL =
    process.env.REACT_APP_MESSAGE_API || "https://messageapi-z2ao.onrender.com";

function UsersList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/users`) // Replace with your actual endpoint
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Failed to fetch users:", err));
    }, []);

    const handleUserClick = (id) => {
        navigate(`/profile/${id}`);
    };

    return (
        <div className="users-container">
            <h2 className="users-title">Chats</h2>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item" onClick={() => handleUserClick(user.id)}>
                        <img
                            src={`${API_URL}/users/${user.id}/avatar`}
                            alt={`${API_URL}${user.username}'s avatar`}
                            className="user-avatar"
                            onError={(e) => (e.target.style.display = "none")}
                        />
                        <span>{user.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList;
