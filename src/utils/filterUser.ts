import { User } from "../types/types";

export function filterUser(user: User) {
  return (prev: User[]) => prev.filter((u) => u.id !== user.id);
}

export function filterUpdatedUser(user: User, updatedUser: User) {
  return (prev: User[]) => [
    ...prev.filter((u) => u.id !== user.id),
    updatedUser,
  ];
}
