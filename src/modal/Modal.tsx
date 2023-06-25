import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { User } from "../types/types";

interface IProps {
  dialogOpen: boolean;
  handleDialogClose: (arg0: boolean) => void;
  dialogType: string | null;
  dialogUser: User | null;
}

export const Modal: React.FC<IProps> = ({
  dialogOpen,
  handleDialogClose,
  dialogType,
  dialogUser,
}) => {
  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogType === "positive"
              ? `Нужно вознаградить ${dialogUser?.username}. Сделать это?`
              : `Пора забанить ${dialogUser?.username}. Сделать это?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleDialogClose(true)}
            autoFocus
          >
            ДА !
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
