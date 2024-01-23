import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class Route {
  create = async (route: any) => {
    const res = await axios({
      method: "post",
      url: `${API_URL}courier-route`,
      data: route,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
    return res.data;
  };

  edit = async (route: any, code: any) => {
    await axios({
      method: "put",
      url: `${API_URL}courier-route/${code}`,
      data: route,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
  };

  get = async (code: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}courier-route/${code}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.routes;
  };

  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}courier-route`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.routes;
  };

  search = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}courier-route-search/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.routes;
  };

  delete = async (code: any) => {
    await axios.delete(`${API_URL}courier-route/${code}`)
      .catch((e) => {
        const { message } = e.response.data;
        if (message.errorInfo) throw message.errorInfo[2];
        else throw e.message;
      });
  };
}
export default new Route();
