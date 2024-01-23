import Table from "../../MUI_components/Table/table";
import Title from "../../Card/title";
import Service from "../../../Service/Stock/stockTransfer.service";
import StockTransfer from "./addStockTransfer";
import viewStockTransfer from './viewStockTransfer'
import { useSelector } from "react-redux";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function Transfer() {
  const stockLocations = useSelector((state) => state.location);

  const TableHeadCells = [
    {
      id: (row) => row["code"],
      numeric: false,
      disablePadding: false,
      label: COLUMNS_NAME.CODE,
    },
    {
      id: (row) =>
        stockLocations.filter(
          (location) => location.code == row["stockLocationCodeFrom"]
        )[0].name
      ,
      numeric: false,
      disablePadding: false,
      label: "Location - From",
    },
    {
      id: (row) =>
        stockLocations.filter(
          (location) => location.code == row["stockLocationCodeTo"]
        )[0].name
      ,
      numeric: false,
      disablePadding: false,
      label: "Location - To",
    },

    {
      id: (row) => row["remarks"],
      numeric: false,
      disablePadding: false,
      label: COLUMNS_NAME.REMARKS,
    },
    {
      id: (row) => row["transferDateTime"],
      numeric: false,
      disablePadding: false,
      label: COLUMNS_NAME.DATE,
    },
    {
      id: (row) => row["isLocked"] == 1 ? <LockIcon/> : <LockOpenIcon/> ,
      numeric: false,
      disablePadding: false,
      label: COLUMNS_NAME.STATUS,
      align:'center'
    },

  ];
  return (
    <>
      <Title>Stock Transfer</Title>
      <Table
        title="Stock Transfer"
        service={Service}
        AddComponent={StockTransfer}
        searchable
        lockable
        headCells={TableHeadCells}
        ViewComponent={viewStockTransfer}
      />
    </>
  );
}
