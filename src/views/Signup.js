import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    CircularProgress,
    InputLabel,
    OutlinedInput,
    Typography,
    Alert,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const API_URL = process.env.REACT_APP_MESSAGE_API || "http://localhost:4500";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(result.message);
                setTimeout(() => navigate("/signin"), 2000);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
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

                <Typography variant="h5" mb={2}>
                    Create an Account
                </Typography>

                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        margin="dense"
                        required
                    />

                    <InputLabel htmlFor="email" sx={{ mt: 2 }}>
                        Email Address
                    </InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="dense"
                        required
                    />

                    <InputLabel htmlFor="password" sx={{ mt: 2 }}>
                        Password
                    </InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="dense"
                        required
                    />

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            {success}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 3 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Sign Up"}
                    </Button>
                </form>

                <Box mt={3}>
                    <Typography variant="body2">
                        Already have an account?{" "}
                        <Link to="/signin" style={{ color: "#1976d2" }}>
                            Sign in
                        </Link>
                    </Typography>
                    <Typography variant="body2" mt={1}>
                        <Link to="/" style={{ color: "#1976d2" }}>
                            Back to Homepage
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
