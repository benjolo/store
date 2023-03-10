import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function InfoDialog(props: any) {
  const { open, setOpen, item } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {item.specs.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {item.specs.description}
          </DialogContentText>
          <DialogContentText>
            Attack: {item.specs.stats.attack}
            </DialogContentText>
            <DialogContentText>
            Defense: {item.specs.stats.defense}
            </DialogContentText>
            <DialogContentText>
            Speed: {item.specs.stats.speed}
            </DialogContentText>
            <DialogContentText>
            Curability: {item.specs.stats.curability}
            </DialogContentText>
            <DialogContentText>
            Weight: {item.specs.stats.weight}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Insert</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}