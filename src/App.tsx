import { useState, useEffect } from "react";

import { fetchData } from "./services/fetchData";
import { User } from "./types/types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const App = () => {
  const [positiveUsers, setPositiveUsers] = useState<User[]>([]);
  const [negativeUsers, setNegativeUsers] = useState<User[]>([]);
  const [neutralUsers, setNeutralUsers] = useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogUser, setDialogUser] = useState<User | null>(null);
  const [dialogType, setDialogType] = useState<"positive" | "negative" | null>(
    null
  );

  useEffect(() => {
    const storedData = localStorage.getItem("usersList");
    async function getUsers() {
      if (!storedData) {
        const response = (await fetchData(1)) as User[];
        const data = response.map((user) => ({ ...user, rating: 0 }));
        console.log(data);
        setNeutralUsers([...neutralUsers, ...data]);
      }
    }
    getUsers();
    if (storedData) {
      const parsedData: User[] = JSON.parse(storedData);
      const data = parsedData.map((user) => ({ ...user, rating: 0 }));

      setNeutralUsers([...neutralUsers, ...data]);
    }
  }, []);

  console.log("users", neutralUsers);

  const handleRatingChange = (user: User, rating: number) => {
    const updatedUser = { ...user, rating };
    if (rating > 5) {
      setDialogUser(user);
      setDialogType("positive");
      setDialogOpen(true);
    } else if (rating < -5) {
      setDialogUser(user);
      setDialogType("negative");
      setDialogOpen(true);
    } else {
      if (rating > 0) {
        setPositiveUsers((prev) => [
          ...prev.filter((u) => u.id !== user.id),
          updatedUser,
        ]);
        setNegativeUsers((prev) => prev.filter((u) => u.id !== user.id));
        setNeutralUsers((prev) => prev.filter((u) => u.id !== user.id));
      } else if (rating < 0) {
        setNegativeUsers((prev) => [
          ...prev.filter((u) => u.id !== user.id),
          updatedUser,
        ]);
        setPositiveUsers((prev) => prev.filter((u) => u.id !== user.id));
        setNeutralUsers((prev) => prev.filter((u) => u.id !== user.id));
      } else {
        setNeutralUsers((prev) => [
          ...prev.filter((u) => u.id !== user.id),
          updatedUser,
        ]);
        setPositiveUsers((prev) => prev.filter((u) => u.id !== user.id));
        setNegativeUsers((prev) => prev.filter((u) => u.id !== user.id));
      }
    }
  };

  const handleDeleteUser = (user: User) => {
    setNeutralUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  const handleDialogClose = (confirmed: boolean) => {
    setDialogOpen(false);
    if (confirmed && dialogUser) {
      if (dialogType === "positive") {
        setPositiveUsers((prev) => prev.filter((u) => u.id !== dialogUser.id));
        setNeutralUsers((prev) => [...prev, dialogUser]);
      } else if (dialogType === "negative") {
        setNegativeUsers((prev) => prev.filter((u) => u.id !== dialogUser.id));
        setNeutralUsers((prev) => [...prev, dialogUser]);
      }
    }
    setDialogUser(null);
    setDialogType(null);
  };

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
        {neutralUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={user.avatar} />
            </ListItemAvatar>
            <ListItemText
              style={{ display: "block" }}
              primary={`${user.first_name} ${user.last_name}`}
              secondary={user.username}
            />
            <Button onClick={() => handleRatingChange(user, user.rating + 1)}>
              +
            </Button>
            {user.rating}
            <Button onClick={() => handleRatingChange(user, user.rating - 1)}>
              -
            </Button>
          </ListItem>
        ))}
      </List>
      <List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
        <ListItem>
          <h3>Positive Users</h3>
        </ListItem>
        {positiveUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={`${user.first_name} ${user.last_name}`}
              secondary={user.username}
            />
            <Button onClick={() => handleRatingChange(user, user.rating + 1)}>
              +
            </Button>
            {user.rating}
            <Button onClick={() => handleRatingChange(user, user.rating - 1)}>
              -
            </Button>
            {user.rating === 0 && (
              <Button onClick={() => handleDeleteUser(user)}>Delete</Button>
            )}
          </ListItem>
        ))}
        <ListItem>
          <h3>Negative Users</h3>
        </ListItem>
        {negativeUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={`${user.first_name} ${user.last_name}`}
              secondary={user.username}
            />
            <Button onClick={() => handleRatingChange(user, user.rating + 1)}>
              +
            </Button>
            {user.rating}
            <Button onClick={() => handleRatingChange(user, user.rating - 1)}>
              -
            </Button>
            {user.rating === 0 && (
              <Button onClick={() => handleDeleteUser(user)}>Delete</Button>
            )}
          </ListItem>
        ))}
      </List>

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
          <Button onClick={() => handleDialogClose(true)} autoFocus>
            ДА!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
