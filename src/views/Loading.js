import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
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
                <CircularProgress color="secondary" />
            </Box>
        </Box>
    );
}