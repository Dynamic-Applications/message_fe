import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Connect.css";

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
        
            <div className="connect-page">
            <div className="connect-content">
            <div className="suggested-users">
                <h2 className="users-title">Users' Profiles</h2>

                {users.map((user) => (
                    <div
                        key={user.id}
                        className="user-item"
                        onClick={() => handleUserClick(user.id)}
                    >
                        <img
                            src={
                                user.avatar ||
                                "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg"
                            }
                            alt={`${user.username}'s avatar`}
                            className="user-avatar"
                            onError={(e) => (e.target.style.display = "none")}
                        />
                        <span>{user.username}</span>
                    </div>
                ))}
                </div>
                </div>
        </div>
    );
}

export default UsersList;
