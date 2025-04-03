import React, { useEffect } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

// Define the types for the props
interface CustomAlertProps {
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  open: boolean;
  onClose: () => void;

}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, severity, open, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [open, onClose, message]);

  return (
    <Snackbar open={open} onClose={onClose}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;