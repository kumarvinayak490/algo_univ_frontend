import { post, get } from "../index";

export const runCode = <T>({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  return post<T>("/submissions/submit-code/", { code, language });
};

export const getResult = <T>(task_id: string) => {
  return get<T>(`/submissions/get-result/${task_id}`);
};
