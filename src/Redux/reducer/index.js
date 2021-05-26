import { combineReducers } from "redux";
import { productsReducer } from "./products";
import { topUpReducer } from "./topUp";
import { ordersReducer } from "./orders";
import { offerReducer } from "./offer";
import { userReducer } from "./user";
const rootReducer = combineReducers({
    productsReducer,
    topUpReducer,
    ordersReducer,
    offerReducer,
    userReducer,
});
export default rootReducer;
