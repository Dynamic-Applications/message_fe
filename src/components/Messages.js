import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Messages.css";

const API_URL =
    process.env.REACT_APP_MESSAGE_API || "https://messageapi-z2ao.onrender.com";

const Messages = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/signin");
                    return;
                }

                const response = await fetch(`${API_URL}/messages`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }

                const data = await response.json();
                console.log("Fetched messages:", data);
                setMessages(data);
            } catch (err) {
                console.error("Error fetching messages:", err);
                setError(err.message || "Failed to load messages");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [navigate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="messages-page">
                <div className="loading">Loading messages...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="messages-page">
                <div className="error-message">
                    <h3>Error loading messages</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="messages-page">
            <div className="messages-content">
                {messages.length === 0 ? (
                    <div className="no-messages">
                        <p>No messages yet</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div key={message.id} className="message-item">
                            <div className="message-header">
                                <span className="message-sender">
                                    {message.username}
                                </span>
                                <span className="message-date">
                                    {formatDate(message.created_at)}
                                </span>
                            </div>
                            <div className="message-content">
                                {message.text}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Messages;
