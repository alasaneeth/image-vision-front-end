import React from "react";

import Title from "../Card/title";
import Table from "../MUI_components/Table/table";
import AddCustomer from "./addCustomer";
import Service from "../../Service/Customer/customer.service";
import ViewCustomer from "./viewCustomer";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";

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
        id: (row) => row["firstName"] + " " + row["lastName"],
        numeric: false,
        disablePadding: false,
        label: COLUMNS_NAME.CUSTOMER_NAME,
      },     
      {
        id: (row) => row["nic"],
        numeric: false,
        disablePadding: false,
        label: "NIC",
      },
      {
        id: (row) => row["phone"],
        numeric: false,
        disablePadding: false,
        label: "Contact Number",
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
      <Title>Customers</Title>
      <Table
        title="Customer"
        headCells={customerTableHeadCells}
        AddComponent={AddCustomer}
        deletable
        service={Service}
        editable
        searchable
      />
    </>
  );
};

export default Customer;
