import {FC, PropsWithChildren, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const CJDialog = ({title, buttonTitle, children}: PropsWithChildren<{
    title: string,
    buttonTitle: string
}>) => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(!open)}>
            {buttonTitle}
        </Button>
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