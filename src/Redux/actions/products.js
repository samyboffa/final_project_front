import axios from "axios";

export const getProducts = () => async (dispatch) => {
    dispatch({ type: "PRODUCTSLOADING" });
    try {
        let result = await axios.get("/getProduct");
        dispatch({ type: "GETPRODUCTSSUCCESS", payload: result.data });
    } catch (error) {
        dispatch({ type: "PRODUCTSERROR", payload: error.response.status });
        console.log(error);
    }
};
export const verifyAdmin = () => async (dispatch) => {
    dispatch({ type: "PRODUCTSLOADING" });
    try {
        let result = await axios.get("/verifyAdmin");
    } catch (error) {
        dispatch({ type: "PRODUCTSERROR", payload: error.response.status });
        console.log(error);
    }
};

export const addProducts = (newProduct) => async (dispatch) => {
    dispatch({ type: "PRODUCTSLOADING" });
    try {
        let result = await axios.post("/addProduct", newProduct, {
            headers: { authorization: localStorage.token },
        });
        if (result.status === 200) {
            dispatch({ type: "ADDPRODUCTSSUCCESS" });
        }
    } catch (error) {
        dispatch({ type: "PRODUCTSERROR", payload: error.response.status });
        console.log(error);
    }
};
export const updateProducts = (newProduct) => async (dispatch) => {
    dispatch({ type: "PRODUCTSLOADING" });
    try {
        let result = await axios.post(
            "/updateProduct",

            newProduct,
            {
                headers: { authorization: localStorage.token },
            }
        );
        if (result.status === 200) {
            dispatch({ type: "UPDATEPRODUCTSSUCCESS" });
        }
    } catch (error) {
        dispatch({ type: "PRODUCTSERROR", payload: error.response.status });
        console.log(error);
    }
};

export const deleteProducts = (id) => async (dispatch) => {
    dispatch({ type: "PRODUCTSLOADING" });
    try {
        let result = await axios.post(
            "/deleteProduct",

            id,
            {
                headers: { authorization: localStorage.token },
            }
        );
        if (result.status === 200) {
            dispatch({ type: "DELETEPRODUCTSSUCCESS" });
        }
    } catch (error) {
        dispatch({ type: "PRODUCTSERROR", payload: error.response.status });
        console.log(error);
    }
};

export const clearProduct = () => async (dispatch) => {
    dispatch({ type: "CLEARPRODUCTS" });
};
