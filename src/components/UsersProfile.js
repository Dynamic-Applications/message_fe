import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const API_URL =
    process.env.REACT_APP_MESSAGE_API || "https://messageapi-z2ao.onrender.com";


const UsersProfile = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API_URL}/profile`, {
                    withCredentials: true,
                });
                setProfile(res.data);
                setFormData(res.data);
            } catch (err) {
                setError("Failed to load profile.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await axios.put(
                `/profile/${profile.id}`,
                formData,
                { withCredentials: true }
            );
            setProfile(res.data);
            setEditMode(false);
        } catch (err) {
            setError("Failed to save profile.");
        }
    };

    const handleCancel = () => {
        setFormData(profile);
        setEditMode(false);
    };

    if (isLoading) {
        return <div className="loading">Loading profile...</div>;
    }

    if (error) {
        return (
            <div className="error-message">
                <h3>Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="not-signed-in">
                <h3>You must be signed in to view this profile.</h3>
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
                                profile.avatar?.startsWith("http")
                                    ? profile.avatar
                                    : `/profile/avatar`
                            }
                            alt="User avatar"
                        />
                    </div>
                    <h1>{profile.username || "User"}</h1>
                    <p className="user-status">
                        {profile.status || "No status"}
                    </p>
                </div>

                <div className="profile-info-section">
                    {editMode ? (
                        <div className="edit-profile-form">
                            <div className="edit-field">
                                <label>Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-field">
                                <label>Location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-field">
                                <label>Bio:</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-field">
                                <label>Interests (comma separated):</label>
                                <input
                                    type="text"
                                    name="interests"
                                    value={formData.interests?.join(", ") || ""}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            interests: e.target.value
                                                .split(",")
                                                .map((i) => i.trim()),
                                        }))
                                    }
                                />
                            </div>
                            <div className="edit-buttons">
                                <button
                                    className="save-button"
                                    onClick={handleSave}
                                >
                                    Save
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
                        <div className="info-group">
                            <h3>Contact</h3>
                            <div className="info-item">
                                <i className="fas fa-phone"></i>
                                <span>{profile.phone || "N/A"}</span>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{profile.location || "N/A"}</span>
                            </div>
                            <div className="info-group">
                                <h3>Bio</h3>
                                <p className="user-bio">
                                    {profile.bio || "No bio provided."}
                                </p>
                            </div>
                            <div className="info-group">
                                <h3>Interests</h3>
                                <div className="interests-list">
                                    {Array.isArray(profile.interests) &&
                                    profile.interests.length > 0
                                        ? profile.interests.map(
                                              (interest, i) => (
                                                  <div
                                                      key={i}
                                                      className="interest-tag"
                                                  >
                                                      {interest}
                                                  </div>
                                              )
                                          )
                                        : "No interests listed."}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersProfile;
