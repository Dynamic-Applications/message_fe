import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Paper,
    Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const token = localStorage.getItem("token");

const socket = io("http://localhost:4500", {
    auth: { token },
});

const ChatApp = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [activity, setActivity] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.on("message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("activity", (name) => {
            setActivity(name ? `${name} is typing...` : "");
            if (name) {
                setTimeout(() => setActivity(""), 2000);
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
                    }}
                >
                    <Stack spacing={1}>
                        {messages.map((msg, idx) => {
                            const isObject =
                                typeof msg === "object" && msg !== null;
                            const key = isObject
                                ? msg.id
                                : `${idx}-${msg.created_at || Date.now()}`;

                            const username = isObject ? msg.username : null; // Don't set fallback to "Anonymous"
                            const text = isObject ? msg.text : msg;
                            const timestamp = isObject ? msg.created_at : null;

                            return (
                                <Box
                                    key={key}
                                    sx={{
                                        bgcolor: "#e0f7fa",
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 1,
                                    }}
                                >
                                    {username && (
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {username}:
                                        </Typography>
                                    )}
                                    <Typography variant="body2">
                                        {text}
                                    </Typography>
                                    {timestamp && (
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {new Date(
                                                timestamp
                                            ).toLocaleString()}
                                        </Typography>
                                    )}
                                </Box>
                            );
                        })}
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
