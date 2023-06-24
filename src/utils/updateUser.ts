import { User } from "../types/types";

export function updateUser(entityName: User[]) {
  return entityName.map((user) => ({ ...user, rating: 0 }));
}

export function resetUserRating(user: User) {
  return (user.rating = 0);
}

export function prevUser(user: User) {
  return (prev: User[]) => [...prev, user];
}
