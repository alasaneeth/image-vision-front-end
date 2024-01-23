import React from "react";
import Service from "../../../Service/Users/usertypes.service";
import Title from "../../Card/title";
import AddUserType from "./addUsertype";
import Table from "../../MUI_components/Table/table";

const Users = () => {
  const userTypeTableHeadCells = [
    {
      id: "code",
      numeric: false,
      disablePadding: false,
      label: "Code",
    },

    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "User Type",
    },
  ];

  return (
    <>
      <Title>Users</Title>
      <Table
        title="User Types"
        AddComponent={AddUserType}
        service={Service}
        dialogBoxWidth="sm"
        headCells={userTypeTableHeadCells}
        editable
      />
    </>
  );
};

export default Users;
