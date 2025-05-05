import React, { useRef, useState } from "react";
import { Box, Paper, Button, TextField } from "@mui/material";

const SwipeItem = ({ text, onDelete, onEdit }) => {
    const ref = useRef();
    const isSwiped = useRef(false);
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(text);
    let downX = null;

    const onPointerDown = (e) => {
        downX = e.clientX;
        ref.current.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (downX === null) return;
        const deltaX = e.clientX - downX;

        if (deltaX < -30 && !isSwiped.current) {
            ref.current.style.transform = `translateX(-120px)`;
            isSwiped.current = true;
        }

        if (deltaX > 30 && isSwiped.current) {
            ref.current.style.transform = `translateX(0px)`;
            isSwiped.current = false;
        }
    };

    const onPointerUp = () => {
        downX = null;
    };

    const handleEditSubmit = () => {
        setEditing(false);
        if (inputValue.trim()) onEdit(inputValue);
    };

    return (
        <Box sx={{ position: "relative", overflow: "hidden", mb: 1 }}>
            <Box
                sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    zIndex: 1,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditing(true)}
                    sx={{ width: 60 }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onDelete}
                    sx={{ width: 60 }}
                >
                    Delete
                </Button>
            </Box>

            <Paper
                ref={ref}
                elevation={2}
                sx={{
                    p: 2,
                    zIndex: 2,
                    transition: "transform 0.3s ease",
                    position: "relative",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                {editing ? (
                    <TextField
                        variant="standard"
                        fullWidth
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleEditSubmit}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleEditSubmit()
                        }
                    />
                ) : (
                    <span>{inputValue}</span>
                )}
            </Paper>
        </Box>
    );
};

export default SwipeItem;
