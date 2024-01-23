import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
class stockLocation {

  create = async (customer: any) => {
    const res = await axios({
      method: "post",
      url: `${API_URL}stock-location`,
      data: customer,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
    return res.data;
  };
  edit = async (name: any, code: any) => {
    await axios({
      method: "put",
      url: `${API_URL}stock-location/${code}`,
      data: name,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
  };
  get = async (code: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}stock-location/${code}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.stockLocation;
  };

  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}get-stock-location`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.stockLocation;
  };
  search = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}location-search/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.location;
  };

  delete = async (code: any) => {
    await axios.delete(`${API_URL}stock-location/${code}`)
      .catch((e) => {
        const { message } = e.response.data;
        if (message.errorInfo) throw message.errorInfo[2];
        else throw e.message;
      });
  };
}
export default new stockLocation();
