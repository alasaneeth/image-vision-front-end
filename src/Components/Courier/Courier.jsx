import React from "react";

import Title from "../Card/title";
import Table from "../MUI_components/Table/table";
import Service from "../../Service/Courier/courier.service";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import AddCourier from "./AddCourier"


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
        id: (row) => row["name"],
        numeric: false,
        disablePadding: false,
        label: COLUMNS_NAME.NAME,
      }, 
      {
        id: (row) => row["nic"],
        numeric: false,
        disablePadding: false,
        label: COLUMNS_NAME.NIC,
      },    
      {
        id: (row) => row["contactNo"],
        numeric: false,
        disablePadding: false,
        label: COLUMNS_NAME.TEL,
      },
    
      {
        id: (row) => row["address"],
        numeric: false,
        disablePadding: false,
        label: "Address",
      }
   
  ];

  return (
    <>
      <Title>Couriers</Title>
      <Table
        title="Couriers"
        headCells={customerTableHeadCells}
        AddComponent={AddCourier}
        deletable
        service={Service}
        editable
        searchable
      />
    </>
  );
};

export default Customer;
