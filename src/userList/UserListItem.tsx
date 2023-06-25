import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Buttons } from "../buttons/Buttons";
import { User } from "../types/types";

interface IProps {
  users: User[];
  onClick: (user: User, rating: number) => void;
}

export const UserListItem: React.FC<IProps> = ({ users, onClick }) => {
  return (
    <>
      {users.map((user) => (
        <ListItem key={user.id}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={user.avatar} />
          </ListItemAvatar>
          <ListItemText
            style={{ display: "block" }}
            primary={`${user.first_name} ${user.last_name}`}
            secondary={`/ ${user.username} /`}
          />
          <Buttons user={user} onClick={onClick} />
        </ListItem>
      ))}
    </>
  );
};
