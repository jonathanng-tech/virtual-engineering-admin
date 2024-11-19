import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { productStore } from '@/store';

interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function AlertDialog({ open, handleClose }: AlertDialogProps) {
  const navigate = useNavigate();
  const { brand } = useParams();
  const { clearListCart } = productStore();

  return (
    <>
      <Dialog
        sx={{ maxWidth: '500px', margin: 'auto' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: '16px',
            lineHeight: '1.3',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          Switch Store
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontSize: '14px !important',
              lineHeight: '1.3',
              textAlign: 'center',
            }}
          >
            You are about to switch to another store, which will reset your
            design. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '10px', gap: '10px' }}>
          <Button
            sx={{
              width: '50%',
              ':focus': { outline: 'none', border: 'none' },
              background: 'black',
              margin: '0px !important',
            }}
            disableRipple
            onClick={() => {
              clearListCart();
              handleClose();
              navigate(`/${brand}`);
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}
            >
              OK
            </Typography>
          </Button>
          <Button
            sx={{
              width: '50%',
              ':focus': { outline: 'none', border: 'none' },
              background: 'black',
              margin: '0px !important',
            }}
            disableRipple
            onClick={handleClose}
            autoFocus
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}
            >
              Cancel
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
