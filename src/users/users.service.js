// import axios from "axios";

class UsersService {
  get = async () => {
    const response = await fetch("https://randomuser.me/api/");
    return response.json();
  };
  post = async (data) => {
    const response = await fetch("https://randomuser.me/api/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  };
}

export const usersService = new UsersService();
