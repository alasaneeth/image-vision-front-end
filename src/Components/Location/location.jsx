import React from "react";

import Title from "../Card/title";
import Table from "../MUI_components/Table/table";
import AddLocation from "./AddLocation";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import stockLocationService from "Service/Stock/stockLocation.service";


const Customer = () => {
  // customer Table details
  const customerTableHeadCells = [   
      {
        id: (row) => row["code"],
        numeric: false,
        disablePadding: false,
        label: "Customer Code",
      },
      {
        id: (row) => row["name"],
        numeric: false,
        disablePadding: false,
        label: "Location Name",
      },
      
      
   
  ];

  return (
    <>
      <Title>Locations</Title>
      <Table
        title="Locations"
        headCells={customerTableHeadCells}
        AddComponent={AddLocation}
        deletable
        service={stockLocationService}
        editable
        searchable
      />
    </>
  );
};

export default Customer;
