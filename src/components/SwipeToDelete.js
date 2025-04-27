// // import React, { useState } from "react";
// // import {
// //     IconButton,
// //     Box,
// //     TextField,
// //     Dialog,
// //     DialogActions,
// //     DialogContent,
// //     DialogTitle,
// // } from "@mui/material";
// // import { useSwipeable } from "react-swipeable";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import EditIcon from "@mui/icons-material/Edit";

// // const SwipeToDelete = ({ messageId, messageText, onDelete, onEdit }) => {
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [editedMessage, setEditedMessage] = useState(messageText);

// //     const swipeableHandlers = useSwipeable({
// //         onSwipedLeft: () => {
// //             onDelete(messageId); // Trigger delete on swipe left
// //         },
// //         preventDefaultTouchmoveEvent: true,
// //         trackMouse: true,
// //     });

// //     const handleEditClick = () => {
// //         setIsEditing(true); // Show edit dialog
// //     };

// //     const handleEditChange = (event) => {
// //         setEditedMessage(event.target.value);
// //     };

// //     const handleSaveEdit = () => {
// //         onEdit(messageId, editedMessage); // Trigger edit
// //         setIsEditing(false); // Close the edit dialog
// //     };

// //     const handleCloseEdit = () => {
// //         setIsEditing(false); // Close the edit dialog without saving
// //     };

// //     return (
// //         <Box {...swipeableHandlers} sx={{ position: "relative" }}>
// //             {/* Delete Button */}
// //             <IconButton
// //                 onClick={() => onDelete(messageId)}
// //                 sx={{
// //                     position: "absolute",
// //                     top: "50%",
// //                     right: -40,
// //                     transform: "translateY(-50%)",
// //                     bgcolor: "red",
// //                     color: "#fff",
// //                 }}
// //             >
// //                 <DeleteIcon />
// //             </IconButton>

// //             {/* Edit Button */}
// //             <IconButton
// //                 onClick={handleEditClick}
// //                 sx={{
// //                     position: "absolute",
// //                     top: "50%",
// //                     right: -80,
// //                     transform: "translateY(-50%)",
// //                     bgcolor: "blue",
// //                     color: "#fff",
// //                 }}
// //             >
// //                 <EditIcon />
// //             </IconButton>

// //             {/* Edit Dialog */}
// //             <Dialog open={isEditing} onClose={handleCloseEdit}>
// //                 <DialogTitle>Edit Message</DialogTitle>
// //                 <DialogContent>
// //                     <TextField
// //                         autoFocus
// //                         margin="dense"
// //                         label="Edit Message"
// //                         type="text"
// //                         fullWidth
// //                         value={editedMessage}
// //                         onChange={handleEditChange}
// //                     />
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <IconButton onClick={handleCloseEdit} color="primary">
// //                         Cancel
// //                     </IconButton>
// //                     <IconButton onClick={handleSaveEdit} color="primary">
// //                         Save
// //                     </IconButton>
// //                 </DialogActions>
// //             </Dialog>
// //         </Box>
// //     );
// // };

// // export default SwipeToDelete;

// import React, { useState } from "react";
// import {
//     IconButton,
//     Box,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
// } from "@mui/material";
// import { useSwipeable } from "react-swipeable";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// const SwipeToDelete = ({ messageId, messageText, onDelete, onEdit }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedMessage, setEditedMessage] = useState(messageText);
//     const [showButtons, setShowButtons] = useState(false); // Track if swipe left occurred

//     const swipeableHandlers = useSwipeable({
//         onSwipedLeft: () => {
//             setShowButtons(true); // Show buttons after swipe left
//             onDelete(messageId); // Trigger delete on swipe left
//         },
//         preventDefaultTouchmoveEvent: true,
//         trackMouse: true,
//     });

//     const handleEditClick = () => {
//         setIsEditing(true); // Show edit dialog
//     };

//     const handleEditChange = (event) => {
//         setEditedMessage(event.target.value);
//     };

//     const handleSaveEdit = () => {
//         onEdit(messageId, editedMessage); // Trigger edit
//         setIsEditing(false); // Close the edit dialog
//     };

//     const handleCloseEdit = () => {
//         setIsEditing(false); // Close the edit dialog without saving
//     };

