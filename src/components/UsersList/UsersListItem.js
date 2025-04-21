import { useState } from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function UsersListItem({ userData, userDataClickHandler }) {
    const [active, setActive] = useState(false);

    const handleClick = (userData) => {
        setActive(!active);
        userDataClickHandler(userData);
    };

    return (
        <ListItem
            button
            onClick={() => handleClick(userData)}
            sx={{
                bgcolor: active && "secondary.main",
                "&:hover": { bgcolor: active && "secondary.main" },
            }}
        >
            <ListItemAvatar>
                <Avatar
                    alt="profile-picture"
                    src={userData.data.photoURL}
                ></Avatar>
            </ListItemAvatar>
            <ListItemText primaryTypographyProps={{ noWrap: true }}>
                {userData.data.displayName}
            </ListItemText>
        </ListItem>
    );
}