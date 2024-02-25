import { routerType } from "../types/router.types";
import Editor from "../pages/Editor";

const pagesData: routerType[] = [
  {
    path: "",
    element: <Editor />,
    title: "Home",
  },
];

export default pagesData;
