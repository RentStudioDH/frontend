import { Dialog, DialogContent, DialogActions, Typography, Button, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorDialog = ({ open, handleClose, message }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth='lg'
            PaperProps={{
                style: { backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' },
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent style={{ textAlign: 'center' }}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                    <ErrorIcon style={{ fontSize: 60, color: '#8B0000' }} />
                    <Typography variant="h6" style={{ color: '#8B0000', marginTop: '20px' }} id="alert-dialog-description">
                        {message}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                <Button onClick={handleClose} style={{ backgroundColor: '#A62639', color: '#fff' }}>
                    Volver atrás
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;
