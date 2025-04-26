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
import SwipeToDelete from "./SwipeToDelete"; // Import your swipe component

const token = localStorage.getItem("token");
const currentUserId = localStorage.getItem("user_id");
console.log("Current User ID:", currentUserId);
console.log("Token:", token);
const API_URL = process.env.REACT_APP_MESSAGE_API || "http://localhost:4500";

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
                const res = await fetch(`${API_URL}/messages`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
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

    const handleSend = () => {
        if (message.trim()) {
            socket.emit("message", message);
            setMessage("");
        }
    };

    const handleTyping = () => {
        socket.emit("activity", "Someone");
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/messages/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleEdit = async (id, newMessage) => {
        try {
            const res = await fetch(`${API_URL}/messages/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text: newMessage }),
            });

            const updatedMessage = await res.json();
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
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f0f2f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
            }}
        >
            <Paper elevation={3} sx={{ width: "100%", maxWidth: 500, p: 3 }}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                    align="center"
                >
                    Message App
                </Typography>

                <Box
                    sx={{
                        height: 300,
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        p: 1,
                        mb: 2,
                        bgcolor: "#fafafa",
                        mt: 2,
                    }}
                >
                    <Stack spacing={0.5}>
                        {Object.entries(groupedMessages).map(
                            ([label, msgs]) => (
                                <React.Fragment key={label}>
                                    <Box sx={{ textAlign: "center", my: 1 }}>
                                        <Typography
                                            variant="caption"
                                            fontWeight="bold"
                                        >
                                            {label}
                                        </Typography>
                                    </Box>

                                    {msgs.map((msg) => {
                                        const isOwner =
                                            String(msg.user_id) ===
                                            String(currentUserId);


                                        return (
                                            <Box
                                                key={msg.id}
                                                sx={{
                                                    position: "relative",
                                                    py: 0.25,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        bgcolor: "#e0f7fa",
                                                        px: 0.75,
                                                        py: 0.25,
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <Typography variant="body2">
                                                            <span
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                {msg.username}
                                                            </span>{" "}
                                                            —{" "}
                                                            {new Date(
                                                                msg.created_at
                                                            ).toLocaleTimeString(
                                                                [],
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                }
                                                            )}
                                                        </Typography>

                                                        {isOwner ? (
                                                            <SwipeToDelete
                                                                messageId={
                                                                    msg.id
                                                                }
                                                                messageText={
                                                                    msg.text
                                                                }
                                                                onDelete={
                                                                    handleDelete
                                                                }
                                                                onEdit={
                                                                    handleEdit
                                                                }
                                                            />
                                                        ) : (
                                                            <LockIcon
                                                                sx={{
                                                                    fontSize: 16,
                                                                    color: "grey.500",
                                                                    ml: 1,
                                                                }}
                                                            />
                                                        )}
                                                    </Box>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{ mt: 0.5 }}
                                                    >
                                                        {msg.text}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </React.Fragment>
                            )
                        )}
                        <div ref={messagesEndRef} />
                    </Stack>
                </Box>

                {activity && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        fontStyle="italic"
                        mb={1}
                    >
                        {activity}
                    </Typography>
                )}

                <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        size="small"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            handleTyping();
                            if (e.key === "Enter") handleSend();
                        }}
                    />
                    <IconButton
                        color="primary"
                        onClick={handleSend}
                        sx={{
                            bgcolor: "primary.main",
                            color: "#fff",
                            ":hover": { bgcolor: "primary.dark" },
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatApp;


