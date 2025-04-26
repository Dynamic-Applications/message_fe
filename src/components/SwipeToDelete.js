import React, { useState } from "react";
import {
    IconButton,
    Box,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useSwipeable } from "react-swipeable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SwipeToDelete = ({ messageId, messageText, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(messageText);

    const swipeableHandlers = useSwipeable({
        onSwipedLeft: () => {
            onDelete(messageId); // Trigger delete on swipe left
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const handleEditClick = () => {
        setIsEditing(true); // Show edit dialog
    };

    const handleEditChange = (event) => {
        setEditedMessage(event.target.value);
    };

    const handleSaveEdit = () => {
        onEdit(messageId, editedMessage); // Trigger edit
        setIsEditing(false); // Close the edit dialog
    };

    const handleCloseEdit = () => {
        setIsEditing(false); // Close the edit dialog without saving
    };

    return (
        <Box {...swipeableHandlers} sx={{ position: "relative" }}>
            {/* Delete Button */}
            <IconButton
                onClick={() => onDelete(messageId)}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: -40,
                    transform: "translateY(-50%)",
                    bgcolor: "red",
                    color: "#fff",
                }}
            >
                <DeleteIcon />
            </IconButton>

            {/* Edit Button */}
            <IconButton
                onClick={handleEditClick}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: -80,
                    transform: "translateY(-50%)",
                    bgcolor: "blue",
                    color: "#fff",
                }}
            >
                <EditIcon />
            </IconButton>

            {/* Edit Dialog */}
            <Dialog open={isEditing} onClose={handleCloseEdit}>
                <DialogTitle>Edit Message</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Edit Message"
                        type="text"
                        fullWidth
                        value={editedMessage}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleCloseEdit} color="primary">
                        Cancel
                    </IconButton>
                    <IconButton onClick={handleSaveEdit} color="primary">
                        Save
                    </IconButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SwipeToDelete;




// import React, { useState } from "react";
// import {
//     IconButton,
//     Box,
//     TextField,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Button,
// } from "@mui/material";
// import { useSwipeable } from "react-swipeable";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// const SwipeToDelete = ({ messageId, messageText, onDelete, onEdit }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedMessage, setEditedMessage] = useState(messageText);
//     const [showActions, setShowActions] = useState(false);

//     const swipeableHandlers = useSwipeable({
//         onSwipedLeft: () => setShowActions(true),
//         onSwipedRight: () => setShowActions(false),
//         preventDefaultTouchmoveEvent: true,
//         trackMouse: true,
//     });

//     const handleEditClick = () => setIsEditing(true);
//     const handleEditChange = (event) => setEditedMessage(event.target.value);
//     const handleSaveEdit = () => {
//         onEdit(messageId, editedMessage);
//         setIsEditing(false);
//     };
//     const handleCloseEdit = () => setIsEditing(false);

//     return (
//         <Box
//             {...swipeableHandlers}
//             sx={{
//                 position: "relative",
//                 transition: "all 0.3s ease",
//             }}
//         >
//             {/* Action buttons only shown on swipe */}
//             {showActions && (
//                 <>
//                     <IconButton
//                         onClick={() => onDelete(messageId)}
//                         sx={{
//                             position: "absolute",
//                             top: "50%",
//                             right: -40,
//                             transform: "translateY(-50%)",
//                             bgcolor: "red",
//                             color: "#fff",
//                             zIndex: 1,
//                         }}
//                     >
//                         <DeleteIcon />
//                     </IconButton>
//                     <IconButton
//                         onClick={handleEditClick}
//                         sx={{
//                             position: "absolute",
//                             top: "50%",
//                             right: -80,
//                             transform: "translateY(-50%)",
//                             bgcolor: "blue",
//                             color: "#fff",
//                             zIndex: 1,
//                         }}
//                     >
//                         <EditIcon />
//                     </IconButton>
//                 </>
//             )}

//             {/* Edit Dialog */}
//             <Dialog open={isEditing} onClose={handleCloseEdit}>
//                 <DialogTitle>Edit Message</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Edit Message"
//                         type="text"
//                         fullWidth
//                         value={editedMessage}
//                         onChange={handleEditChange}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseEdit}>Cancel</Button>
//                     <Button onClick={handleSaveEdit}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default SwipeToDelete;
