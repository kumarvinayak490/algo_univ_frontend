import { post } from "../index";

export const login = <T>({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return post<T>("/auth/token/", { username, password });
};

export const register = <T>({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}) => {
  return post<T>("/auth/create-user/", { username, password, email });
};
