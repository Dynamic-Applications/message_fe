import React, { useState } from "react";
import "./Calls.css";

const Calls = () => {
    const [activeTab, setActiveTab] = useState("all"); // all, missed, outgoing, incoming

    // Mock call history data - in a real app, this would come from an API
    const callHistory = [
        {
            id: 1,
            name: "John Doe",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            type: "outgoing",
            status: "completed",
            time: "10:30 AM",
            date: "Today",
            duration: "5:23",
        },
        {
            id: 2,
            name: "Jane Smith",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            type: "incoming",
            status: "missed",
            time: "9:45 AM",
            date: "Today",
            duration: "0:00",
        },
        {
            id: 3,
            name: "Mike Johnson",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            type: "incoming",
            status: "completed",
            time: "Yesterday",
            date: "Yesterday",
            duration: "12:45",
        },
    ];

    // Mock contacts for calling - in a real app, this would come from an API
    const contacts = [
        {
            id: 1,
            name: "John Doe",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            status: "Available",
        },
        {
            id: 2,
            name: "Jane Smith",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            status: "Busy",
        },
        {
            id: 3,
            name: "Mike Johnson",
            avatar: "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg",
            status: "Available",
        },
    ];

    const handleCall = (contact) => {
        // In a real app, this would initiate a call
        console.log(`Calling ${contact.name}`);
    };

    const filteredCalls = callHistory.filter((call) => {
        if (activeTab === "all") return true;
        if (activeTab === "missed") return call.status === "missed";
        if (activeTab === "outgoing") return call.type === "outgoing";
        if (activeTab === "incoming") return call.type === "incoming";
        return true;
    });

    return (
        <div className="calls-page">
            <div className="calls-content">
                <div className="call-tabs">
                    <button
                        className={`tab-button ${
                            activeTab === "all" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("all")}
                    >
                        All
                    </button>
                    <button
                        className={`tab-button ${
                            activeTab === "missed" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("missed")}
                    >
                        Missed
                    </button>
                    <button
                        className={`tab-button ${
                            activeTab === "outgoing" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("outgoing")}
                    >
                        Outgoing
                    </button>
                    <button
                        className={`tab-button ${
                            activeTab === "incoming" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("incoming")}
                    >
                        Incoming
                    </button>
                </div>

                <div className="call-history">
                    {filteredCalls.map((call) => (
                        <div key={call.id} className="call-item">
                            <img src={call.avatar} alt={call.name} />
                            <div className="call-info">
                                <h4>{call.name}</h4>
                                <div className="call-details">
                                    <span className={`call-type ${call.type}`}>
                                        {call.type === "outgoing"
                                            ? "Outgoing"
                                            : "Incoming"}
                                    </span>
                                    <span className="call-time">
                                        {call.time}
                                    </span>
                                </div>
                            </div>
                            <div className="call-actions">
                                <button
                                    className="call-button"
                                    onClick={() =>
                                        handleCall({
                                            name: call.name,
                                            avatar: call.avatar,
                                        })
                                    }
                                >
                                    <i className="fas fa-phone"></i>
                                </button>
                                <button className="video-call-button">
                                    <i className="fas fa-video"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="contacts-section">
                    <h3>Quick Call</h3>
                    <div className="contacts-list">
                        {contacts.map((contact) => (
                            <div key={contact.id} className="contact-item">
                                <img src={contact.avatar} alt={contact.name} />
                                <div className="contact-info">
                                    <h4>{contact.name}</h4>
                                    <span
                                        className={`status ${contact.status.toLowerCase()}`}
                                    >
                                        {contact.status}
                                    </span>
                                </div>
                                <div className="contact-actions">
                                    <button
                                        className="call-button"
                                        onClick={() => handleCall(contact)}
                                    >
                                        <i className="fas fa-phone"></i>
                                    </button>
                                    <button className="video-call-button">
                                        <i className="fas fa-video"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calls;
