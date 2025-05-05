import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const API_URL =
    process.env.REACT_APP_MESSAGE_API || "https://messageapi-z2ao.onrender.com";

const EditProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("user_id");

            if (!token || !userId) {
                navigate("/signin");
                return;
            }

            const res = await fetch(`${API_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setUser(data);
            setEditedUser(data);
        };

        fetchData();
    }, [navigate]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setAvatarFile(file);
        } else {
            alert("Max size is 5MB");
        }
    };

    const uploadAvatar = async () => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        await fetch(`${API_URL}/users/profile/avatar`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        const interestsArray =
            typeof editedUser.interests === "string"
                ? editedUser.interests.split(",").map((i) => i.trim())
                : editedUser.interests;

        const profileData = {
            status: editedUser.status || "Available",
            phone: editedUser.phone || "",
            location: editedUser.location || "",
            bio: editedUser.bio || "",
            interests: interestsArray || [],
        };

        const res = await fetch(`${API_URL}/users/profile/${userId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        });

        if (res.ok) {
            if (avatarFile) await uploadAvatar();
            navigate("/profile");
        } else {
            const errData = await res.json();
            alert(errData.message || "Failed to save");
        }
    };

    const handleCancel = () => {
        navigate("/profile");
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-page">
            <div className="profile-content">
                <div className="profile-avatar-section">
                    <div className="avatar-container">
                        <img
                            src={
                                user?.avatarUrl ||
                                `${API_URL}/users/profile/avatar`
                            }
                            onError={(e) => {
                                e.target.src =
                                    "https://static.vecteezy.com/system/resources/previews/026/958/482/non_2x/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg";
                            }}
                            alt={user?.username}
                        />
                    </div>
                    <h1>{user?.username}</h1>
                    <p className="user-status">{user?.status || "Available"}</p>
                </div>
                <div className="profile-info-section">
                    <h2>Edit Profile</h2>
                    <div className="edit-field">
                        <label>Phone</label>
                        <input
                            type="text"
                            value={editedUser.phone}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    phone: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="edit-field">
                        <label>Location</label>
                        <input
                            type="text"
                            value={editedUser.location}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    location: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="edit-field">
                        <label>Bio</label>
                        <textarea
                            value={editedUser.bio}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    bio: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="edit-field">
                        <label>Interests</label>
                        <input
                            type="text"
                            value={editedUser.interests}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    interests: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="edit-field">
                        <label>New Avatar</label>
                        <input type="file" onChange={handleAvatarChange} />
                    </div>

                    <div className="edit-buttons">
                        <button className="save-button" onClick={handleSave}>
                            Save Changes
                        </button>
                        <button
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
