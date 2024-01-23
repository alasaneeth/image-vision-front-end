import {
  // AirportShuttle,
  AllInbox,
  Apps,
  BarChart,
  // Build,
  Category,
  ColorLens,
  CropFree,
  Dashboard,
  KeyboardReturn,
  // DoubleArrow,
  SwapHoriz,
  FilterList,
  AddShoppingCart,
  ListAlt,
  Note,
  People,
  PeopleAlt,
  Receipt,
  ShoppingCart,
  Storage,
  Store,
  SupervisedUserCircle,
  SupervisorAccount,
  SwapVerticalCircle,
  ViewCompact,
  ListAltSharp,
  Payment,
  MoneyOff,
  AccountBalanceOutlined


} from "@mui/icons-material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import { green, red } from "@mui/material/colors";
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckIcon from "@mui/icons-material/Check";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import InventoryIcon from '@mui/icons-material/Inventory';
import RuleIcon from '@mui/icons-material/Rule';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import OutputIcon from '@mui/icons-material/Output';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PlaceIcon from '@mui/icons-material/Place';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export const menuConfig = [
  {
    settings: {},
    auth: "admin",
    menus: [
      {
        label: "Dashboard",
        value: "Dashboard",
        path: "/dashboard",
        icon: <Dashboard />,
        children: [],
      },
      {
        label: "Loading",
        value: "loading",
        path: "/parcel-loading",
        icon: <Storage />,
        children: [],
      },
      {
        label: "Varification",
        value: "Varification",
        path: "/parcel-varification",
        icon: <RuleIcon />,
        children: [],
      },
      {
        label: "Customers",
        value: "Customers",
        path: "/customer",
        icon: <People />,
        children: [],
      },
      {
        label: "Parcel",
        value: "parcel",
        path: "/parcel",
        icon: <CardGiftcardIcon />,
        children: [],
      },
      {
        label: "Deleverd Parcel",
        value: "parcel",
        path: "/add-itemmaster-image",
        icon: <OutputIcon />,
        children: [],
      },
      {
        label: "Received Parcel",
        value: "parcel",
        path: "/receiver=d-parcel",
        icon: <ExitToAppIcon />,
        children: [],
      },
      {
        label: "Payment",
        value: "Payment",
        path: "/Payment",
        icon: <Receipt />,
        children: [],
      },
      
      {
        label: "Courier",
        value: "Courier",
        path: "/corier",
        icon: <SupervisedUserCircle />,
        children: [
          {
            label: "Courier",
            value: "Courier",
            path: "/corier",
            icon: <SupervisedUserCircle />,
            children: [],
          },
          {
            label: "Route",
            value: "route",
            path: "/route",
            icon: <SwapVerticalCircle />,
            children: [],
          },
        ],
      },

      {
        label: "Location",
        value: "Location",
        path: "/location",
        icon: <PlaceIcon />,
        children: [],
      },
      {
        label: "User",
        value: "user",
        path: "/user",
        icon: <PersonPinIcon />,
        children: [],
      },
    
     
      {
        label: "Reports",
        value: "Reports",
        path: "/reports",
        icon: <BarChart />,
        children: [],
      },
    
    ],
  },
  {
    settings: {},
    auth: "superAdmin",
    menus: [
      {
        label: "Dashboard",
        value: "Dashboard",
        path: "/dashboard",
        icon: <Dashboard />,
        children: [],
      },
      {
        label: "Invoice",
        value: "Sales",
        path: "/sales",
        icon: <ShoppingCart />,
        children: [],
      },

      {
        label: "Stock",
        value: "",
        path: "/stock",
        icon: <Store />,
        children: [
          {
            label: "GRN",
            value: "",
            path: "/grn",
            icon: <Note />,
            children: [
              {
                label: "GRN",
                value: "grn",
                path: "/grn",
                icon: <Note sx={{ color: red[500] }} />,
                children: [],
              },
              {
                label: "Paid",
                value: "grn-paid",
                path: "/grn-paid",
                icon: <Note sx={{ color: green[500] }} />,
                children: [],
              },
            ],
          },
          {
            label: "Mature Stock",
            value: "Mature Stock",
            path: "/matureStock",
            icon: <CheckBoxOutlineBlankOutlinedIcon />,
            children: [],
          },
          // {
          //   label: "Transfer",
          //   value: "Transfer",
          //   path: "/stock-transfer",
          //   icon: <SwapHoriz />,
          //   children: [],
          // },
          {
            label: "Stock In",
            value: "StockIn",
            path: "/stock-in",
            icon: <LabelImportantIcon />,
            children: [],
          },
          {
            label: "Sales Order",
            value: "salesOrder",
            path: "/sales-order",
            icon: <AddShoppingCart />,
            children: [],
          },
          {
            label: "Sales Quotation",
            value: "quotation",
            path: "/sales-quotation",
            icon: <ListAltSharp />,
            children: [],
          },
          {
            label: "Stock Issue",
            value: "Stock-Issue",
            path: "/stock-issue",
            icon: <TurnRightIcon />,
            children: [],
          },
          {
            label: "Stock Dashboard",
            value: "StockDashboard",
            path: "/stock-dashboard",
            icon: <InventoryIcon />,
            children: [],
          },
        ],
      },

      {
        label: "Item & Services",
        value: "Stocks",
        path: "/",
        icon: <Storage />,
        children: [
          {
            label: "Item & Service",
            value: "ItemMaster",
            path: "/item-master",
            icon: <Storage />,
            children: [],
          },

          {
            label: "Category",
            value: "Category",
            path: "/item-category",
            icon: <Category />,
            children: [],
          },
          {
            label: "Brand",
            value: "Brand",
            path: "/item-brand",
            icon: <Apps />,
            children: [],
          },
          {
            label: "Bin Location",
            value: "Bin",
            path: "/item-bin",
            icon: <AllInbox />,
            children: [],
          },
          {
            label: "Colour",
            value: "Colour",
            path: "/item-colour",
            icon: <ColorLens />,
            children: [],
          },
          {
            label: "Unit",
            value: "Unit",
            path: "/item-unit",
            icon: <FilterList />,
            children: [],
          },
        ],
      },
      {
        label: "Customers",
        value: "Customers",
        path: "customers",
        icon: <People />,
        children: [
          {
            label: "Customer",
            value: "Customer",
            path: "/customer",
            icon: <PeopleAlt />,
            children: [],
          },
          {
            label: "Payment Receipt",
            value: "payment-receipt",
            path: "/payment-receipt",
            icon: <Receipt />,
            children: [],
          },
          {
            label: "Sales Return",
            value: "sales-return",
            path: "/sales-return",
            icon: <KeyboardReturn />,
            children: [],
          },
        ],
      },
    
      {
        label: "Cheque Receipts",
        value: "cheque",
        path: "/cheque",
        icon: <LocalAtmIcon />,
        children: [
          {
            label: "Cheques in hand",
            value: "cheque",
            path: "/cheques",
            icon: <LocalAtmIcon color="success" />,
            children: [],
          },
          {
            label: "Cheques in Deposit",
            value: "cheque",
            path: "/cheques-process",
            icon: <LocalAtmIcon color="info" />,
            children: [],
          },
          {
            label: "Realized Cheques",
            value: "cheque",
            path: "/cheque-realized",
            icon: <CheckIcon color="success" />,
            children: [],
          },
          {
            label: "Returned Cheques",
            value: "cheque",
            path: "/returned-cheque",
            icon: <LocalAtmIcon color="error" />,
            children: [],
          },
         
        ],
      },
      {
        label: "RTN Cheque Pay",
        value: "cheque",
        path: "/chequePayment",
        icon: <ReplayIcon />,
        children: [
          {
            label: "Cheque Receipt",
            value: "cheque",
            path: "/chequePayment",
            icon: <PriceCheckIcon />,
            children: [],
          },
        
        
        ],
      },
    
     
     
      
      {
        label: "Reversal",
        value: "Reversal",
        path: "/reversal",
        icon: <ReplayIcon  sx={{ color: red[500] }} />,
        children: [],
      },
      {
        label: "Reports",
        value: "Reports",
        path: "/reports",
        icon: <BarChart />,
        children: [],
      },
      {
        label: "Barcode",
        value: "",
        path: "/barcode",
        icon: <CropFree />,
        children: [],
      },
      {
        label: "Expenses",
        value: "Expenses",
        path: "/",
        icon: <ViewCompact />,
        children: [
          {
            label: "Expenses",
            value: "Expense",
            path: "/expenses",
            icon: <ViewCompact />,
            children: [],
          },
          
          {
            label: "Expenses Categories",
            value: "expanses-category",
            path: "/expanses-category",
            icon: <ListAlt />,
            children: [],
          },
        ],
      },
      {
        label: "Stock Freeze",
        value: "StockFreez",
        path: "/stock-freez",
        icon: <Dashboard />,
        children: [],
      },
     
    ],
  },
  {
    settings: {},
    auth: "cashier",
    menus: [
      {
        label: "Dashboard",
        value: "Dashboard",
        path: "/dashboard",
        icon: <Dashboard />,
        children: [],
      },
      // {
      //   label: "Invoice",
      //   value: "Sales",
      //   path: "/sales",
      //   icon: <ShoppingCart />,
      //   children: [],
      // },
      {
        label: "Stock",
        value: "",
        path: "/stock",
        icon: <Store />,
        children: [
          {
            label: "GRN",
            value: "grn",
            path: "/grn",
            icon: <Note />,
            children: [],
          },
          // {
          //   label: "GRN",
          //   value: "",
          //   path: "/grn",
          //   icon: <Note />,
          //   children: [
              
          //     {
          //       label: "Paid",
          //       value: "grn-paid",
          //       path: "/grn-paid",
          //       icon: <Note sx={{ color: green[500] }} />,
          //       children: [],
          //     },
          //   ],
          // },
          {
            label: "Mature Stock",
            value: "Mature Stock",
            path: "/matureStock",
            icon: <CheckBoxOutlineBlankOutlinedIcon />,
            children: [],
          },
          // {
          //   label: "Transfer",
          //   value: "Transfer",
          //   path: "/stock-transfer",
          //   icon: <SwapHoriz />,
          //   children: [],
          // },
          {
            label: "Stock In",
            value: "StockIn",
            path: "/stock-in",
            icon: <LabelImportantIcon />,
            children: [],
          },
          {
            label: "Sales Quotation",
            value: "quotation",
            path: "/sales-quotation",
            icon: <ListAltSharp />,
            children: [],
          },
          {
            label: "Stock Issue",
            value: "Stock-Issue",
            path: "/stock-issue",
            icon: <TurnRightIcon />,
            children: [],
          },
          {
              label: "Stock Dashboard",
              value: "StockDashboard",
              path: "/stock-dashboard",
              icon: <InventoryIcon />,
              children: [],
            },
        ],
      },
      {
        label: "Customers",
        value: "Customers",
        path: "customers",
        icon: <People />,
        children: [
          {
            label: "Customer",
            value: "Customer",
            path: "/customer",
            icon: <PeopleAlt />,
            children: [],
          }
        ],
      },
      {
        label: "Barcode",
        value: "",
        path: "/barcode",
        icon: <CropFree />,
        children: [],
      },
      {
        label: "Suppliers",
        value: "Suppliers",
        path: "/",
        icon: <SupervisorAccount />,
        children: [
          {
            label: "Suppliers",
            value: "Supplier",
            path: "/suppliers",
            icon: <SupervisorAccount />,
            children: [],
          },
        ],
      },
    ],
  },

  
];

export const SecondaryMenu = [];
