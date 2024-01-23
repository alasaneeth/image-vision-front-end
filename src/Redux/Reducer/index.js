import { combineReducers } from "redux";
import { snackbarReducer } from "./snackbarReducer";
import { PaymentTypeReducer } from "./paymentTypeReducer";
import { userTypeReducer } from "./usertypesReducer";
//import { expensesTypeReducer } from "./expensesTypeReducer";
import {expansesCategoryReducer} from "./expansesCategoryReducer"
import { StockLocationReducer } from "./stockLocationReducer";
import { LastInsertInvoice } from "./lastInsertInvoiceReducer";
import { servicePacks } from "./servicePackReducer";
import { vehicleBrandReducer } from "./vehicleBrandReducer";
import { vehicleTypeReducer } from "./vehicleTypeReducer";
import { pendingUserReducer } from "./pendingUserReducer";
import { activeUserReducer } from "./activeUserReducer";
import { rejectUserReducer } from "./rejectUserReducer";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { defaultLocationReducer } from "./defaultLocationReducer";
import {customerTypeReducer} from "./customerTypeReducer"

const reducers = combineReducers({
  snackbar: snackbarReducer,
  //expensesType: expensesTypeReducer,
  expansesCategory:expansesCategoryReducer,
  paymentType: PaymentTypeReducer,
  userTypes: userTypeReducer,
  location: StockLocationReducer,
  lastInsertInvoice: LastInsertInvoice,
  servicePack: servicePacks,
  vehicleBrand: vehicleBrandReducer,
  vehicleType: vehicleTypeReducer,
  activeUser: activeUserReducer,
  rejectUser: rejectUserReducer,
  pendingUser: pendingUserReducer,
  user: userReducer,
  auth: authReducer,
  defaultLocation: defaultLocationReducer,
  customerType:customerTypeReducer
});
export default reducers;
