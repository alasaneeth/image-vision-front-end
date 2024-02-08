import { lazy } from "react";
import path from "path";
// import { useSelector } from "react-redux";
// import { authRoles } from "../auth";
// import AutoLogout from "./AutoLogout";

const Transfer = lazy(() => import("./Store/Transfer/stockTransfer"));
const Dashboard = lazy(() => import("./Dashboard/dashboard"));
const Customer = lazy(() => import("./Customer/customer"));
const Reports = lazy(() => import("./Reports/reports"));
const Settings = lazy(() => import("./Settings/settings"));
const Users = lazy(() => import("./Users/users"));
const UserType = lazy(() => import("./Users/User-Type/userType"));
const Location = lazy(()=>import("./Location/location"));
const Courier = lazy(()=>import("./Courier/Courier"));
const Route = lazy(()=> import("./Courier/Route/Route"));
const AddImage = lazy(()=> import("./ItemImage/ItemImageUpload"));
const ViewImage = lazy(()=>import("./ItemImage/Image"));
const AddItemmasterImage = lazy(()=>import('./Stock/AddItemasterInmag'));
const Parcel = lazy(()=>import("./Parcel/Parcel"));
const ReceivedParcel = lazy(()=>import("./Parcel/ReceivedParcel/ReceivedParcel"));
const parcelVarification = lazy(()=>import("./Varificatiin/Varification"))


export const cashierRouteConfig = {
  settings: {},
  auth: ["admin", "cashier"],
  routes: [
    { path: "/dashboard", component: Dashboard },
    { path: "/customer", component: Customer },
    { path: "/stock-transfer", component: Transfer },
    {path:"/corier" , component:Courier},
    {path:'/route', component:Route},
    {path:'/add-image', component:AddImage},
    {path:'/view-image', component:ViewImage},
    {path:'/add-itemmaster-image', component:AddItemmasterImage},
    {path:'/parcel' ,component:Parcel},
    {path:'/receiver=d-parcel', component:ReceivedParcel},
    {path:'/parcel-varification', component:parcelVarification}
  
  ],
};

export const authorisedRouteConfig = {
  settings: {},
  auth: ["admin"],
  routes: [
    { path: "/reports", component: Reports },
    {path:"/location", component:Location},
    { path: "/user", component: Users },
    { path: "/user-type", component: UserType },
    { path: "/settings", component: Settings },


  ],
};
