import React from "react";
import Tab from "../../../MUI_components/Tab/verticalTab";
import ListOfCustomer from "./listOfCustomer";



export default function CustomerReport() {
  const tabView = [
    {
      title: "Customers",
      component: <ListOfCustomer />,
    }
   
  ];
  return (
    <>
      <Tab tabViews={tabView} />
    </>
  );
}
