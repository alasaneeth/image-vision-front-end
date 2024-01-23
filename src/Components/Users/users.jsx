import React from "react";

import Title from "../Card/title";
import Table from "../MUI_components/Table/table";
import Service from "../../Service/Users/user.service";
import AddUser from "./addUser";

const Customer = () => {
  // customer Table details
  const customerTableHeadCells = [   
      {
        id: (row) => row["id"],
        numeric: false,
        disablePadding: false,
        label: "User Id",
      },
      {
        id: (row) => row["name"],
        numeric: false,
        disablePadding: false,
        label: "Name",
      },
      {
        id: (row) => row["address"],
        numeric: false,
        disablePadding: false,
        label: "Address",
      },
      {
        id: (row) => row["nic"],
        numeric: false,
        disablePadding: false,
        label: "NIC",
      },
      {
        id: (row) => row["email"],
        numeric: false,
        disablePadding: false,
        label: "Email",
      },
      {
        id: (row) => row["remarks"],
        numeric: false,
        disablePadding: false,
        label: "Remarks",
      },
      
   
  ];

  return (
    <>
      <Title>User</Title>
      <Table
        title="User"
        headCells={customerTableHeadCells}
        AddComponent={AddUser}
        deletable
        service={Service}
        editable
        searchable
      />
    </>
  );
};

export default Customer;
