import TitumSuspense from "../@titum/core/TitumSuspense";
import AppContext from "../AppContext";
import React, { useContext } from "react";
import { renderRoutes } from "react-router-config";
import Footer from "./shared-components/Footer";
import Nav from "../Components/Navigation/nav";
import Snackbars from "../Components/MUI_components/snackbar";
import { useSelector } from "react-redux";
import Login from "../Components/Login/login";

import { ThemeProvider } from "@emotion/react";
import { Container } from "@mui/material";
import theme from "./theme";

export const LoginContext = React.createContext();
function Layout(props) {
  const user = useSelector((state) => state.auth);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    <div>
      <>
        <Snackbars />
        {!user.userData.role || user.userData.role.length === 0 ? (
          <Login />
        ) : (
          <ThemeProvider theme={theme}>
            <div>
              <Nav>
                <main>
                  <Container maxWidth="lg">
                    <TitumSuspense>{renderRoutes(routes)}</TitumSuspense>
                    {props.children}
                  </Container>
                  <Footer />
                </main>
              </Nav>
            </div>
          </ThemeProvider>
        )}
      </>
    </div>
  );
}
export default React.memo(Layout);
