import React, { useState, useEffect } from "react";
import axios from "axios";

const Images = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    axios
      .get("http://localhost/Image-vision-api/public/api/v1/images")
      .then((response) => {
        if (response.status === 200) {
          setImages(response.data.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow">
            <div className="card-header">
              <h4 className="card-title fw-bold"> Images List </h4>
            </div>
            <div className="card-body">
              <div className="row">
                {images.length > 0 ? (
                  images.map((image) => (
                    <div className="col-xl-6 col-lg-8 col-sm-12 col-12 mt-3" key={image.id}>
                      <img
                       src={"http://localhost/Image-vision-api/public/uploads/" + image.imageName}
                        className="img-fluid img-bordered"
                        alt={image.imageName}
                        width="200px"
                      />
                    </div>
                  ))
                ) : (
                  <h6 className="text-danger text-center">No Image Found </h6>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
