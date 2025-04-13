import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Box, Button } from "@mui/material";

export default function SignIn() {
    const googleSignIn = () => {
        // Logic for Google Sign-In
        console.log("Google Sign-In");
    };
    const anonymousSignIn = () => {
        // Logic for Anonymous Sign-In
        console.log("Anonymous Sign-In");
    };
    const emailSignIn = () => {
        // Logic for Email Sign-In
        console.log("Email Sign-In");
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
                sx={{ boxShadow: 5, mx: "0.5rem" }}
            >
                <Box
                    backgroundColor="secondary.main"
                    borderRadius="10px"
                    mb="3rem"
                    padding="0.75rem"
                >
                    <ChatBubbleOutlineIcon
                        sx={{ color: "#fff", fontSize: 100 }}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => googleSignIn()}
                >
                    Sign in with Google
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => emailSignIn()}
                    sx={{ mt: 2 }}
                >
                    Sign in with Email
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => anonymousSignIn()}
                    sx={{ mt: 2 }}
                >
                    Sign in as a guest
                </Button>
            </Box>
        </Box>
    );
}