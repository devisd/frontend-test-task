// Типизация пользователя
export type User = {
  avatar: string;
  first_name: string;
  id: number;
  last_name: string;
  username: string;
  rating: number;
};

// Типизация функции запроса
export type GetUsersResponse = {
  data: User[] | null;
};
