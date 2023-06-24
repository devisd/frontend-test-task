import { User } from "../types/types";

export function getLocalStorageData(storageName: string) {
  return localStorage.getItem(`${storageName}`);
}

export function setLocalStorageData(storageName: string, listName: User[]) {
  localStorage.setItem(`${storageName}`, JSON.stringify(listName));
}

export function parseLocalStorageData(entityName: string) {
  return JSON.parse(entityName);
}
