import { useState, useEffect } from "react";

import { User } from "../types/types";

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
import getUsers from "../services/getUser";
import {
  getLocalStorageData,
  parseLocalStorageData,
  setLocalStorageData,
} from "../utils/localStorageData";
import { prevUser, resetUserRating, updateUser } from "../utils/updateUser";
import { filterUpdatedUser, filterUser } from "../utils/filterUser";

const App = () => {
  // Стейт для массивов пользователей

  const [positiveUsers, setPositiveUsers] = useState<User[]>([]);
  const [negativeUsers, setNegativeUsers] = useState<User[]>([]);
  const [neutralUsers, setNeutralUsers] = useState<User[]>([]);

  // Стейт для модального окна (открытие, имя пользователя и состояние)

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogUser, setDialogUser] = useState<User | null>(null);
  const [dialogType, setDialogType] = useState<"positive" | "negative" | null>(
    null
  );

  // Стейт для номера страницы в запросе пользователей

  const [page, setPage] = useState<number>(1);

  // Асинхронная функция для первого запроса массивов пользователей

  const getStartUsers = async () => {
    // Получение данных из локального хранилища
    const storedData = getLocalStorageData("usersList");
    const storedPositiveData = getLocalStorageData("positiveList");
    const storedNegativeData = getLocalStorageData("negativeList");

    console.log("==============================================");
    console.log("== ALL USERS =>", storedData);
    console.log("==============================================");
    console.log("== POSITIVE USERS =>", storedPositiveData);
    console.log("==============================================");
    console.log("== NEGATIVE USERS =>", storedNegativeData);
    console.log("==============================================");

    // Если нет данных идет новый запрос

    if (!storedData) {
      const response = (await getUsers(0)) as User[];
      const data = updateUser(response);

      setNeutralUsers([...neutralUsers, ...data]);
    }

    // Парсинг общего массива пользователей из локального хранилища и добавление к каждому пользователю рейтинга

    if (storedData) {
      const parsedData: User[] = parseLocalStorageData(storedData);
      const data = updateUser(parsedData);

      setNeutralUsers([...neutralUsers, ...data]);
    }

    // Парсинг массива пользователей с положительной репутацией из локального хранилища

    if (storedPositiveData) {
      const parsedData: User[] = parseLocalStorageData(storedPositiveData);

      setPositiveUsers([...neutralUsers, ...parsedData]);
    }

    // Парсинг массива пользователей с отрицательной репутацией из локального хранилища

    if (storedNegativeData) {
      const parsedData: User[] = parseLocalStorageData(storedNegativeData);

      setNegativeUsers([...neutralUsers, ...parsedData]);
    }
  };

  // Запуск функции getStartUsers при загрузке приложения

  useEffect(() => {
    getStartUsers();
  }, []);

  // Функция обработки кнопки "Добавить еще пользователей"

  const handleAddUsers = async () => {
    // Изменение значения переменной "страница"

    setPage((prev) => prev + 1);
    console.log("PAGE CHANGE=>", page);

    // Запрос на получение массива пользователей и добавление в него свойства рейтинга

    const response = (await getUsers(page)) as User[];
    const newUsers = updateUser(response);
    console.log("GET NEW USERS =>", newUsers);

    setNeutralUsers([...neutralUsers, ...newUsers]);

    // Изменение данных в локальном хранилище для общего массива пользователей
    setLocalStorageData("usersList", neutralUsers);
  };

  // Функция обработки изменения рейтинга пользователей

  const handleRatingChange = (user: User, rating: number) => {
    const updatedUser = { ...user, rating };
    console.log("TARGET USER =>", updatedUser);

    // Условия для открытия/закрытия модального окна

    if (rating > 5) {
      setDialogUser(user);
      setDialogType("positive");
      setDialogOpen(true);
    } else if (rating < -5) {
      setDialogUser(user);
      setDialogType("negative");
      setDialogOpen(true);
    } else {
      // Условия для перемещения пользователей в разные колонки (общая, положительная или отрицательная)

      if (rating > 0) {
        setPositiveUsers(filterUpdatedUser(user, updatedUser));
        setNegativeUsers(filterUser(user));
        setNeutralUsers(filterUser(user));

        setLocalStorageData("usersList", neutralUsers);
        setLocalStorageData("positiveList", positiveUsers);
      } else if (rating < 0) {
        setNegativeUsers(filterUpdatedUser(user, updatedUser));
        setPositiveUsers(filterUser(user));
        setNeutralUsers(filterUser(user));

        setLocalStorageData("usersList", neutralUsers);
        setLocalStorageData("negativeList", negativeUsers);
      } else {
        setNeutralUsers(filterUpdatedUser(user, updatedUser));
        setPositiveUsers(filterUser(user));
        setNegativeUsers(filterUser(user));
      }
    }
  };

  // Функция обработки ручного удаления пользователя из массивов

  const handleDeleteUser = (user: User) => {
    setNeutralUsers(filterUser(user));
  };

  // Функция обработки закрытия модального окна + сброс репутации пользователя

  const handleDialogClose = (confirmed: boolean) => {
    setDialogOpen(false);
    if (confirmed && dialogUser) {
      if (dialogType === "positive") {
        setPositiveUsers(filterUser(dialogUser));

        resetUserRating(dialogUser);
        setNeutralUsers(prevUser(dialogUser));
      } else if (dialogType === "negative") {
        setNegativeUsers(filterUser(dialogUser));

        resetUserRating(dialogUser);
        setNeutralUsers(prevUser(dialogUser));
      }
    }
    setDialogUser(null);
    setDialogType(null);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: 30,
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
        >
          <ListItem>
            <h3>ВСЕ ПОЛЬЗОВАТЕЛИ</h3>
          </ListItem>
          {neutralUsers.map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                style={{ display: "block" }}
                primary={`${user.first_name} ${user.last_name}`}
                secondary={`/ ${user.username} /`}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRatingChange(user, user.rating - 1)}
              >
                -
              </Button>
              <span style={{ display: "block", margin: "0 10px" }}>
                {user.rating}
              </span>
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleRatingChange(user, user.rating + 1)}
              >
                +
              </Button>
            </ListItem>
          ))}
          <Button
            variant="outlined"
            onClick={handleAddUsers}
            style={{ marginTop: 30 }}
          >
            Добавить еще пользователей
          </Button>
        </List>
        <List
          sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
        >
          <ListItem>
            <h3>ПОЛОЖИТЕЛЬНЫй РЕЙТИНГ</h3>
          </ListItem>
          {positiveUsers.map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                secondary={`/ ${user.username} /`}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRatingChange(user, user.rating - 1)}
              >
                -
              </Button>
              <span style={{ display: "block", margin: "0 10px" }}>
                {user.rating}
              </span>
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleRatingChange(user, user.rating + 1)}
              >
                +
              </Button>
              {user.rating === 0 && (
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteUser(user)}
                >
                  Удалить
                </Button>
              )}
            </ListItem>
          ))}
          <ListItem>
            <h3>ОТРИЦАТЕЛЬНЫЙ РЕЙТИНГ</h3>
          </ListItem>
          {negativeUsers.map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                secondary={`/ ${user.username} /`}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRatingChange(user, user.rating - 1)}
              >
                -
              </Button>
              <span style={{ display: "block", margin: "0 10px" }}>
                {user.rating}
              </span>
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleRatingChange(user, user.rating + 1)}
              >
                +
              </Button>
              {user.rating === 0 && (
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteUser(user)}
                >
                  Удалить
                </Button>
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
            <Button
              variant="contained"
              onClick={() => handleDialogClose(true)}
              autoFocus
            >
              ДА !
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default App;