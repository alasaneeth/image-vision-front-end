import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import FormControl from "../MUI_components/FormControl/fomikFormControl";

export default function ReceiptSettings() {
  const RadioOptions = [
    {
      label: "Print Bills",
      value: "bill",
    },
    {
      label: "Print Invoices",
      value: "Invoices",
    },
  ];

  const initValue = {
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
              <FormControl
                control="input"
                label="Receipt Note"
                name="receiptNote"
                multiline
                rows={3}
              />
            </div>
            <div className="col-12">
              <FormControl
                control="input"
                label="Thanks Note"
                name="thankNote"
                multiline
              />
            </div>
            <div className="col-10">
              <FormControl
                control="radio"
                label="Bill / Invoice"
                options={RadioOptions}
                name="receiptType"
              />
            </div>
            <div className="col-5">
              <FormControl
                control="switch"
                label="Lock the Bill after print invoice"
                name="lockBill"
              />
            </div>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
