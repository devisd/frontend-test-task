export type User = {
  avatar: string;
  first_name: string;
  id: number;
  last_name: string;
  username: string;
  reputation: number;
  rating: number;
};

export type GetUsersResponse = {
  data: User[] | null;
};
