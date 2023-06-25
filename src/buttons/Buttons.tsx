import Button from "@mui/material/Button";
import { User } from "../types/types";

interface IProps {
  user: User;
  onClick: (user: User, rating: number) => void;
}

export const Buttons: React.FC<IProps> = ({ user, onClick }) => {
  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={() => onClick(user, user.rating - 1)}
      >
        -
      </Button>
      <span style={{ display: "block", margin: "0 10px" }}>{user.rating}</span>
      <Button
        variant="outlined"
        color="success"
        onClick={() => onClick(user, user.rating + 1)}
      >
        +
      </Button>
    </>
  );
};
