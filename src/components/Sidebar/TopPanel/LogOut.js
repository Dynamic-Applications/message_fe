import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { Box, IconButton } from "@mui/material";

const googleSignOut = () => {
    const auth = window.firebase.auth();
    auth.signOut().then(() => {
        console.log("User signed out.");
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
}
export default function LogOut() {
    return (
        <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
            <Box>
                <IconButton aria-label="logout" onClick={googleSignOut}>
                    <LogoutIcon color="primary" fontSize="small" />
                </IconButton>
            </Box>
        </Link>
    );
}