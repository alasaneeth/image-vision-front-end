import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import FormControl from "../MUI_components/FormControl/fomikFormControl";

export default function DataTableSettings() {
  // const RadioOptions = [
  //   {
  //     label: "Print Bills",
  //     value: "bill",
  //   },
  //   {
  //     label: "Print Invoices",
  //     value: "Invoices",
  //   },
  // ];

  const initValue = {
    rowsPerPage: "",
    densePadding: "",
  };

  const rowsPerPage = [
    { code: 5, name: 5 },
    { code: 10, name: 10 },
    { code: 15, name: 15 },
  ];

  return (
    <Formik initialValues={initValue}>
      <Form>
        <div className="row">
          <div className="col-6">
            <div className="col-12">
              <FormControl
                control="select"
                options={rowsPerPage}
                label="Rows per page"
                name="rowsPerPage"
              />
            </div>
            <div className="col-6">
              <FormControl
                control="switch"
                label="Dense padding"
                name="densePadding"
              />
            </div>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
