import Login from "./Login/login";
import { authRoles } from "../auth";

const authConfig = {
  settings: {},
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/login",
      component: Login,
      exact: true,
    },
  ],
};

export default authConfig;
