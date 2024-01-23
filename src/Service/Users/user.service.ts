import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
class User {
  create = async (user: any) => {
    await axios({
      method: "post",
      url: `${API_URL}user`,
      data: user,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
  };
  edit = async (user: any, code: any) => {
    await axios({
      method: "put",
      url: `${API_URL}user/${code}`,
      data: user,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
  };
  get = async (code: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}user/${code}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.user;
  };
  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}user`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.user;
  };
  search = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}user-search/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.user;
  };
}
export default new User();
