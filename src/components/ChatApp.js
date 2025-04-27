import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Paper,
    Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LockIcon from "@mui/icons-material/Lock";
import { io } from "socket.io-client";
import SwipeToDelete from "./SwipeToDelete";

const token = localStorage.getItem("token");
const currentUserId = localStorage.getItem("user_id");
const API_URL =
    process.env.REACT_APP_MESSAGE_API || "https://messageapi-z2ao.onrender.com";

const socket = io(`${API_URL}`, {
    auth: { token },
});

const ChatApp = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [activity, setActivity] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
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
            }
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        socket.on("message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("activity", (name) => {
            setActivity(name ? `${name} is typing...` : "");
            if (name) {
                setTimeout(() => setActivity(""), 3500);
            }
        });

        return () => {
            socket.off("message");
            socket.off("activity");
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (message.trim()) {
            try {
                const response = await fetch(`${API_URL}/messages`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: message }),
                });

                if (!response.ok) {
                    throw new Error("Failed to send message");
                }

                const newMessage = await response.json();
                socket.emit("message", newMessage);
                setMessage("");
            } catch (err) {
                console.error("Error sending message:", err);
            }
        }
    };

    const handleTyping = () => {
        socket.emit("activity", "Someone");
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/messages/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
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
                    Authorization: `Bearer ${token}`,
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

    return (
        <div className="chat-container" style={{ padding: "20px" }}>
            {Object.keys(groupedMessages).map((dateLabel) => (
                <div key={dateLabel}>
                    <h3>{dateLabel}</h3>
                    <SwipeToDelete
                        rows={groupedMessages[dateLabel].map((msg) => ({
                            id: msg.id,
                            title: msg.text,
                        }))}
                        onDelete={handleDelete}
                        onEdit={(id) => {
                            const newText = prompt("Edit your message:");
                            if (newText) {
                                handleEdit(id, newText);
                            }
                        }}
                    />
                </div>
            ))}

            <div style={{ marginTop: "20px" }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                    placeholder="Type your message..."
                    style={{ width: "80%", padding: "10px" }}
                />
                <button onClick={handleSend} style={{ padding: "10px" }}>
                    Send
                </button>
                <div>{activity}</div>
            </div>

            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatApp;
