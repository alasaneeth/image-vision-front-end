import TitumUtils from "@titum/utils/Utils";
import axios from "axios";
import api from "../../utils/api";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService extends TitumUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "You are logged out");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const data = this.getAccessToken();

    if (!data) {
      this.emit('onNoAccessToken');
      return;
    }
    if (this.isAuthTokenValid(data)) {
      this.setSession(data);

      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  signInWithUserAndPassword = (form) => {
    const username = form.username;
    const password = form.password;
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}login`, { username, password })
        .then((response) => {
          const data = {
            token: response.data.accessToken,
            location: form.location
          }
          this.setSession(data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  signInWithUser = () => {
    return new Promise((resolve, reject) => {
      api()
        .get(`sign-in-with-user`)
        .then((response) => {
          if (response.data.user) {
            resolve(response.data);
          } else {
            this.logout();
            reject(new Error("Failed to login ."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login"));
        });
    });
  };

  logout = () => {
    return new Promise(() => {
      api()
        .post(`logout`)
        .then(() => {
          this.setSession(null);
        })
        .catch(() => { });
    });
  };

  isAuthTokenValid = access_token => {
    return access_token;
  };

  setSession = data => {
    if (data) {
      localStorage.setItem('autocare_access_token', data.token);
      localStorage.setItem('bizx_location_code', data.location?.code);
      localStorage.setItem('bizx_location_name', data.location?.name);


      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      axios.defaults.headers.common.LocationCode = `${data.location?.code}`;

    } else {
      localStorage.removeItem('autocare_access_token');
      delete axios.defaults.headers.common.Authorization;

      localStorage.removeItem('bizx_location_code');
      localStorage.removeItem('bizx_location_name');

      delete axios.defaults.headers.common.LocationCode;
    }
  };

  getAccessToken = () => {
    const data = {
      token: window.localStorage.getItem('autocare_access_token'),
      location: {
        code: window.localStorage.getItem('bizx_location_code'),
        name: window.localStorage.getItem('bizx_location_name'),
      }
    };
    return data;
  };
}

const instance = new AuthService();

export default instance;
