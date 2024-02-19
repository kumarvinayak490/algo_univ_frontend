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
