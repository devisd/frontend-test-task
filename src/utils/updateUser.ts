import getUsers from "../services/getUser";
import { User } from "../types/types";
import { setLocalStorageData } from "./localStorageData";

export function updateUser(entityName: User[]) {
  return entityName.map((user) => ({ ...user, rating: 0 }));
}

export function resetUserRating(user: User) {
  return (user.rating = 0);
}

export function prevUser(user: User) {
  return (prev: User[]) => [...prev, user];
}

export async function addNewUsers(
  page: number,
  userArray: User[],
  setUsersArray: (arg0: User[]) => void
) {
  const response = (await getUsers(page)) as User[];
  const newUsers = updateUser(response);
  console.log("GET NEW USERS =>", newUsers);

  setUsersArray([...userArray, ...newUsers]);
  setLocalStorageData("usersList", userArray);
}
