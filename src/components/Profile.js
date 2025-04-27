import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const API_URL =
    process.env.REACT_APP_MESSAGE_API || "https://messageapi-z2ao.onrender.com";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [setUploadProgress] = useState(0);

    const fetchUserData = useCallback(
        async (token, userId) => {
            try {
                console.log("Fetching user profile for ID:", userId);
                const response = await fetch(`${API_URL}/users/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    credentials: "include",
                });

                console.log("Profile response status:", response.status);
                const data = await response.json();
                console.log("Profile data:", data);

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch user profile"
                    );
                }

                setUser(data);
                setEditedUser(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError(
                    err.message || "Failed to load profile. Please try again."
                );
                if (
                    err.message.includes("unauthorized") ||
                    err.message.includes("invalid token")
                ) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user_id");
                    navigate("/signin");
                }
            } finally {
                setLoading(false);
            }
        },
        [navigate]
    );

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("user_id");

            if (token && userId) {
                setIsAuthenticated(true);
                await fetchUserData(token, userId);
            } else {
                setLoading(false);
                navigate("/signin");
            }
        };

        checkAuth();
    }, [fetchUserData, navigate]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            // 5MB limit
            setAvatarFile(file);
        } else {
            alert("File size should be less than 5MB");
        }
    };

    const uploadAvatar = async () => {
        if (!avatarFile) return;

        const formData = new FormData();
        formData.append("avatar", avatarFile);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/users/profile/avatar`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload avatar");
            }

            // Refresh the avatar by forcing a new URL
            const timestamp = new Date().getTime();
            setUser((prevUser) => ({
                ...prevUser,
                avatarUrl: `${API_URL}/users/profile/avatar?t=${timestamp}`,
            }));

            setAvatarFile(null);
            setUploadProgress(0);
        } catch (error) {
            console.error("Error uploading avatar:", error);
            alert("Failed to upload avatar");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("user_id");

            // Prepare the data
            const profileData = {
                status: editedUser.status || "Available",
                phone: editedUser.phone || "",
                location: editedUser.location || "",
                bio: editedUser.bio || "",
            };

            // Handle interests - convert to array if it's a string
            let interestsArray = [];
            if (editedUser.interests) {
                if (typeof editedUser.interests === "string") {
                    interestsArray = editedUser.interests
                        .split(",")
                        .map((interest) => interest.trim());
                } else if (Array.isArray(editedUser.interests)) {
                    interestsArray = editedUser.interests;
                }
            }
            profileData.interests = interestsArray;

            console.log("Updating profile with data:", profileData);

            const response = await fetch(`${API_URL}/users/profile/${userId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileData),
            });

            console.log("Profile update response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || "Failed to update profile"
                );
            }

            const data = await response.json();
            console.log("Profile update response:", data);

            setUser(data);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(
                err.message || "Failed to update profile. Please try again."
            );
        }
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    const handleSignOut = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Clear local storage
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                setIsAuthenticated(false);
                navigate("/");
            } else {
                console.error("Logout failed:", await response.text());
            }
        } catch (error) {
            console.error("Error during logout:", error);
            // Still clear local storage and redirect even if server request fails
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            setIsAuthenticated(false);
            navigate("/");
        }
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        try {
            // Try to parse the date if it's a string
            const dateObj = typeof date === "string" ? new Date(date) : date;

            // Check if the date is valid
            if (isNaN(dateObj.getTime())) {
                return "N/A";
            }

            const options = { year: "numeric", month: "long", day: "numeric" };
            return dateObj.toLocaleDateString(undefined, options);
        } catch (error) {
            console.error("Error formatting date:", error);
            return "N/A";
        }
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="loading">Loading profile...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="profile-page">
                <div className="profile-header">
                    <button
                        className="back-button"
                        onClick={() => navigate("/")}
                        style={{ fontSize: "30px" }}
                    >
                        &lt;
                    </button>
                    <h2>Profile</h2>
                </div>
                <div className="profile-content">
                    <div className="not-signed-in">
                        <h3>Please sign in to view your profile</h3>
                        <button
                            className="sign-in-button"
                            onClick={() => navigate("/signin")}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-page">
                <div className="profile-header">
                    <button
                        className="back-button"
                        onClick={() => navigate("/")}
                        style={{ fontSize: "30px" }}
                    >
                        &lt;
                    </button>
                    <h2>Profile</h2>
                </div>
                <div className="profile-content">
                    <div className="error-message">
                        <h3>Error loading profile</h3>
                        <p>{error}</p>
                        <button
                            className="sign-out-button"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                    style={{ fontSize: "30px" }}
                >
                    &lt;
                </button>
                <h2>Profile</h2>
                <button className="sign-out-button" onClick={handleSignOut}>
                    Offline
                </button>
            </div>
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
                    <div className="info-group">
                        <h3>Contact Information</h3>
                        <div className="info-item">
                            <i className="fas fa-envelope"></i>
                            <span>{user?.email}</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-phone"></i>
                            <span>{user?.phone}</span>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{user?.location}</span>
                        </div>
                    </div>

                    <div className="info-group">
                        <h3>About</h3>
                        <p className="user-bio">{user?.bio}</p>
                    </div>

                    <div className="info-group">
                        <h3>Interests</h3>
                        <div className="interests-list">
                            {user?.interests?.map((interest, index) => (
                                <span key={index} className="interest-tag">
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="info-group">
                        <h3>Account Information</h3>
                        <div className="info-item">
                            <i className="fas fa-calendar"></i>
                            <span>
                                Joined{" "}
                                {formatDate(
                                    user?.created_at ||
                                        user?.joinedDate ||
                                        user?.createdAt
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <div className="edit-profile-section">
                        <h3>Edit Profile</h3>
                        <div className="edit-field">
                            <label>Profile Picture</label>
                            <div className="avatar-upload-container">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    id="avatar-upload"
                                    className="file-input"
                                />
                                {avatarFile && (
                                    <button
                                        onClick={uploadAvatar}
                                        className="upload-button"
                                    >
                                        Upload New Avatar
                                    </button>
                                )}
                            </div>
                        </div>
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
                                placeholder="Phone number"
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
                                placeholder="Your location"
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
                                placeholder="Tell us about yourself"
                                rows="4"
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
                                placeholder="Enter interests separated by commas"
                            />
                        </div>
                        <div className="edit-buttons">
                            <button
                                className="save-button"
                                onClick={handleSave}
                            >
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
                ) : (
                    <button
                        className="edit-profile-button"
                        onClick={handleEdit}
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
