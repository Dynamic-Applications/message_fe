import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Connect.css";

const Connect = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isGroupChat, setIsGroupChat] = useState(false);

    // Mock suggested users - in a real app, this would come from an API
    const suggestedUsers = [
        {
            id: 1,
            name: "John Doe",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            status: "Available",
        },
        {
            id: 2,
            name: "Jane Smith",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            status: "Busy",
        },
        {
            id: 3,
            name: "Mike Johnson",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            status: "Available",
        },
    ];

    const handleUserSelect = (user) => {
        if (selectedUsers.find((u) => u.id === user.id)) {
            setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleStartChat = () => {
        if (selectedUsers.length > 0) {
            // In a real app, this would create a new chat and navigate to it
            navigate("/");
        }
    };

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
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>
                            <button onClick={() => handleUserSelect(user)}>
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <div className="suggested-users">
                    <h3>Suggested Users</h3>
                    {suggestedUsers.map((user) => (
                        <div
                            key={user.id}
                            className={`user-item ${
                                selectedUsers.find((u) => u.id === user.id)
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => handleUserSelect(user)}
                        >
                            <img src={user.avatar} alt={user.name} />
                            <div className="user-info">
                                <h4>{user.name}</h4>
                                <span
                                    className={`status ${user.status.toLowerCase()}`}
                                >
                                    {user.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="start-chat-button"
                    onClick={handleStartChat}
                    disabled={selectedUsers.length === 0}
                >
                    Start {isGroupChat ? "Group" : "Private"} Chat
                </button>
            </div>
        </div>
    );
};

export default Connect;
