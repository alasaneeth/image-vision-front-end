import React from "react";
import { Redirect } from "react-router-dom";
import Utils from "../@titum/utils";
import {
  authorisedRouteConfig,
  cashierRouteConfig,
} from "../Components/authorisedRouteConfig";
import authConfig from "../Components/authConfig";

const routeConfigs = [authorisedRouteConfig, cashierRouteConfig, authConfig];

const routes = [
  ...Utils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/dashboard" />,
    exact: true,
  },
];

export default routes;
