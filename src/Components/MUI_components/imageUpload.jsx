import React from "react";
import Dropzone from "react-dropzone";

export default function ImageUpload(props) {
  const { images, setImages, ...rest } = props;
  const handleSetImages = (files) => {
    if (!files.length) {
      return;
    }

    files.forEach((file) => {
      convertToBase64(file);
    });
  };
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      props.multiple
        ? setImages((prev) => ({
            images: [
              ...prev.images,
              {
                url: `data:${file.type};base64,${btoa(reader.result)}`,
                type: file.type,
              },
            ],
          }))
        : setImages({
            images: [
              {
                url: `data:${file.type};base64,${btoa(reader.result)}`,
                type: file.type,
              },
            ],
          });
    };
  };
  return (
    <>
      <Dropzone {...rest} onDrop={handleSetImages}>
        {({ getRootProps, getInputProps }) => {
          return (
            <section className="fileDropZoneSection fullWidth">
              <div {...getRootProps()} className="fileDropZone">
                <input {...getInputProps()} />
                <p style={{ textAlign: "center" }}>
                  Drag and drop the files here, or click to select files
                </p>
              </div>
            </section>
          );
        }}
      </Dropzone>
      <div className="row-img">
        {images.images.map((img, index) => {
          return (
            <div className="img-container" key={index}>
              <div
                className="floating-close-btn"
                onClick={() => {
                  let temp = images.images;
                  temp.splice(index, 1);
                  setImages({ images: temp });
                }}
              >
                <span>Delete</span>
              </div>
              <img className="img-upload" src={img.url} alt="images" />
            </div>
          );
        })}
      </div>
    </>
  );
}
