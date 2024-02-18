import { routerType } from "../types/router.types";
import IndexPage from "../pages";
import Editor from "../pages/Editor";
import { PrivateRoute } from "../component/common/PrivateRoute";

const pagesData: routerType[] = [
  {
    path: "",
    element: <IndexPage />,
    title: "Home",
  },
  {
    path: "editor",
    element: (
      <PrivateRoute>
        <Editor />
      </PrivateRoute>
    ),
    title: "About",
  },
];

export default pagesData;
