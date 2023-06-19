import getUsers from "./getUser";

export const fetchData = async (page: number) => {
  const data = await getUsers(page);
  console.log(data);

  return data;
};
