import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
class Image {
  edit = async (image: any) => {
    await axios({
      method: "put",
      url: `${API_URL}image-update`,
      data: image,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
  };
}
export default new Image();
