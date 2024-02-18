import { routerType } from "../types/router.types";
import pagesData from "./pageData";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const pageRoutes = pagesData.map(({ path, title, element }: routerType) => {
  return <Route key={title} path={`/${path}`} element={element} />;
});

const router = createBrowserRouter(createRoutesFromElements(pageRoutes));

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
