import React from "react";

import Table from "Components/MUI_components/Table/table";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import AddRoute from "./AddRoute"
import courierService from "Service/Courier/courier.service";
import Title from "Components/Card/title";
import routeService from "Service/Courier/route.service";


const Customer = () => {
  // customer Table detailsm
  const customerTableHeadCells = [   
      {
        id: (row) => row["code"],
        numeric: false,
        disablePadding: false,
        label: COLUMNS_NAME.CODE,
      },
      {
        id: (row) => row["routeName"],
        numeric: false,
        disablePadding: false,
        label: COLUMNS_NAME.ROUT_NAME,
      }, 
      {
        id: (row) => row["courier"]['name'],
        numeric: false,
        disablePadding: false,
        label: COLUMNS_NAME.CUORIER,
      },    
      {
        id: (row) => row["from"],
        numeric: false,
        disablePadding: false,
        label: COLUMNS_NAME.FROM,
      },
    
      {
        id: (row) => row["to"],
        numeric: false,
        disablePadding: false,
        label: COLUMNS_NAME.TO,
      }
   
  ];

  return (
    <>
      <Title>Routes</Title>
      <Table
        title="Routes"
        headCells={customerTableHeadCells}
        AddComponent={AddRoute}
        deletable
        service={routeService}
        editable
        searchable
      />
    </>
  );
};

export default Customer;
