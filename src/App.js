import React, { useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import ChatList from "./components/ChatList";
import ChatMessage from "./components/ChatMessage";
import MessageInput from "./components/MessageInput";
import UserAvatar from "./components/UserAvatar";
import ChatPage from "./components/ChatPage";
import Profile from "./components/Profile";
import Connect from "./components/Connect";
import Calls from "./components/Calls";
import MobileMenu from "./components/MobileMenu";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import SignInGoogle from "./components/SignInGoogle";
import "./App.css";

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/signin" replace />;
    }
    return children;
};

function AppContent() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hey, how are you?",
            time: "10:30 AM",
            isOwn: false,
        },
        {
            id: 2,
            text: "I'm good, thanks! How about you?",
            time: "10:31 AM",
            isOwn: true,
        },
        {
            id: 3,
            text: "Doing great! Want to catch up later?",
            time: "10:32 AM",
            isOwn: false,
        },
    ]);

    const handleSendMessage = (text) => {
        const newMessage = {
            id: messages.length + 1,
            text,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            isOwn: true,
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="app">
            <div className="app-container">
                <div className="sidebar">
                    <ChatList onSelectChat={setSelectedChat} />
                </div>
                <div className="chat-container">
                    {selectedChat ? (
                        <>
                            <div className="chat-header">
                                <UserAvatar
                                    src={selectedChat.avatar}
                                    alt={selectedChat.name}
                                    size="medium"
                                />
                                <h2>{selectedChat.name}</h2>
                            </div>
                            <div className="messages-container">
                                {messages.map((message) => (
                                    <ChatMessage
                                        key={message.id}
                                        message={message}
                                        isOwn={message.isOwn}
                                    />
                                ))}
                            </div>
                            <MessageInput onSendMessage={handleSendMessage} />
                        </>
                    ) : (
                        <div className="no-chat-selected">
                            <h2>Select a chat to start messaging</h2>
                        </div>
                    )}
                </div>
            </div>
            <MobileMenu />
        </div>
    );
}

// Create router with future flags
const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Navigate to="/signin" replace />,
        },
        {
            path: "/signin",
            element: <SignIn />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
        {
            path: "/auth/google/callback",
            element: <SignInGoogle />,
        },
        {
            path: "/home",
            element: (
                <ProtectedRoute>
                    <AppContent />
                </ProtectedRoute>
            ),
        },
        {
            path: "/chat/:chatId",
            element: (
                <ProtectedRoute>
                    <ChatPage />
                </ProtectedRoute>
            ),
        },
        {
            path: "/profile",
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            ),
        },
        {
            path: "/connect",
            element: (
                <ProtectedRoute>
                    <Connect />
                </ProtectedRoute>
            ),
        },
        {
            path: "/calls",
            element: (
                <ProtectedRoute>
                    <Calls />
                </ProtectedRoute>
            ),
        },
    ],
    {
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        },
    }
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
