import {FC, PropsWithChildren, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, IconButton, Fab} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

export const CJDialog = ({title, buttonTitle, children, useFab}: PropsWithChildren<{
    title: string,
    buttonTitle: string,
    useFab?: boolean
}>) => {
    const [open, setOpen] = useState(false);
    return <>
        {useFab ? (
            <Fab 
                color="primary" 
                aria-label="add"
                onClick={() => setOpen(!open)}
                sx={{
                    position: 'fixed',
                    bottom: 16,
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
        <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {title}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
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
                {children}
            </DialogContent>
        </Dialog>
    </>
}
