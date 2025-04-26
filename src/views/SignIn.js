import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    CircularProgress,
    InputLabel,
    OutlinedInput,
    Typography,
    Collapse,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const API_URL = process.env.REACT_APP_MESSAGE_API || "http://localhost:4500";

export default function SignIn() {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );

            const data = await response.json();

            if (!response.ok)
                throw new Error(data.message || "Failed to login.");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user.id);

            alert(data.message);
            navigate("/home");
            window.location.reload();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const googleSignIn = () => {
        window.location.href = `${API_URL}/auth/google`;
    };

    return (
        <Box
            alignItems="center"
            backgroundColor="bgPrimary.main"
            display="flex"
            height="100vh"
            justifyContent="center"
            width="100vw"
        >
            <Box
                alignItems="center"
                backgroundColor="bgSecondary.main"
                display="flex"
                flexDirection="column"
                padding="3rem"
                borderRadius="10px"
                sx={{
                    boxShadow: 5,
                    mx: "0.5rem",
                    minWidth: "320px",
                    maxWidth: "400px",
                    width: "100%",
                }}
            >
                <Box
                    backgroundColor="secondary.main"
                    borderRadius="10px"
                    mb="2rem"
                    padding="0.75rem"
                >
                    <ChatBubbleOutlineIcon
                        sx={{ color: "#fff", fontSize: 80 }}
                    />
                </Box>

                {/* Sign-in options */}
                {!showEmailForm && (
                    <>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={() => setShowEmailForm(true)}
                        >
                            Sign in with Email
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={googleSignIn}
                            sx={{ mt: 2 }}
                        >
                            Sign in with Google
                        </Button>
                    </>
                )}

                {/* Email form collapses in */}
                <Collapse in={showEmailForm} sx={{ width: "100%" }}>
                    <form
                        style={{ width: "100%", marginTop: "1rem" }}
                        onSubmit={handleSubmit}
                    >
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="dense"
                            required
                        />
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mt={2}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Link
                                to="/passresets"
                                style={{ fontSize: "0.8rem" }}
                            >
                                Forgot password?
                            </Link>
                        </Box>
                        <OutlinedInput
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="dense"
                            required
                        />

                        {error && (
                            <Typography color="error" mt={1} mb={1}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} />
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        <Button
                            onClick={() => setShowEmailForm(false)}
                            color="secondary"
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            Cancel
                        </Button>
                    </form>
                </Collapse>

                <Box mt={3}>
                    {showEmailForm && (
                        <Typography variant="body2">
                            First time?{" "}
                            <Link to="/signup" style={{ color: "#1976d2" }}>
                                Create an account
                            </Link>
                        </Typography>
                    )}
                    {/* <Typography variant="body2" mt={1}>
                        <Link to="/" style={{ color: "#1976d2" }}>
                            Back to Homepage
                        </Link>
                    </Typography> */}
                </Box>
            </Box>
        </Box>
    );
}