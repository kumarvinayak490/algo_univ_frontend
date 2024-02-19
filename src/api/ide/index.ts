import { post, get } from "../index";

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

export const getResult = (task_id: string) => {
  return get(`/submissions/get-result/${task_id}`);
};
