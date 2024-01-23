import React, { useEffect, useState } from "react";
import { CircularProgress, Button } from "@mui/material";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from 'react-dropzone';
import Loading from "Components/MUI_components/loading";
import ItemmasterService from "Service/Customer/customer.service"
import { openSnackbar } from "Redux/Actions/snackbarActions";

const AddItemMaster = (props) => {
  const dispatch = useDispatch();
  const { code, setOpen, setSubmitted } = props;
  const [images, setImages] = useState({
    image: null,
  });
  const {initValue,setInitValue} = useState({})

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
       formData.append('image', uploadedImage);

      if (code) await ItemmasterService.edit(values, code);
      else await ItemmasterService.create(values);

      setSubmitted((prev) => !prev);
      setOpen(false);
      dispatch(
        openSnackbar(
          true,
          "success",
          `Item ${code ? "updated" : "created"} successfully`
        )
      );
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };

  return (
    <>
      
        <Formik
          initialValues={initValue}
          //validationSchema={Validation}
          onSubmit={async (values) => {
              await handleSubmit(values);
          }}
        >
          {(props) => (
            <Form autoComplete="off">
              
              <div className="row">
                  <div>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      const [file] = acceptedFiles; 
                      setUploadedImage(file);
                      //setFieldValue("image", file);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <Button >Select Image</Button>
                      </div>
                    )}
                  </Dropzone>
                  {uploadedImage && (
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt={`uploaded-image`}
                      style={{ width: '100px', height: '100px', alignContent: 'left' }}
                    />
                  )}
                  </div>
                 
                </div>
              <div className="row space-between mb">
               

                <div style={{ display: "flex" }}>
            
                  
                  <Button
                    disabled={props.isSubmitting ? true : false}
                    startIcon={
                      props.isSubmitting && (
                        <CircularProgress color="inherit" size={20} />
                      )
                    }
                    variant="contained"
                    type="submit"
                    color="secondary"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
    </>
  );

 
  
};

export default AddItemMaster;