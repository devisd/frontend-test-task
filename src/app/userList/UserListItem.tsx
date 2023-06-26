import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Buttons } from "./buttons/Buttons";
import { User } from "../../types/types";

import styles from "./../../assets/styles/UserList.module.css";

interface IProps {
  users: User[];
  onClick: (user: User, rating: number) => void;
}

export const UserListItem: React.FC<IProps> = ({ users, onClick }) => {
  return (
    <>
      {users.map((user) => (
        <ListItem key={user.id} className={styles.list__item}>
          <img
            alt="Remy Sharp"
            src={user.avatar}
            className={styles.list__avatar}
          />
          <ListItemText
            primary={`${user.first_name} ${user.last_name}`}
            secondary={`/ ${user.username} /`}
          />
          <Buttons user={user} onClick={onClick} />
        </ListItem>
      ))}
    </>
  );
};
