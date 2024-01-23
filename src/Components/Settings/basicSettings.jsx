import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import FormControl from "../MUI_components/FormControl/fomikFormControl";

import { useState } from "react";
import ImageService from "../../Service/Users/image.service";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../Redux/Actions/snackbarActions";
import ImageUpload from "../MUI_components/imageUpload";

export default function BasicSettings() {
  const dispatch = useDispatch();
  const [logo, setLogo] = useState({ images: [] });

  const handleLogoSubmit = async (e) => {
    try {
      await ImageService.edit(logo);
      dispatch(openSnackbar(true, "success", "Logo updated successfully"));
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };

  const initValue = {
    shopName: "",
    receiptNote: "",
    thankNote: "",
    receiptType: "",
    lockBill: true,
  };

  return (
    <div className="row">
      <div className="col-8">
        <Formik initialValues={initValue}>
          <Form>
            <div className="col-12">
              <FormControl control="input" label="Shop Name" name="shopName" />
            </div>
            <div className="flex">
              <div className="col-6">
                <FormControl
                  control="input"
                  label="Tel Number"
                  name="receiptNote"
                />
              </div>
              <div className="col-6">
                <FormControl
                  control="input"
                  label="Mobile Number"
                  name="receiptNote"
                />
              </div>
            </div>
            <div className="flex">
              <div className="col-6">
                <FormControl control="input" label="Email" name="receiptNote" />
              </div>
              <div className="col-6">
                <FormControl
                  control="input"
                  label="Website"
                  name="receiptNote"
                />
              </div>
            </div>
            <div className="col-12">
              <FormControl
                control="input"
                label="Address"
                name="thankNote"
                multiline
                rows={3}
              />
            </div>

            <Button variant="contained" color="primary">
              Save
            </Button>
          </Form>
        </Formik>
      </div>
      <div className="col-4">
        <div className="col-12">
          <label style={{ marginBottom: 5 }}>Company Logo</label>
          <ImageUpload
            accept="image/*"
            images={logo}
            setImages={setLogo}
            multiple={false}
          />
        </div>
        <div className="flex-end">
          <Button
            variant="contained"
            onClick={handleLogoSubmit}
            color="secondary"
            disabled={!logo.images.length}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
