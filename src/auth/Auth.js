import authService from "../Service/auth-service";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setUserData, logoutUser } from "../Redux/Actions/authAction";
import { openSnackbar } from "../Redux/Actions/snackbarActions";
import TitumSplashScreen from "../@titum/core/TitumSplashScreen";

class Auth extends Component {
    state = {
        waitAuthCheck: true,
    };

    componentDidMount() {
        return Promise.all([this.authCustomerCheck()]).then(() => {
            this.setState({ waitAuthCheck: false });
        });
    }

    authCustomerCheck = () =>
        new Promise((resolve) => {
            authService.on("onAutoLogin", () => {
                this.props.showMessage({ message: 'Logged In' });

                authService
                    .signInWithUser()
                    .then((res) => {
                        const user = {
                            role: [res.role],
                            from: "AUTOCARE",
                            data : {
                                displayName: res.user.displayName,
                            }
                        };

                        this.props.setUserData(user);
                        resolve();

                        return this.props.showMessage(
                            true,
                            "success",
                            `Logged in as ${res.role}`
                        );
                    })
                    .catch(() => {
                        this.props.showMessage(
                            true,
                            "error",
                            `Something went wrong!`
                        );
                        resolve();
                    });
            });

            authService.on("onAutoLogout", (message) => {
                if (message) {
                    this.props.showMessage(true, "error", message);
                }

                this.props.logout();

                resolve();
            });

            authService.on("onNoAccessToken", () => {
                resolve();
            });

            authService.init();

            return Promise.resolve();
        });

    render() {
        return this.state.waitAuthCheck ? (
            <TitumSplashScreen />
        ) : (
            <>{this.props.children}</>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth,
});

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logoutUser()),
        setUserData: (user) => dispatch(setUserData(user)),
        showMessage: (type, error, message) =>
            dispatch(openSnackbar(type, error, message)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);


