import React, {PropsWithChildren, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, IconButton, Fab} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

export const CJDialog = ({title, buttonTitle, children, useFab, onClose}: PropsWithChildren<{
    title: string,
    buttonTitle: string,
    useFab?: boolean,
    onClose?: () => void
}>) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        if (onClose) {
            onClose();
        }
    };

    return <>
        {useFab ? (
            <Fab 
                color="primary" 
                aria-label="add"
                onClick={() => setOpen(!open)}
                sx={{
                    position: 'fixed',
                    bottom: 80,
                    right: 16,
                    zIndex: 1000
                }}
            >
                <AddIcon />
            </Fab>
        ) : (
            <Button onClick={() => setOpen(!open)}>
                {buttonTitle}
            </Button>
        )}
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {title}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                {React.cloneElement(children as React.ReactElement, { onClose: handleClose })}
            </DialogContent>
        </Dialog>
    </>
}
