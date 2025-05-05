import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import SwipeToDelete from "./SwipeToDelete";
import "./ChatApp.css";

const API_URL = "http://localhost:5000";
const SOCKET_URL = "http://localhost:5000";

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        // Initialize socket connection
        socketRef.current = io(SOCKET_URL, {
            auth: {
                token,
            },
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        // Socket event listeners
        socketRef.current.on("connect", () => {
            console.log("Socket connected");
            setIsConnected(true);
            setError(null);
        });

        socketRef.current.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
            setError("Failed to connect to chat server");
            setIsConnected(false);
        });

        socketRef.current.on("disconnect", () => {
            console.log("Socket disconnected");
            setIsConnected(false);
        });

        socketRef.current.on("message", (message) => {
            console.log("Received message:", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Fetch initial messages
        fetchMessages();

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [navigate]);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/messages`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }

            const data = await response.json();
            console.log("Raw message data:", data);
            // Ensure each message has the required fields
            const processedMessages = data.map((msg) => {
                console.log("Processing message:", msg);
                return {
                    ...msg,
                    sender_id: msg.sender_id || msg.user_id,
                    sender_username: msg.sender_username || msg.username,
                };
            });
            console.log("Processed messages:", processedMessages);
            setMessages(processedMessages);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setError("Failed to load messages");
            setIsLoading(false);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !isConnected) return;

        const messageData = {
            content: newMessage,
            recipients: selectedUsers.map((user) => user.id),
        };

        // Emit message through socket
        socketRef.current.emit("message", messageData, (response) => {
            if (response.error) {
                console.error("Error sending message:", response.error);
                setError("Failed to send message");
                return;
            }
            console.log("Message sent successfully:", response);
            setMessages((prevMessages) => [...prevMessages, response]);
        });

        setNewMessage("");
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (isLoading) {
        return <div className="loading">Loading messages...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/messages/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete message");
            }

            setMessages((prev) => prev.filter((msg) => msg.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleEdit = async (id, newMessage) => {
        try {
            const response = await fetch(`${API_URL}/messages/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ text: newMessage }),
            });

            if (!response.ok) {
                throw new Error("Failed to edit message");
            }

            const updatedMessage = await response.json();
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === id ? { ...msg, text: updatedMessage.text } : msg
                )
            );
        } catch (err) {
            console.error("Edit failed:", err);
        }
    };

    const getDateLabel = (dateStr) => {
        const msgDate = new Date(dateStr);
        const now = new Date();
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);

        if (msgDate.toDateString() === now.toDateString()) return "Today";
        if (msgDate.toDateString() === yesterday.toDateString())
            return "Yesterday";
        return msgDate.toDateString();
    };

    const groupedMessages = messages.reduce((groups, msg) => {
        const label = getDateLabel(msg.created_at);
        if (!groups[label]) groups[label] = [];
        groups[label].push(msg);
        return groups;
    }, {});

    const handleUsernameClick = () => {
        const chatId = "1"; // Hardcoded ID for testing
        console.log("Navigating to chat ID:", chatId);
        navigate(`/chat/${chatId}`);
    };

    const renderMessage = (msg) => (
        <div
            key={msg.id}
            className={`message ${msg.is_sent ? "sent" : "received"}`}
        >
            <div className="message-header">
                <span
                    className="message-sender"
                    onClick={handleUsernameClick}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                    {msg.sender_username || msg.username}
                </span>
                <span className="message-time">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
            <div className="message-content">{msg.text || msg.content}</div>
        </div>
    );

    return (
        <div className="chat-app">
            <div className="chat-header">
                <h2>Chat</h2>
                {!isConnected && (
                    <div className="connection-status">Reconnecting...</div>
                )}
            </div>

            <div className="messages-container">
                {Object.keys(groupedMessages).map((dateLabel) => (
                    <div key={dateLabel} className="message-group">
                        <h3>{dateLabel}</h3>
                        {groupedMessages[dateLabel].map(renderMessage)}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="message-input-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={!isConnected}
                />
                <button
                    type="submit"
                    disabled={!isConnected || !newMessage.trim()}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatApp;
