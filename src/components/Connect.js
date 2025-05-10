import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Connect.css";

const API_URL =
    process.env.REACT_APP_MESSAGE_API || "https://messageapi-z2ao.onrender.com";

const Connect = ({ onStartChat = () => {} }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isGroupChat, setIsGroupChat] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch users from the API
        fetch(`${API_URL}/users`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // Log the fetched data to debug
                setUsers(data); // Store the fetched users
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch((err) => {
                setError("Failed to fetch users");
                setLoading(false); // Stop loading even if there's an error
            });
    }, []);

    const handleUserSelect = (user) => {
        const exists = selectedUsers.find((u) => u.id === user.id);
        if (exists) {
            setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleStartChat = () => {
        if (selectedUsers.length > 0) {
            onStartChat(selectedUsers); // ✅ Send selected users to parent
            navigate("/"); // Or redirect to the chat page if needed
        }
    };

    // Filter users based on the search query while ensuring that username exists and can be safely used
    const filteredUsers = users.filter(
        (user) =>
            user?.username &&
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="connect-page">
            <div className="connect-content">
                <div className="chat-type-toggle">
                    <button
                        className={`toggle-button ${
                            !isGroupChat ? "active" : ""
                        }`}
                        onClick={() => setIsGroupChat(false)}
                    >
                        Private Chat
                    </button>
                    <button
                        className={`toggle-button ${
                            isGroupChat ? "active" : ""
                        }`}
                        onClick={() => setIsGroupChat(true)}
                    >
                        Group Chat
                    </button>
                </div>

                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="selected-users">
                    {selectedUsers.map((user) => (
                        <div key={user.id} className="selected-user">
                            <img
                                src={
                                    user.avatar ||
                                    "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg"
                                } // Handle missing avatar
                                alt={user.username}
                                className="user-avatar"
                            />
                            <span>{user.username}</span>
                            <button onClick={() => handleUserSelect(user)}>
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <div className="suggested-users">
                    <h3>Suggested Users</h3>
                    {loading && <p>Loading users...</p>}
                    {error && <p className="error">{error}</p>}
                    {!loading && !error && filteredUsers.length === 0 && (
                        <p>No users found.</p>
                    )}
                    {!loading &&
                        !error &&
                        filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className={`user-item ${
                                    selectedUsers.find((u) => u.id === user.id)
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => handleUserSelect(user)}
                            >
                                <img
                                    src={
                                        user.avatar ||
                                        "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg"
                                    } // Handle missing avatar
                                    alt={`${user.username}'s avatar`}
                                    className="user-avatar"
                                    onError={(e) =>
                                        (e.target.style.display = "none")
                                    }
                                />
                                <span>{user.username}</span>
                            </div>
                        ))}
                </div>

                <button
                    className="start-chat-button"
                    onClick={handleStartChat}
                    disabled={selectedUsers.length === 0}
                >
                    Send Request
                </button>
            </div>
        </div>
    );
};

export default Connect;
