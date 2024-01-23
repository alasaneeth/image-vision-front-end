import React from "react";

import Title from "../Card/title";
import Table from "../MUI_components/Table/table";
//import AddCustomer from "./addCustomer";
import Service from "../../Service/Customer/customer.service";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import AddParcel from "./AddParcel"
import ParcelServiceService from "Service/Parcel/ParcelService.service";
import ViewParcel from "./ViewParcel"
import ForwardIcon from '@mui/icons-material/Forward';
import { MULTI_PURPOSE_STATUS } from "Components/Constants/MultiPurposeStatus";

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
      <Title>Parcel</Title>
      <Table
        title="Parcel"
        headCells={customerTableHeadCells}
        AddComponent={AddParcel}
        service={ParcelServiceService}
        ViewComponent={ViewParcel}
        searchable
        actions={[
          {
            name: "Load InTo Truck",
            icon: <ForwardIcon color="success" />,
            callBack: async (event, selected) => {
              let parcels = {
                selected
              };
              await ParcelServiceService.edit(parcels, MULTI_PURPOSE_STATUS.DELIVERY)
            }
          }

        ]}
      />
    </>
  );
};

export default Customer;
