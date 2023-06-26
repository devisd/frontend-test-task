/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { User } from "../types/types";
import {
  checkLocalStorageData,
  emptyLocalStorageData,
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/localStorageData";
import { addNewUsers, prevUser, resetUserRating } from "../utils/updateUser";
import { filterUpdatedUser, filterUser } from "../utils/filterUser";
import { Modal } from "./modal/Modal";
import { AddUserButton } from "./userList/buttons/AddUserButton";
import { UserListItem } from "./userList/UserListItem";
import { ListTitle } from "./userList/ListTitle";

import List from "@mui/material/List";

import styles from "../assets/styles/App.module.css";

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

    // Если нет данных идет новый запрос
    emptyLocalStorageData(storedData, neutralUsers, setNeutralUsers);

    // Парсинг общего массива пользователей из локального хранилища
    checkLocalStorageData(storedData, neutralUsers, setNeutralUsers);

    // Парсинг массива пользователей с положительной репутацией из локального хранилища
    checkLocalStorageData(storedPositiveData, neutralUsers, setPositiveUsers);

    // Парсинг массива пользователей с отрицательной репутацией из локального хранилища
    checkLocalStorageData(storedNegativeData, neutralUsers, setNegativeUsers);
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
    addNewUsers(page, neutralUsers, setNeutralUsers);
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
    <div className={styles.container}>
      <div>
        <List className={styles.list}>
          <ListTitle
            title={"ВСЕ ПОЛЬЗОВАТЕЛИ"}
            className={styles.list__title}
          />
          <UserListItem users={neutralUsers} onClick={handleRatingChange} />
        </List>
        <AddUserButton
          onClick={handleAddUsers}
          textButton={"Добавить еще пользователей"}
        />
      </div>
      <List className={styles.list}>
        <ListTitle
          title={"ПОЛОЖИТЕЛЬНЫЙ РЕЙТИНГ"}
          className={styles.list__title}
        />
        <UserListItem users={positiveUsers} onClick={handleRatingChange} />
        <ListTitle
          title={"ОТРИЦАТЕЛЬНЫЙ РЕЙТИНГ"}
          className={styles.list__title}
        />
        <UserListItem users={negativeUsers} onClick={handleRatingChange} />
      </List>

      <Modal
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        dialogType={dialogType}
        dialogUser={dialogUser}
      />
    </div>
  );
};

export default App;
