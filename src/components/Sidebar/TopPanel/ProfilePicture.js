import { useContext } from "react";
import { Box } from "@mui/material";
import { StyledAvatar } from "./TopPanel.styled";
import { UserContext } from "../../../hooks/Context";

export default function ProfilePicture() {
    const { user } = useContext(UserContext);

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <StyledAvatar
                alt={user.displayName}
                src={user.photoURL}
                sx={{ width: 40, height: 40 }}
            />
        </Box>

        // <Box>
        //     <StyledAvatar alt="profile-picture" src={user.photoURL} />
        // </Box>
    );
}