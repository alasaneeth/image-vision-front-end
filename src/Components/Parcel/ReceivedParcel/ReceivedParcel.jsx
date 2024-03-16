import React from "react";

//import ViewCustomer from "./viewCustomer";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import ReceivedParcelService from "Service/Parcel/ReceivedParcel.service";
import Title from "Components/Card/title";
import Table from "Components/MUI_components/Table/table";
import ViewRecievedParcel from '../ViewParcel'

const Customer = () => {
  // customer Table details
  const customerTableHeadCells = [   
    {
        id: (row) => row["code"],
        numeric: false,
        disablePadding: false,
        label: "Code",
      },
      {
        id: (row) =>  row["weight"],
        numeric: false,
        disablePadding: false,
        label: "Weight"
      },     
      {
        id: (row) => row["customer"]["firstName"] + " " + row["customer"]["lastName"],
        numeric: false,
        disablePadding: false,
        label: "Customer",
      },
      {
        id: (row) => row["toLocation"]["name"],
        numeric: false,
        disablePadding: false,
        label: "send Location",
      },
      {
        id: (row) => row["route"]["routeName"],
        numeric: false,
        disablePadding: false,
        label: "Route",
      },
      {
        id: (row) => row["route"]["courier"]["name"],
        numeric: false,
        disablePadding: false,
        label: "Courier",
      },
      
   
  ];

  return (
    <>
      <Title>Received parcel</Title>
      <Table
        title="Received parcel"
        headCells={customerTableHeadCells}
        service={ReceivedParcelService}
        searchable
        ViewComponent={ViewRecievedParcel}


      />
    </>
  );
};

export default Customer;
