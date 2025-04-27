import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChatList.css";

const ChatList = ({ onSelectChat }) => {
    const navigate = useNavigate();
    const chats = [
        {
            id: 1,
            name: "Mirage Kamran",
            lastMessage: "Hey, how are you?",
            time: "10:30 AM",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            unread: 2,
        },
        {
            id: 2,
            name: "Deewa Kamran",
            lastMessage: "See you tomorrow!",
            time: "9:45 AM",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            unread: 0,
        },
        {
            id: 3,
            name: "Mohammed Kamran",
            lastMessage: "The meeting is at 2 PM",
            time: "Yesterday",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            unread: 1,
        },
        {
            id: 4,
            name: "Khpalwak Kamran",
            lastMessage: "The meeting is at 2 PM",
            time: "Yesterday",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            unread: 5,
        },
        {
            id: 5,
            name: "Farkhunda Hashemi",
            lastMessage: "Working on TikTok",
            time: "Yesterday",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            unread: 7,
        },
        {
            id: 6,
            name: "Sadaf Hashemi",
            lastMessage: "Taking selfies",
            time: "Yesterday",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            unread: 10,
        },
        {
            id: 7,
            name: "Farahnaz Hashemi",
            lastMessage: "busy with instagram",
            time: "Yesterday",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            unread: 10,
        },
        {
            id: 8,
            name: "John Doe",
            lastMessage: "busy with instagram",
            time: "Yesterday",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            unread: 22,
        },
        {
            id: 9,
            name: "Jane Doe",
            lastMessage: "Talking to John Doe",
            time: "Yesterday",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            unread: 1,
        },
    ];

     const handleChatClick = (chat) => {
         onSelectChat(chat);

         // Check if screen width is less than 400px (mobile)
         if (window.innerWidth <= 400) {
             navigate("/chat");
         }
     };

     return (
         <div className="chat-list">
             {chats.map((chat) => (
                 <div
                     key={chat.id}
                     className="chat-item"
                     onClick={() => handleChatClick(chat)}
                 >
                     <div className="chat-avatar">
                         <img src={chat.avatar} alt={chat.name} />
                         {chat.unread > 0 && (
                             <span className="unread-badge">{chat.unread}</span>
                         )}
                     </div>
                     <div className="chat-info">
                         <div className="chat-header">
                             <h3 className="chat-name">{chat.name}</h3>
                             <span className="chat-time">{chat.time}</span>
                         </div>
                         <p className="chat-message">{chat.lastMessage}</p>
                     </div>
                 </div>
             ))}
         </div>
     );
};

export default ChatList;
