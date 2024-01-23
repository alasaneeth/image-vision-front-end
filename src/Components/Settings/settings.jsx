import Title from "../Card/title";
import Tab from "../MUI_components/tab";
import BasicSettings from "./basicSettings";
import DataTableSettings from "./dataTableSettings";
import ReceiptSettings from "./receiptSettings";

const Settings = () => {
  const tabView = [
    {
      title: "Basic Settings",
      component: <BasicSettings />,
    },
    {
      title: "Receipt",
      component: <ReceiptSettings />,
    },
    {
      title: "Data Table Settings",
      component: <DataTableSettings />,
    },
  ];
  return (
    <>
      <Title>Settings</Title>
      <Tab tabViews={tabView} />
    </>
  );
};

export default Settings;
