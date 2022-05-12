import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({severity, msg, cb}) => {
    const [open, setOpen] = React.useState(true);

    return (
        <Collapse in={open}>
        <Alert
        action={
            <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
                setOpen(false);
                cb()
            }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
        }
        sx={{ mb: 2 }}
        >
            {msg}
        </Alert>
    </Collapse>
    )
}

export default CustomAlert