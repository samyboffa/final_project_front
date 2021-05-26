import axios from "axios";

export const getMyOrders = (userId) => async (dispatch) => {
    dispatch({ type: "ORDERSLOADING" });
    try {
        let result = await axios.get("/getMyOrders", {
            headers: { authorization: localStorage.token },
        });
        dispatch({
            type: "GETMYORDERSSUCCESS",
            payload: result.data.reverse(),
        });
    } catch (error) {
        dispatch({ type: "ORDERSERROR", payload: error.response.status });
        console.log(error);
    }
};

export const getAllOrders = () => async (dispatch) => {
    dispatch({ type: "ORDERSLOADING" });
    try {
        let result = await axios.get("/getAllOrders", {
            headers: { authorization: localStorage.token },
        });
        dispatch({
            type: "GETALLORDERSSUCCESS",
            payload: result.data.reverse(),
        });
    } catch (error) {
        dispatch({ type: "ORDERSERROR", payload: error.response.status });
        console.log(error);
    }
};

export const changeStatusOrders =
    (orderNumber, operation, msg) => async (dispatch) => {
        dispatch({ type: "ORDERSLOADING" });
        try {
            await axios.post(
                "/changeStatusOrders",
                { orderNumber, operation, msg },
                {
                    headers: { authorization: localStorage.token },
                }
            );
            dispatch({
                type: "CHANGESTATUSORDERSSUCCESS",
            });
        } catch (error) {
            dispatch({ type: "ORDERSERROR", payload: error.response.status });
            console.log(error);
        }
    };
export const clearOrders = () => async (dispatch) => {
    dispatch({ type: "CLEARORDERS" });
};
