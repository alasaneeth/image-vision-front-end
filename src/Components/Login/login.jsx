import React from "react";
import { login } from "../../Redux/Actions/userActions";
import { checkLoggedIn } from "../../Redux/Actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Selects from "Components/MUI_components/AutoComplete/selects";
import { fetchStockLocation } from "Redux/Actions/stockLocation";
import Loading from "Components/MUI_components/loading";
import { defaultLocation } from "Redux/Actions/defaultLocationActions";

const PREFIX = "Login";
const classes = {
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
};
const Root = styled("div")(({ theme }) => ({
  [`&.${classes.paper}`]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  [`&.${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  [`&.${classes.form}`]: {
    width: "100%", // Fix IE 11 issue.
  },
  [`&.${classes.submit}`]: {
    margin: theme.spacing(1, 0, 2),
    height: 60,
  },
}));

export default function Login() {
  const formRef = React.useRef(null);
  const dispatch = useDispatch();
  const { loggedInSuccess } = useSelector((state) => state.auth);
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
    location: {
      code: "",
      name: ""
    }
  });
  const stockLocations = useSelector((state) => state.location);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkLoggedIn(true));
    dispatch(login(loginData));
    dispatch(defaultLocation(loginData.location));
  };
  React.useEffect(() => {
    const fetchInitData = async () => {
      setIsLoaded(false);
      await dispatch(fetchStockLocation());
      setIsLoaded(true);
    };
    fetchInitData();
  }, [dispatch]);
  return (
    <>
      {!isLoaded ? (
        <Loading text="Please wait.." noIcon={false} height={"100vh"} />
      ) : (
        <Root>
          <Grid
            container
            justifyContent="center"
            style={{ height: "80vh" }}
            alignItems="center"
          >
            <Grid item md={4} lg={4} sm={5} xs={12}>
              <Paper style={{ margin: 10, padding: "30px 0" }}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.papetr}>
                    <div className="img-container">
                    Image Vision
                    </div>

                    <form
                      className={classes.form}
                      ref={formRef}
                      onSubmit={handleSubmit}
                    >
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={loginData.username}
                        onChange={(e) =>
                          setLoginData({ ...loginData, username: e.target.value })
                        }
                        label="Username"
                        autoFocus
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        required
                        fullWidth
                        label="Password"
                        type="password"

                      />


                      <div>

                        <Selects
                          sx={{
                            width: {
                              xs: 250,
                              sm: 270,
                              md: 350,
                              lg: 390,
                              xl: 450
                            }
                          }}

                          label="Stock Location*"
                          options={stockLocations}
                          //style={{ width: 380,}}
                          value={loginData.location.code}
                          name={loginData.location.name}
                          required
                          fullWidth
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              location: {
                                ...loginData.location,
                                code: e.target.value,
                                name: stockLocations.filter(
                                  (loc) => loc.code === e.target.value
                                )[0]["name"]
                              }
                            })
                          }
                        />

                      </div>
                      <br />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loginData.location == '' ||
                          loginData.location == null ||
                          loggedInSuccess}
                        className={classes.submit}
                      >
                        {loggedInSuccess ? (
                          <CircularProgress size={25} />
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </div>
                </Container>
                <Typography
                  component="p"
                  variant="caption"
                  style={{ textAlign: "center", padding: 15 }}
                >
                  Image Vision
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Root>
      )
      }
    </>
  )
}
