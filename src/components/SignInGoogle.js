import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export default function SignInGoogle() {
        const navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
            const params = new URLSearchParams(location.search);
            const token = params.get("token");

            if (token) {
                localStorage.setItem("token", token);
                navigate("/home"); // Redirect to home or wherever you want
                window.location.reload(); // Optional: refresh to reset state
            } else {
                console.error("No token found in query params.");
                navigate("/signin");
            }
        }, [location, navigate]);

        return <p>Signing in with Google...</p>;
}
