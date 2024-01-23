import Title from "../Card/title";
import Tab from "../MUI_components/Tab/horizontalTab";
import CustomerReport from "./ReportsComponents/Customers/customerReport";


const Reports = () => {
  const tabView = [
   
    {
      title: "Customer",
      component: <CustomerReport />,
    } 

  ];
  return (
    <>
      <Title>Reports</Title>
      <Tab tabViews={tabView} />
    </>
  );
};

export default Reports;
