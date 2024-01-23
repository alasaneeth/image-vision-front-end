import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class CustomerType {  

  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer-type`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.customer;
  };
}


export default new CustomerType();
