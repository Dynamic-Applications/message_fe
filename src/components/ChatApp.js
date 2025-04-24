// import React from "react";
// import {
//     Box,
//     Typography,
//     TextField,
//     IconButton,
//     Paper,
//     Stack,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { io } from "socket.io-client";

// const token = localStorage.getItem("token");
// const API_URL = process.env.REACT_APP_MESSAGE_API;

// const socket = io(`${API_URL}` || "http://localhost:4500", {
//     auth: { token },
// });

// const ChatApp = () => {
//     const [message, setMessage] = React.useState("");
//     const [messages, setMessages] = React.useState([]);
//     const [activity, setActivity] = React.useState("");
//     const messagesEndRef = React.useRef(null);

//     React.useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const res = await fetch(`${API_URL}/messages`);
//                 const data = await res.json();
//                 setMessages(data);
//             } catch (err) {
//                 console.error("Error fetching messages:", err);
//             }
//         };

//         fetchMessages();
//     }, []);

//     React.useEffect(() => {
//         socket.on("message", (msg) => {
//             setMessages((prev) => [...prev, msg]);
//         });

//         socket.on("activity", (name) => {
//             setActivity(name ? `${name} is typing...` : "");
//             if (name) {
//                 setTimeout(() => setActivity(""), 3500);
//             }
//         });

//         return () => {
//             socket.off("message");
//             socket.off("activity");
//         };
//     }, []);

//     React.useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const handleSend = () => {
//         if (message.trim()) {
//             socket.emit("message", message);
//             setMessage("");
//         }
//     };

//     const handleTyping = () => {
//         socket.emit("activity", "Someone");
//     };

//     const getDateLabel = (dateStr) => {
//         const msgDate = new Date(dateStr);
//         const now = new Date();

//         const isToday = msgDate.toDateString() === now.toDateString();

//         const yesterday = new Date();
//         yesterday.setDate(now.getDate() - 1);

//         const isYesterday = msgDate.toDateString() === yesterday.toDateString();

//         if (isToday) return "Today";
//         if (isYesterday) return "Yesterday";
//         return msgDate.toDateString();
//     };

//     const groupedMessages = messages.reduce((groups, msg) => {
//         const label = getDateLabel(msg.created_at);
//         if (!groups[label]) groups[label] = [];
//         groups[label].push(msg);
//         return groups;
//     }, {});

//     return (
//         <Box
//             sx={{
//                 minHeight: "100vh",
//                 bgcolor: "#f0f2f5",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 p: 2,
//             }}
//         >
//             <Paper elevation={3} sx={{ width: "100%", maxWidth: 500, p: 3 }}>
//                 <Typography
//                     variant="h5"
//                     fontWeight="bold"
//                     gutterBottom
//                     align="center"
//                 >
//                     Message App
//                 </Typography>
//                 <Box
//                     sx={{
//                         height: 300,
//                         overflowY: "auto",
//                         border: "1px solid #ccc",
//                         borderRadius: 2,
//                         p: 1,
//                         mb: 2,
//                         bgcolor: "#fafafa",
//                         mt: 2,
//                     }}
//                 >
//                     <Stack spacing={1}>
//                         {Object.entries(groupedMessages).map(
//                             ([label, msgs]) => (
//                                 <React.Fragment key={label}>
//                                     <Box sx={{ textAlign: "center", my: 1 }}>
//                                         <Typography
//                                             variant="caption"
//                                             fontWeight="bold"
//                                         >
//                                             {label}
//                                         </Typography>
//                                     </Box>
//                                     {msgs.map((msg, i) => (
//                                         <Box
//                                             key={`${msg.username}-${
//                                                 msg.created_at || i
//                                             }`}
//                                             sx={{
//                                                 bgcolor: "#e0f7fa",
//                                                 px: 1.5,
//                                                 py: 0.5,
//                                                 borderRadius: 1,
//                                             }}
//                                         >
//                                             <Typography
//                                                 variant="body2"
//                                                 sx={{ fontWeight: "bold" }}
//                                             >
//                                                 {msg.username}
//                                             </Typography>
//                                             <Typography variant="body2">
//                                                 {msg.text || msg}
//                                             </Typography>
//                                             {msg.created_at && (
//                                                 <Typography
//                                                     variant="caption"
//                                                     color="text.secondary"
//                                                 >
//                                                     {new Date(
//                                                         msg.created_at
//                                                     ).toLocaleTimeString([], {
//                                                         hour: "2-digit",
//                                                         minute: "2-digit",
//                                                     })}
//                                                 </Typography>
//                                             )}
//                                         </Box>
//                                     ))}
//                                 </React.Fragment>
//                             )
//                         )}
//                         <div ref={messagesEndRef} />
//                     </Stack>
//                 </Box>