//     return (
//         <Box {...swipeableHandlers} sx={{ position: "relative" }}>
//             {/* Conditionally render the Delete Button */}
//             {showButtons && (
//                 <IconButton
//                     onClick={() => onDelete(messageId)}
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         right: -40,
//                         transform: "translateY(-50%)",
//                         bgcolor: "red",
//                         color: "#fff",
//                     }}
//                 >
//                     <DeleteIcon />
//                 </IconButton>
//             )}

//             {/* Conditionally render the Edit Button */}
//             {showButtons && (
//                 <IconButton
//                     onClick={handleEditClick}
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         right: -80,
//                         transform: "translateY(-50%)",
//                         bgcolor: "blue",
//                         color: "#fff",
//                     }}
//                 >
//                     <EditIcon />
//                 </IconButton>
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
//                     <IconButton onClick={handleCloseEdit} color="primary">
//                         Cancel
//                     </IconButton>
//                     <IconButton onClick={handleSaveEdit} color="primary">
//                         Save
//                     </IconButton>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default SwipeToDelete;








// import styled from "styled-components";
// import React, { useState, useRef } from "react";
// export const SwipeToDelete = ({ rows, onDelete }) => {
//     return (
//         <Wrapper>
//             {rows.map((row) => (
//                 <Item key={row.id}>
//                     <p>{row.title}</p>
//                     <DeleteButton onClick={() => onDelete(row.id)}>Delete</DeleteButton>
//                 </Item>
//             ))}
//         </Wrapper>
//     );
// };

// const Wrapper = styled.div`
//     width: 80%;
//     border: 1px solid;
//     overflow: hidden;
// `;

// const DeleteButton = styled.button`
//     background: red;
//     text-align: left;
//     border: none;
//     min-width: 55px;
// `;

// const Item = ({ children }) => {
//     const ref = useRef();
//     let downX;

//     const onPointerMove = (e) => {
//         const newX = e.clientX;
//         if (newX - downX < -30) {
//             ref.current.style.transform = `translateX(-55px)`;
//             setTimeout(() => {
//                 if (ref.current) ref.current.style.transform = `translateX(0px)`;
//             }, 4000);
//         } else ref.current.style.transform = `translateX(0px)`;
//     };

//     const onPointerDown = (e) => {
//         downX = e.clientX;
//         ref.current.addEventListener("pointermove", onPointerMove);
//     };

//     const onPointerUp = () => {
//         ref.current.removeEventListener("pointermove", onPointerMove);
//         ref.current.style.transform = `translateX(0px)`;
//     };

//     return (
//         <ItemWrapper
//             onPointerDown={onPointerDown}
//             ref={ref}
//             onPointerUp={onPointerUp}
//         >
//             {children}
//         </ItemWrapper>
//     );
// };

// const ItemWrapper = styled.div`
//     display: flex;
//     background-color: lightgray;
//     margin: 3px 0;
//     transition: transform 800ms;

//     p {
//         flex: 1 0 100%;
//     }
// `;




// export default SwipeToDelete;





import styled from "styled-components";
import React, { useRef } from "react";

