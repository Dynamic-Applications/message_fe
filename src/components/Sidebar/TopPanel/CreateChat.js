import UsersList from "../../UsersList/UsersList";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Modal, MenuItem } from "@mui/material";
import { useState, useContext } from "react";
import NameGroup from "../../NameGroup/NameGroup";
import { StyledMenu } from "./TopPanel.styled";
import { UserContext } from "../../../hooks/Context";

export default function CreateChat() {
    const { user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [chatType, setChatType] = useState(null);
    const [usersModalOpen, setUsersModalOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [nameGroupModalOpen, setNameGroupModalOpen] = useState(false);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const closeMenu = () => {
        setAnchorEl(null);
    }
    const openUsersModal = () => {
        setUsersModalOpen(true);
    }
    const closeUsersModal = () => {
        setUsersModalOpen(false);
    }
    const openNameGroupModal = () => {
        setNameGroupModalOpen(true);
    }
    const closeNameGroupModal = () => {
        setNameGroupModalOpen(false);
    }
    const changeChatType = (type) => {
        setChatType(type);
        openUsersModal();
    }

    const addUserToGroupChat = (userData) => {
        if (selectedUsers.includes(userData)) {
            setSelectedUsers(selectedUsers.filter((user) => user !== userData));
        } else {
            setSelectedUsers([...selectedUsers, userData]);
        }
    }
    const userDataClickHandler = (userData) => {
        if (chatType === 1) {
            // Handle private chat creation
            console.log("Private chat with:", userData);
        } else if (chatType === 2) {
            addUserToGroupChat(userData);
        }
    }
    const handleGroupButtonConfirm = () => {
        if (selectedUsers.length > 0) {
            openNameGroupModal();
        } else {
            alert("Please select at least one user.");
        }
    }
    // const showChat = (chatsSnap) => {
    //     const chatId = chatsSnap.docs[0].id;
    //     const chatData = chatsSnap.docs[0].data();
    //     console.log("Chat ID:", chatId);
    //     console.log("Chat Data:", chatData);
    // }
    // const isExistingChat = (chatsSnap) => {
    //     return chatsSnap.docs.some((doc) => {
    //         const chatData = doc.data();
    //         const isUserInChat = chatData.users.some((userId) => userId === user.uid);
    //         return isUserInChat;
    //     });
    // }
    // const addNewPrivateChat = (userData) => {
    //     const privateChatData = {
    //         members: [user.uid, userData.id],
    //         type: 1,
    //     };
    //     // Add logic to create a new private chat with the selected user
    //     console.log("Private chat data:", privateChatData);
    //     closeUsersModal();
    // }
    const addNewGroupChat = (groupName) => {
        const groupChatData = {
            members: [user.uid, ...selectedUsers.map((user) => user.id)],
            name: groupName,
            type: 2,
        };
        // Add logic to create a new group chat with the selected users
        console.log("Group chat data:", groupChatData);
        closeNameGroupModal();
    }

    return (
        <Box>
            <IconButton aria-label="create-chat" onClick={openMenu}>
                <AddIcon color="primary" fontSize="small" />
            </IconButton>
            <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                onClick={closeMenu}
            >
                <MenuItem onClick={() => changeChatType(1)}>
                    Private Chat
                </MenuItem>
                <MenuItem onClick={() => changeChatType(2)}>
                    Group Chat
                </MenuItem>
            </StyledMenu>
            <Modal open={usersModalOpen} onClose={closeUsersModal}>
                <Box>
                    <UsersList
                        chatType={chatType}
                        userDataClickHandler={userDataClickHandler}
                        handleGroupButtonConfirm={handleGroupButtonConfirm}
                    />
                </Box>
            </Modal>
            <Modal open={nameGroupModalOpen} onClose={closeNameGroupModal}>
                <Box>
                    <NameGroup addNewGroupChat={addNewGroupChat} />
                </Box>
            </Modal>
        </Box>
    );
}