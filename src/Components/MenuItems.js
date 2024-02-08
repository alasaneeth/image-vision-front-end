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
    auth: "cashier",
    menus: [
      {
        label: "Dashboard",
        value: "Dashboard",
        path: "/dashboard",
        icon: <Dashboard />,
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
      
    ],
  },
    
  
];

export const SecondaryMenu = [];
