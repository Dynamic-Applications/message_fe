import MembersListItem from "./MembersListItem";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { StyledContainer, StyledList } from "./MembersList.styled";

export default function MembersList({ members, handleMemberClick }) {
    const [currentMembers, setCurrentMembers] = useState([]);

    useEffect(() => {
        if (members) {
            setCurrentMembers(members);
        }
    }, [members]);

    return (
        <StyledContainer sx={{ boxShadow: 24 }}>
            <Typography
                id="modal-modal-title"
                variant="h6"
                textAlign="center"
                sx={{ mb: 3.5 }}
            >
                Current Members
            </Typography>
            <StyledList dense>
                {currentMembers.map((member) => (
                    <MembersListItem key={member.id} member={member} />
                ))}
            </StyledList>
        </StyledContainer>
    );
}