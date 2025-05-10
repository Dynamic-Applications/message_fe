// import React, { useState } from "react";
// import ChatMessage from "./ChatMessage";
// import MessageInput from "./MessageInput";
// import UserAvatar from "./UserAvatar";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ChatPage.css";

// const chats = [
//     {
//         id: 1,
//         name: "Mirage Kamran",
//         lastMessage: "Hey, how are you?",
//         time: "10:30 AM",
//         avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
//         unread: 2,
//     },
//     {
//         id: 2,
//         name: "Deewa Kamran",
//         lastMessage: "See you tomorrow!",
//         time: "9:45 AM",
//         avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
//         unread: 0,
//     },
//     {
//         id: 3,
//         name: "Mohammed Kamran",
//         lastMessage: "The meeting is at 2 PM",
//         time: "Yesterday",
//         avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
//         unread: 1,
//     },
//     {
//         id: 4,
//         name: "Khpalwak Kamran",
//         lastMessage: "The meeting is at 2 PM",
//         time: "Yesterday",
//         avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
//         unread: 5,
//     },
//     {
//         id: 5,
//         name: "Farkhunda Hashemi",
//         lastMessage: "Working on TikTok",
//         time: "Yesterday",
//         avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
//         unread: 7,
//     },
//     {
//         id: 6,
//         name: "Sadaf Hashemi",
//         lastMessage: "Taking selfies",
//         time: "Yesterday",
//         avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
//         unread: 10,
//     },
//     {
//         id: 7,
//         name: "Farahnaz Hashemi",
//         lastMessage: "busy with instagram",
//         time: "Yesterday",
//         avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
//         unread: 10,
//     },
//     {
//         id: 8,
//         name: "John Doe",
//         lastMessage: "busy with instagram",
//         time: "Yesterday",
//         avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
//         unread: 22,
//     },
//     {
//         id: 9,
//         name: "Jane Doe",
//         lastMessage: "Talking to John Doe",
//         time: "Yesterday",
//         avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
//         unread: 1,
//     },
// ];

// const ChatPage = () => {
//     const { chatId } = useParams();
//     const navigate = useNavigate();
//     const [isMobile] = useState(window.innerWidth <= 400);
//     const [messages, setMessages] = useState([
//         {
//             id: 1,
//             text: "Hey, how are you?",
//             time: "10:30 AM",
//             isOwn: false,
//         },
//         {
//             id: 2,
//             text: "I am good, thanks! How about you?",
//             time: "10:31 AM",
//             isOwn: true,
//         },
//         {
//             id: 3,
//             text: "Doing great! Want to catch up later?",
//             time: "10:32 AM",
//             isOwn: false,
//         },
//     ]);

//     const handleSendMessage = (text) => {
//         const newMessage = {
//             id: messages.length + 1,
//             text,
//             time: new Date().toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//             }),
//             isOwn: true,
//         };
//         setMessages([...messages, newMessage]);
//     };

//     const chat = chats.find((c) => c.id === parseInt(chatId)); // ✅ find correct chat

//     if (!chat) {
//         return <div>Chat not found</div>; // Optional error handling
//     }

//     return (
//         <div className="chat-page">
//             <div className="chat-header">
//                 {isMobile && (
//                     <button
//                         className="back-button"
//                         onClick={() => navigate("/")}
//                         style={{ fontSize: "30px"}}
//                     >
//                         &lt;
//                     </button>
//                 )}
//                 <UserAvatar src={chat.avatar} alt={chat.name} size="medium" />
//                 <h2>{chat.name}</h2>
//             </div>
//             <div className="messages-container">
//                 {messages.map((message) => (
//                     <ChatMessage
//                         key={message.id}
//                         message={message}
//                         isOwn={message.isOwn}
//                     />
//                 ))}
//             </div>
//             <MessageInput onSendMessage={handleSendMessage} />
//         </div>
//     );
// };

// export default ChatPage;



import React, { useState } from "react";
import Connect from "./Connect";
import ChatList from "./ChatList";

const ChatPage = () => {
    const [chats, setChats] = useState([]);

    const handleAddChats = (newUsers) => {
        const newChats = newUsers.map((user) => ({
            id: user.id,
            name: user.username,
            lastMessage: "Start your conversation...",
            time: "Just now",
            avatar: user.avatar || "https://static.vecteezy.com/...",
            unread: 0,
        }));

        // Prevent duplicates
        const existingIds = new Set(chats.map((chat) => chat.id));
        const updatedChats = [
            ...chats,
            ...newChats.filter((chat) => !existingIds.has(chat.id)),
        ];

        setChats(updatedChats);
    };

    return (
        <div className="chat-page">
            <Connect onStartChat={handleAddChats} />
            <ChatList chats={chats} onSelectChat={() => {}} />
        </div>
    );
};

export default ChatPage;
