import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
class UserType {
  create = async (user: any) => {
    await axios({
      method: "post",
      url: `${API_URL}user-type`,
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
      url: `${API_URL}user-type/${code}`,
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
      url: `${API_URL}user-type/${code}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.userType;
  };
  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}user-type`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.userType;
  };
  search = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}user-type-search/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.userType;
  };
}
export default new UserType();
