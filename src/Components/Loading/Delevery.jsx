import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import Loading from "Components/MUI_components/loading";
import { TextField } from "@mui/material";
import Title from "Components/Card/title";
import { openSnackbar } from "Redux/Actions/snackbarActions";
import ParcelService from "Service/Parcel/ParcelService.service";
import FormControl from "Components/MUI_components/FormControl/fomikFormControl";
import routeService from "Service/Courier/route.service";
import ParcelLadingTable from "./parcelDeliverTable";

export default function ParcelLoading() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [initLoad, setInitLoad] = useState(true);
  const [results, setResults] = useState([]);
  const [routeCode, setRouteCode] = useState();
  const [task,setTask] = useState("fetch")

  const onClear = () => {
    setRouteCode("");
    setInitLoad(true);
  };

  const fetchParcelDetails = async (values) => {
    setInitLoad(true);
    setLoading(true);
    try {
      const routeCode = values.route.code;
      const res = await ParcelService.parcelDetails(routeCode);
      setResults(res);
    } catch (e) {
      setInitLoad(true);
      dispatch(openSnackbar(true, "error", e));
    }
    setLoading(false);
  };

  const handleDelevery = async(code)=> {
    try{
      await ParcelService.delivery(code);
      dispatch(
        openSnackbar(
          true,
          "success",
          `Parcel Deliverd successfully`
        )
      );
    }catch(e) {
      dispatch(openSnackbar(true, "error", e));
    }
  }


  return (
    <>
      <Title>Parcel Loading</Title>
      <Paper>
        <Formik
          initialValues={{ route: routeCode }}
          onSubmit={(values) => fetchParcelDetails(values)}
        >
          {(props) => (
            <Form>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="16px"
                position="relative"
              >
                <div className="col-9">
                  <FormControl
                    control="asynchronousAutoComplete"
                    name="route"
                    label="Route"
                    Service={routeService}
                    getOptionLabel={(option) => option.routeName}
                  />
                </div>

                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      Search
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={initLoad}
                      variant="contained"
                      color="secondary"
                      onClick={onClear}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box>
          {loading && <Loading height={100} text="Loading..." />}
        </Box>
       
            </Form>
          )}
        </Formik>
        <Box style={{ margin: 50 }}>
          {results.length > 0 && (
            <>
              <ParcelLadingTable 
              results={results}
              />
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                height="15vh"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "10px 60px 16px 0px" }}
                               >
                  Load
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </>
  );
}
