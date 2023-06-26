import Button from "@mui/material/Button";
import { User } from "../../../types/types";

import styles from "../../../assets/styles/Buttons.module.css";

interface IProps {
  user: User;
  onClick: (user: User, rating: number) => void;
}

export const Buttons: React.FC<IProps> = ({ user, onClick }) => {
  return (
    <div className={styles.buttons}>
      <Button
        variant="outlined"
        color="error"
        onClick={() => onClick(user, user.rating - 1)}
      >
        -
      </Button>
      <span className={styles.buttons__value}>{user.rating}</span>
      <Button
        variant="outlined"
        color="success"
        onClick={() => onClick(user, user.rating + 1)}
      >
        +
      </Button>
    </div>
  );
};
