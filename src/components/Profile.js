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
                // console.log("Profile data:", data);

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch user profile"
                    );
                }

                setUser(data);
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
                <button className="sign-out-button" onClick={handleSignOut}>
                    Offline
                </button>
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
                <button
                    className="edit-profile-button"
                    onClick={() => navigate("/profile/edit")}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
