import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    Paper,
    Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";

// Retrieve token from localStorage
const token = localStorage.getItem("token");
const API_URL = process.env.REACT_APP_MESSAGE_API;

const socket = io(`${API_URL}` || "http://localhost:4500", {
    auth: { token },
});

const ChatApp = () => {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [activity, setActivity] = React.useState("");
    const messagesEndRef = React.useRef(null);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    React.useEffect(() => {
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

    React.useEffect(() => {
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

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSignOut}
                    sx={{ marginBottom: 2, display: "block", margin: "0 auto" }}
                >
                    Sign Out
                </Button>

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
                    <Stack spacing={1}>
                        {messages.map((msg, idx) => (
                            <Box
                                key={`${msg.username}-${msg.created_at || idx}`}
                                sx={{
                                    bgcolor: "#e0f7fa",
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 1,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {msg.username}
                                </Typography>
                                <Typography variant="body2">
                                    {msg.text || msg}
                                </Typography>
                                {msg.created_at && (
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {new Date(
                                            msg.created_at
                                        ).toLocaleString()}
                                    </Typography>
                                )}
                            </Box>
                        ))}
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