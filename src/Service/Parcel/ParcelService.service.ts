import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class Parcel {
  create = async (parcel: any) => {
    const res = await axios({
      method: "post",
      url: `${API_URL}parcel`,
      data: parcel,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
    return res.data;
  };

  edit = async (cheques: any, code: any) => {
    const response =  await axios({
      method: "put",
      url: `${API_URL}parcel/${code}`,
      data: cheques 
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  get = async (code: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}parcel/${code}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.parcel;
  };

  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}parcel`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.parcels;
  };


  search = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}parcel-search/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.parcels;
  };

  parcelDetails = async (code: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}fetch-parcel-details/${code}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.parcels;
  };



  parcelDelivery = async (customers: any[]) => {
    const updateRequests = customers.map(async (customer) => {
      try {
        await axios({
          method: "put",
          url: `${API_URL}parcel-delevery`,
          data: customer,
        });
      } catch (e:any) {
        const { message } = e.response.data;
        if (message.errorInfo) {
          throw message.errorInfo[2];
        } else {
          throw e.message;
        }
      }
    });

  

}
}
export default new Parcel();
