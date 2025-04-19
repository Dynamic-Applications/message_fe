import { useEffect } from "react";

const API_URL = process.env.REACT_APP_FILMFAVES_API;

export default function SignInGoogle() {
    useEffect(() => {
        window.location.href = `${API_URL}/auth/google`;
    }, []);

    return <p>Redirecting to Google...</p>;
}
