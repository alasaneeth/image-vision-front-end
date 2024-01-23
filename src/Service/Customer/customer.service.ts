import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class Customer {
  create = async (customer: any) => {
    const res = await axios({
      method: "post",
      url: `${API_URL}customer`,
      data: customer,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
    return res.data;
  };

  edit = async (customer: any, code: any) => {
    await axios({
      method: "put",
      url: `${API_URL}customer/${code}`,
      data: customer,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
  };

  get = async (code: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer/${code}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.customer;
  };

  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.customer;
  };

  search = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer-search/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.customer;
  };

  delete = async (code: any) => {
    await axios.delete(`${API_URL}customer/${code}`)
      .catch((e) => {
        const { message } = e.response.data;
        if (message.errorInfo) throw message.errorInfo[2];
        else throw e.message;
      });
  };

  

}
export default new Customer();
