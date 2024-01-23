import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class StockTransfer {

  create = async (stock: any) => {
    await axios({
      method: "post",
      url: `${API_URL}stock-transfer`,
      data: stock,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
  };

  edit = async (stock: any, code: any) => {
    const response = await axios({
      method: "put",
      url: `${API_URL}stock-transfer/${code}`,
      data: stock,
    }).catch((e) => {
      // const { message } = e.response.data;
      // if (message.errorInfo) throw message.errorInfo[2];
      // else throw e.message;
      throw e;
    });
    return response.data.stockTransfer;
  };

  get = async (code: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}stock-transfer/${code}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.stockTransfer;
  };

  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}stock-transfer`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.stockTransfer;
  };

  search = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}stock-transfer-search/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.stockTransfer;
  };

  lock = async (code:any) => { 
    try {
      await axios({
        method: "put",
        url: `${API_URL}stock-transfer-locked`, 
        data: code,
      });
    } catch (e:any) {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    }
  };
}
export default new StockTransfer();