export const SwipeToDelete = ({ rows, onDelete, onEdit }) => {
    return (
        <Wrapper>
            {rows.map((row) => (
                <Item key={row.id}>
                    <p>{row.title}</p>
                    <EditButton onClick={() => onEdit(row.id)}>Edit</EditButton>
                    <DeleteButton onClick={() => onDelete(row.id)}>
                        Delete
                    </DeleteButton>
                </Item>
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 80%;
    border: 1px solid;
    overflow: hidden;
`;

const DeleteButton = styled.button`
    background: red;
    text-align: left;
    border: none;
    min-width: 55px;
`;

const EditButton = styled.button`
    background: orange;
    text-align: left;
    border: none;
    min-width: 55px;
`;

const Item = ({ children }) => {
    const ref = useRef();
    let downX;

    const onPointerMove = (e) => {
        const newX = e.clientX;
        if (newX - downX < -30) {
            ref.current.style.transform = `translateX(-110px)`; // -55px per button
            setTimeout(() => {
                if (ref.current)
                    ref.current.style.transform = `translateX(0px)`;
            }, 10000);
        } else ref.current.style.transform = `translateX(0px)`;
    };

    const onPointerDown = (e) => {
        downX = e.clientX;
        ref.current.addEventListener("pointermove", onPointerMove);
    };

    const onPointerUp = () => {
        ref.current.removeEventListener("pointermove", onPointerMove);
        ref.current.style.transform = `translateX(0px)`;
    };

    return (
        <ItemWrapper
            onPointerDown={onPointerDown}
            ref={ref}
            onPointerUp={onPointerUp}
        >
            {children}
        </ItemWrapper>
    );
};

const ItemWrapper = styled.div`
    display: flex;
    background-color: lightgray;
    margin: 3px 0;
    transition: transform 800ms;

    p {
        flex: 1 0 100%;
    }
`;

export default SwipeToDelete;


// import React, { useState, useRef } from "react";
// import {
//     Box,
//     IconButton,
//     Button,
//     Typography,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Stack,
//     Paper,
// } from "@mui/material";
// import { useSwipeable } from "react-swipeable";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// const SwipeToDelete = ({ rows, onDelete, onEdit }) => {
//     return (
//         <Box sx={{ width: "100%", maxWidth: 500, mx: "auto", mt: 2 }}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//                 <Stack spacing={1}>
//                     {rows.map((row) => (
//                         <SwipeItem
//                             key={row.id}
//                             row={row}
//                             onDelete={onDelete}
//                             onEdit={onEdit}
//                         />
//                     ))}
//                 </Stack>
//             </Paper>
//         </Box>
//     );
// };

// const SwipeItem = ({ row, onDelete, onEdit }) => {
//     const ref = useRef();
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedMessage, setEditedMessage] = useState(row.title);

//     let downX;

//     const onPointerMove = (e) => {
//         const newX = e.clientX;
//         if (newX - downX < -30) {
//             ref.current.style.transform = `translateX(-110px)`;
//             setTimeout(() => {
//                 if (ref.current)
//                     ref.current.style.transform = `translateX(0px)`;
//             }, 5000);
//         } else {
//             ref.current.style.transform = `translateX(0px)`;
//         }
//     };

//     const onPointerDown = (e) => {
//         downX = e.clientX;
//         ref.current.addEventListener("pointermove", onPointerMove);
//     };

//     const onPointerUp = () => {
//         ref.current.removeEventListener("pointermove", onPointerMove);
//         ref.current.style.transform = `translateX(0px)`;
//     };

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleSaveEdit = () => {
//         onEdit(row.id, editedMessage);
//         setIsEditing(false);
//     };

//     const handleCloseEdit = () => {
//         setIsEditing(false);
//     };

//     return (
//         <Box
//             ref={ref}
//             onPointerDown={onPointerDown}
//             onPointerUp={onPointerUp}
//             sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "#f0f2f5",
//                 p: 1,
//                 borderRadius: 2,
//                 overflow: "hidden",
//                 position: "relative",
//                 transition: "transform 0.5s",
//             }}
//         >
//             <Typography
//                 variant="body1"
//                 sx={{ flexGrow: 1, overflowWrap: "break-word" }}
//             >
//                 {row.title}
//             </Typography>

//             <IconButton
//                 onClick={handleEditClick}
//                 sx={{
//                     bgcolor: "warning.main",
//                     color: "white",
//                     ml: 1,
//                     ":hover": { bgcolor: "warning.dark" },
//                 }}
//                 size="small"
//             >
//                 <EditIcon fontSize="small" />
//             </IconButton>

//             <IconButton
//                 onClick={() => onDelete(row.id)}
//                 sx={{
//                     bgcolor: "error.main",
//                     color: "white",
//                     ml: 1,
//                     ":hover": { bgcolor: "error.dark" },
//                 }}
//                 size="small"
//             >
//                 <DeleteIcon fontSize="small" />
//             </IconButton>

//             {/* Edit Dialog */}
//             <Dialog open={isEditing} onClose={handleCloseEdit}>
//                 <DialogTitle>Edit Message</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Edit Message"
//                         fullWidth
//                         value={editedMessage}
//                         onChange={(e) => setEditedMessage(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseEdit} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSaveEdit} color="primary">
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default SwipeToDelete;
