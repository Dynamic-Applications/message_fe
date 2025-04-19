import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";


export default function MembersListItem({ member }) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar
                    alt="profile-picture"
                    src={member.data.photoURL}
                ></Avatar>
            </ListItemAvatar>
            <ListItemText primaryTypographyProps={{ noWrap: true }}>
                {member.data.displayName}
            </ListItemText>
        </ListItem>
    );
}