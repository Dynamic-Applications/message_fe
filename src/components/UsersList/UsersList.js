import UsersListItem from "./UsersListItem";
import { useState, useEffect, useContext } from "react";
import { Button, Typography } from "@mui/material";
import { UserContext } from "../../hooks/Context";
import { StyledContainer, StyledList } from "./UsersList.styled";

export default function UsersList() {
    const {
        chatType,
        userDataClickHandler,
        handleGroupButtonConfirm,
        updating,
    } = useContext(UserContext);
    
    const { user } = useContext(UserContext);
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        // Simulate fetching users from a server
        const fetchUsers = async () => {
            const response = await fetch("/api/users");
            const data = await response.json();
            setUsersList(data);
        };
        fetchUsers();
    }
    , []);
    
    
    return (
        <StyledContainer sx={{ boxShadow: 24 }}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        textAlign="center"
        sx={{ mb: 3.5 }}
      >
        {updating ? "Add User" : "Create New Chat"}
      </Typography>
      <StyledList dense>
        {usersList.map((userData) =>
          userData.data.uid === user.uid ? null : (
            <UsersListItem
              key={userData.id}
              userData={userData}
              userDataClickHandler={userDataClickHandler}
            />
          )
        )}
      </StyledList>
      {chatType === 2 ? (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 3.5 }}
          onClick={handleGroupButtonConfirm}
        >
          Confirm
        </Button>
      ) : null}
    </StyledContainer>
  );
}