//                 {activity && (
//                     <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         fontStyle="italic"
//                         mb={1}
//                     >
//                         {activity}
//                     </Typography>
//                 )}

//                 <Box sx={{ display: "flex", gap: 1 }}>
//                     <TextField
//                         fullWidth
//                         variant="outlined"
//                         placeholder="Type your message..."
//                         size="small"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         onKeyDown={(e) => {
//                             handleTyping();
//                             if (e.key === "Enter") handleSend();
//                         }}
//                     />
//                     <IconButton
//                         color="primary"
//                         onClick={handleSend}
//                         sx={{
//                             bgcolor: "primary.main",
//                             color: "#fff",
//                             ":hover": { bgcolor: "primary.dark" },
//                         }}
//                     >
//                         <SendIcon />
//                     </IconButton>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// };

// export default ChatApp;


import React from "react";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Paper,
    Stack,
    Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const API_URL = process.env.REACT_APP_MESSAGE_API;
const socket = io(`${API_URL}` || "http://localhost:4500", {
    auth: { token },
});

let userId = null;
try {
    userId = jwtDecode(token)?.user_id;
} catch (e) {
    console.error("Invalid token");
}

const ChatApp = () => {
    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [editing, setEditing] = React.useState(null);
    const [editText, setEditText] = React.useState("");
    const [activity, setActivity] = React.useState("");
    const messagesEndRef = React.useRef(null);

    React.useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${API_URL}/messages`);
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };
        fetchMessages();
    }, []);

    React.useEffect(() => {
        socket.on("message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("activity", (name) => {
            setActivity(name ? `${name} is typing...` : "");
            if (name) setTimeout(() => setActivity(""), 3500);
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

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/messages/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
        } catch (err) {
            console.error("Error deleting message:", err);
        }
    };

    const startEdit = (msg) => {
        setEditing(msg.id);
        setEditText(msg.text);
    };

    const cancelEdit = () => {
        setEditing(null);
        setEditText("");
    };

    const handleUpdate = async (id) => {
        try {
            const res = await fetch(`${API_URL}/messages/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text: editText }),
            });
            const updated = await res.json();
            setMessages((prev) =>
                prev.map((msg) => (msg.id === id ? updated : msg))
            );
            cancelEdit();
        } catch (err) {
            console.error("Error updating message:", err);
        }
    };

    const getDateLabel = (dateStr) => {
        const msgDate = new Date(dateStr);
        const now = new Date();

        const isToday = msgDate.toDateString() === now.toDateString();
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const isYesterday = msgDate.toDateString() === yesterday.toDateString();

        if (isToday) return "Today";
        if (isYesterday) return "Yesterday";
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
                    <Stack spacing={1}>
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
                                    {msgs.map((msg, i) => (
                                        <Box
                                            key={`${msg.id}-${i}`}
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

                                            {editing === msg.id ? (
                                                <>
                                                    <TextField
                                                        value={editText}
                                                        onChange={(e) =>
                                                            setEditText(
                                                                e.target.value
                                                            )
                                                        }
                                                        size="small"
                                                        fullWidth
                                                    />
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "flex-end",
                                                            gap: 1,
                                                            mt: 1,
                                                        }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            onClick={cancelEdit}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    msg.id
                                                                )
                                                            }
                                                            startIcon={
                                                                <SaveIcon />
                                                            }
                                                        >
                                                            Save
                                                        </Button>
                                                    </Box>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography variant="body2">
                                                        {msg.text}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
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
                                                        {msg.user_id ===
                                                            userId && (
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    gap: 1,
                                                                }}
                                                            >
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() =>
                                                                        startEdit(
                                                                            msg
                                                                        )
                                                                    }
                                                                >
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            msg.id
                                                                        )
                                                                    }
                                                                >
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </>
                                            )}
                                        </Box>
                                    ))}
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
                    <IconButton color="primary" onClick={handleSend}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatApp;
