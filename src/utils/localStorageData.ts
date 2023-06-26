import getUsers from "../services/getUser";
import { User } from "../types/types";
import { updateUser } from "./updateUser";

export function getLocalStorageData(storageName: string) {
  return localStorage.getItem(`${storageName}`);
}

export function setLocalStorageData(storageName: string, listName: User[]) {
  localStorage.setItem(`${storageName}`, JSON.stringify(listName));
}

export function parseLocalStorageData(entityName: string) {
  return JSON.parse(entityName);
}

export function checkLocalStorageData(
  storageName: string | null,
  userArray: User[],
  setUsersArray: (arg0: User[]) => void
) {
  if (storageName) {
    const parsedData: User[] = parseLocalStorageData(storageName);

    return setUsersArray([...userArray, ...parsedData]);
  }
}

export async function emptyLocalStorageData(
  storageName: string | null,
  userArray: User[],
  setUsersArray: (arg0: User[]) => void
) {
  if (!storageName) {
    const response = (await getUsers(0)) as User[];
    const data = updateUser(response);

    setUsersArray([...userArray, ...data]);
  }
}
