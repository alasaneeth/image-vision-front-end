import React, { useState, useRef } from "react";
import axios from "axios";
import Images from "./Image";

const ImageUpload = () => {
  const [image, setImage] = useState([]);
  const [customer, setCustomer] = useState("");
  const [weight, setWeight] = useState("");
  const [responseMsg, setResponseMsg] = useState({
    status: "",
    message: "",
    error: "",
  });

  const fileInputRef = useRef();

  const handleChange = (e) => {
    const imagesArray = [];
    let isValid = "";

    for (let i = 0; i < e.target.files.length; i++) {
      isValid = fileValidate(e.target.files[i]);
      imagesArray.push(e.target.files[i]);
    }

    setImage(imagesArray);
  };

  const handleCustomerChange = (e) => {
    setCustomer(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
  
    for (let i = 0; i < image.length; i++) {
      data.append("images[]", image[i]);
    }
  
    // Explicitly set 'customer' and 'weight' in FormData
    data.append("customer", customer);
    data.append("weight", weight);
  
    try {
      const response = await axios.post("http://localhost/Image-vision-api/public/api/v1/images", data);
  
      // ... (rest of your code)
    } catch (error) {
      console.error(error);
    }
  };
  


  const fileValidate = (file) => {
    if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg") {
      setResponseMsg({
        error: "",
      });
      return true;
    } else {
      setResponseMsg({
        error: "File type allowed only jpg, png, jpeg",
      });
      return false;
    }
  };

  const childRef = useRef();

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={submitHandler} encType="multipart/form-data" id="imageForm">
            <div className="card shadow">
              {responseMsg.status === "successs" ? (
                <div className="alert alert-success">{responseMsg.message}</div>
              ) : responseMsg.status === "failed" ? (
                <div className="alert alert-danger">{responseMsg.message}</div>
              ) : (
                ""
              )}
              <div className="card-header">
                <h4 className="card-title fw-bold">React JS and Laravel 9 RESTful API File Upload</h4>
              </div>

              <div className="card-body">
                <div className="form-group py-2">
                  <label htmlFor="customer">Customer</label>
                  <input
                    type="text"
                    name="customer"
                    value={customer}
                    onChange={handleCustomerChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group py-2">
                  <label htmlFor="weight">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={weight}
                    onChange={handleWeightChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group py-2">
                  <label htmlFor="images">Images</label>
                  <input
                    type="file"
                    name="image"
                    multiple
                    onChange={handleChange}
                    className="form-control"
                    ref={fileInputRef}
                  />
                  <span className="text-danger">{responseMsg.error}</span>
                </div>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Images ref={childRef} />
    </div>
  );
};

export default ImageUpload;
