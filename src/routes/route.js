import { lazy } from "react";
const ViewEmail = lazy(() => import("../components/ViewEmail"));
const Emails = lazy(() => import("../components/Emails"));
const Main = lazy(() => import("../pages/Main"));

const routes = {
  main: {
    path: "/",
    element: Main,
  },
  emails: {
    path: "/emails",
    element: Emails,
  },
  view: {
    path: "/view",
    element: ViewEmail,
  },
  invalid: {
    path: "/*",
    element: Emails,
  },
};

export default routes;
