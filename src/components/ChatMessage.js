import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ message, isOwn }) => {
    return (
        <div
            className={`message-container ${
                isOwn ? "own-message" : "other-message"
            }`}
        >
            <div
                className={`message-bubble ${
                    isOwn ? "own-bubble" : "other-bubble"
                }`}
            >
                <p className="message-text">{message.text}</p>
                <span className="message-time">{message.time}</span>
            </div>
        </div>
    );
};

export default ChatMessage;
