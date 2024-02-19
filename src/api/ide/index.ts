import { post } from "../index";

export const runCode = <T>({
  code,
  language,
  user,
}: {
  code: string;
  language: string;
  user: string;
}) => {
  return post<T>("/submissions/submit-code/", { code, language, user });
};
