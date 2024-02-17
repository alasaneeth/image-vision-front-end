import { Form, Formik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "Components/MUI_components/loading";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import Title from "Components/Card/title";
import { openSnackbar } from "Redux/Actions/snackbarActions";
import ParcelService from "Service/Parcel/ParcelService.service";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import Dropzone from "react-dropzone";

export default function Reversal() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [initLoad, setInitLoad] = React.useState(true);
  const [parcelCode, setParcelCode] = useState("");
  const [data, setData] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);

  const getParcelCode = (e) => {
    const { value } = e.target;
    setParcelCode(value);
  };

  const onClear = (e) => {
    setParcelCode("");
    setInitLoad(true);
  }


  const fetchParcelData = async () => {
    setInitLoad(true);
    setLoading(true);
    try {
      let res = "";
      res = await ParcelService.get(parcelCode);
      if (res) {
        setData(res);
        setInitLoad(false);
      }
    }
    catch (e) {
      setInitLoad(true);
      dispatch(openSnackbar(true, "error", e));
    }
    setLoading(false);
  };

  const compareImages = async () => {
    if (!uploadedImage || !data || !data.parcelImages) {
      alert('Please upload an image and fetch parcel images first.');
      return;
    }
  
    const uploadedImageElement = document.createElement('img');
    uploadedImageElement.src = URL.createObjectURL(uploadedImage);
  
    const model = await mobilenet.load();
    const uploadedImagePrediction = await model.classify(uploadedImageElement);
  
    for (const parcelImage of data.parcelImages) {
      const parcelImageElement = document.createElement('img');
      parcelImageElement.src = `http://localhost/Image-vision-api/public${parcelImage.path}`;
  
      try {
        await parcelImageElement.decode();
        const parcelImagePrediction = await model.classify(parcelImageElement);
  
        if (uploadedImagePrediction[0].className === parcelImagePrediction[0].className) {
         alert('Images are similar!');
          return;
        }
      } catch (error) {
        console.error('Error decoding or classifying parcel image:', error);
      }
    }
  
    alert('Images are not similar.');
  };



  return (
    <>
      <Title>Image Comparison</Title>
      <Paper>
        <Formik>
          {(props) => {
            return (
              <Form>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding="16px"
                  position="relative"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter Transaction Code Here"
                    value={parcelCode}
                    onChange={getParcelCode}
                  />

                  <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={fetchParcelData}>
                        Search
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        disabled={initLoad}
                        variant="contained"
                        color="secondary"
                        onClick={onClear}>
                        Clear
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        disabled={initLoad}
                        variant="contained"
                        color="secondary"
                        onClick={compareImages}
                      >
                        Compare Images
                      </Button>
                    </Grid>

                  </Grid>
                </Box>

                <Box>
                  {loading &&
                    <Loading height={100} text="Loading.." />
                  }
                </Box>
                {!initLoad && (
                  <>
                    <Grid container>
                      <Grid item sx={6}>
                        {data.parcelImages.map(image => (
                          <div key={image.id}>
                            <img style={{ height: 500, width: 400 }} src={`http://localhost/Image-vision-api/public${image.path}`} alt={`Image for`} />
                          </div>
                        ))}
                      </Grid>
                      <Grid item sx={6}>
                        <div>
                          <Dropzone
                            onDrop={(acceptedFiles) => {
                              const [file] = acceptedFiles;
                              setUploadedImage(file);
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                <Button>Select Image</Button>
                              </div>
                            )}
                          </Dropzone>
                          {uploadedImage && (
                            <img
                              src={URL.createObjectURL(uploadedImage)}
                              alt={`uploaded-image`}
                              style={{ width:400, height:500 }}
                            />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </>
  );
}
