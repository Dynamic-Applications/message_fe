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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import { useSwipeable } from "react-swipeable";

const token = localStorage.getItem("token");
const currentUserId = localStorage.getItem("user_id"); // Assuming you have the user_id in localStorage
const API_URL = process.env.REACT_APP_MESSAGE_API;

const socket = io(`${API_URL}` || "http://localhost:4500", {
    auth: { token },
});

const ChatApp = () => {
    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [activity, setActivity] = React.useState("");
    const messagesEndRef = React.useRef(null);

    const [ setShowOptions] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editText, setEditText] = React.useState("");
    
    const [swipedMessageId, setSwipedMessageId] = React.useState(null);

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
            if (name) {
                setTimeout(() => setActivity(""), 3500);
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

    const handleEdit = async (id, newText) => {
        try {
            const res = await fetch(`${API_URL}/messages/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text: newText }),
            });
            const updated = await res.json();
            setMessages((prev) =>
                prev.map((msg) => (msg.id === id ? updated : msg))
            );
        } catch (err) {
            console.error("Edit failed:", err);
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

    // Use `useSwipeable` on the entire container to track swipes
    const swipeableHandlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            // Set the swiped message ID to show the options
            setSwipedMessageId(eventData.id);
        },
        onSwipedRight: () => {
            setSwipedMessageId(null); // Hide the options when swiped back
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

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
                    {...swipeableHandlers} // Applying swipeable handlers to the container
                >
                    <Stack spacing={1}>
                        {Object.entries(groupedMessages).map(([label, msgs]) => (
                            <React.Fragment key={label}>
                                <Box sx={{ textAlign: "center", my: 1 }}>
                                    <Typography variant="caption" fontWeight="bold">
                                        {label}
                                    </Typography>
                                </Box>
                                {msgs.map((msg) => {
                                    const isOwner = String(msg.user_id) === currentUserId;

                                    return (
                                        <Box
                                            key={msg.id}
                                            sx={{ position: "relative", padding: 1 }}
                                        >
                                            <Box
                                                sx={{
                                                    bgcolor: "#e0f7fa",
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    mb: 1,
                                                    position: "relative",
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                                    {msg.username}
                                                </Typography>

                                                {isEditing && msg.id === swipedMessageId ? (
                                                    <>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            value={editText}
                                                            onChange={(e) => setEditText(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleEdit(msg.id, editText);
                                                                    setIsEditing(false);
                                                                    setShowOptions(false);
                                                                }
                                                            }}
                                                        />
                                                    </>
                                                ) : (
                                                    <Typography variant="body2">{msg.text}</Typography>
                                                )}

                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(msg.created_at).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </Typography>

                                                {isOwner && swipedMessageId === msg.id && !isEditing && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            right: 0,
                                                            top: 0,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            bgcolor: "#fff",
                                                            boxShadow: 2,
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        <IconButton onClick={() => setIsEditing(true)} size="small">
                                                            ✏️
                                                        </IconButton>
                                                        <IconButton onClick={() => handleDelete(msg.id)} size="small">
                                                            🗑️
                                                        </IconButton>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </React.Fragment>
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