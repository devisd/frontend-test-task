import axios from "axios";
import { GetUsersResponse } from "../types/types";

const getUsers = async (page: number) => {
  try {
    const { data } = (await axios.get(
      `https://random-data-api.com/api/users/random_user?size=3?page=${page}`,
      {
        params: {
          page,
        },
      }
    )) as GetUsersResponse;

    console.log("GET USER RESPONSE =>", data);
    // const newData = data?.map((el) => ({ ...el, rating: 0 }));

    localStorage.setItem("usersList", JSON.stringify(data));

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export default getUsers;
