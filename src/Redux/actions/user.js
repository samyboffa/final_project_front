import axios from "axios";

export const register = (credentials) => async (dispatch) => {
    dispatch({ type: "USER_LOADING" });
    try {
        let result = await axios.post("/register", credentials);
        dispatch({ type: "USER_SUCCESS", payload: result.data });
    } catch (error) {
        dispatch({ type: "USER_ERROR", payload: error.response.data });
    }
};

export const login = (credentials) => async (dispatch) => {
    dispatch({ type: "USER_LOADING" });
    try {
        let result = await axios.post("/login", credentials);
        dispatch({ type: "USER_SUCCESS", payload: result.data });
        localStorage.setItem("token", result.data);
    } catch (error) {
        dispatch({ type: "USER_ERROR", payload: error.response.data });
    }
};
export const logout = () => async (dispatch) => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
};

export const getCurrentUser = () => async (dispatch) => {
    dispatch({ type: "USER_LOADING" });
    try {
        let result = await axios.get("/getUser", {
            headers: { authorization: localStorage.token },
        });
        if (result.data.role === 2) {
            dispatch({ type: "ADMIN" });
        }
        dispatch({ type: "USER_SUCCESS", payload: result.data });
    } catch (error) {
        dispatch({ type: "USER_ERROR", payload: error });
    }
};

export const rateSeller = (newRate) => async (dispatch) => {
    dispatch({ type: "USER_LOADING" });
    try {
        let result = await axios.post("/rateSeller", newRate, {
            headers: { authorization: localStorage.token },
        });

        dispatch({ type: "USER_RATED", payload: result.data });
    } catch (error) {
        dispatch({ type: "USER_ERROR", payload: error });
    }
};

export const clearUser = () => async (dispatch) => {
    dispatch({ type: "CLEAR_USER" });
};
