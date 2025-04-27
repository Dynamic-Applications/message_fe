import React, { useState } from "react";
import "./MessageInput.css";

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <form className="message-input-container" onSubmit={handleSubmit}>
            <input
                type="text"
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button type="submit" className="send-button">
                Send
            </button>
        </form>
    );
};

export default MessageInput;
