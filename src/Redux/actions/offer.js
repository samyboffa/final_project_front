import axios from "axios";

export const addOffer = (newOffer) => async (dispatch) => {
    dispatch({ type: "OFFERLOADING" });
    try {
        let result = await axios.post("/newOffer", newOffer, {
            headers: { authorization: localStorage.token },
        });
        if (result.data === "ListingAdded") {
            dispatch({
                type: "ADDOFFERSUCCESS",
                payload: result.data,
            });
        }
    } catch (error) {
        dispatch({ type: "OFFERERROR", payload: error.response.status });
        console.log(error);
    }
};

export const getAllOffers = () => async (dispatch) => {
    dispatch({ type: "OFFERLOADING" });
    try {
        let result = await axios.get("/getAllOffers", {
            headers: { authorization: localStorage.token },
        });
        if (result.status === 200) {
            dispatch({
                type: "GETALLOFFERSUCCESS",
                payload: result.data.reverse(),
            });
        }
    } catch (error) {
        dispatch({ type: "OFFERERROR", payload: error.response.status });
        console.log(error);
    }
};

export const getMyOffers = () => async (dispatch) => {
    dispatch({ type: "OFFERLOADING" });
    try {
        let result = await axios.get("/getMyOffers", {
            headers: { authorization: localStorage.token },
        });
        if (result.status === 200) {
            dispatch({
                type: "GETMYOFFERSUCCESS",
                payload: result.data.reverse(),
            });
        }
    } catch (error) {
        dispatch({ type: "OFFERERROR", payload: error.response.status });
        console.log(error);
    }
};
export const updateOffers = (newOrder) => async (dispatch) => {
    dispatch({ type: "OFFERLOADING" });
    try {
        let result = await axios.post("/editMyOffers", newOrder, {
            headers: { authorization: localStorage.token },
        });
        if (result.status === 200) {
            dispatch({
                type: "UPDATEOFFERSUCCESS",
            });
        }
    } catch (error) {
        dispatch({ type: "OFFERERROR", payload: error.response.status });
        console.log(error);
    }
};
export const deleteOffer = (itemNumber) => async (dispatch) => {
    dispatch({ type: "OFFERLOADING" });
    try {
        let result = await axios.post("/deleteMyOffers", itemNumber, {
            headers: { authorization: localStorage.token },
        });
        if (result.status === 200) {
            dispatch({
                type: "DELETEOFFERSUCCESS",
            });
        }
    } catch (error) {
        dispatch({ type: "OFFERERROR", payload: error.message });
        console.log(error);
    }
};

export const adminManageOffer =
    (itemNumber, operation, msg) => async (dispatch) => {
        dispatch({ type: "OFFERLOADING" });
        try {
            let result = await axios.post(
                "/adminManageOffers",
                { itemNumber, operation, msg },
                {
                    headers: { authorization: localStorage.token },
                }
            );

            dispatch({
                type: "UPDATEOFFERSUCCESS",
            });
        } catch (error) {
            dispatch({ type: "OFFERERROR", payload: error.response.status });
            console.log(error);
        }
    };
export const admindeleteAllRejectedOffers = () => async (dispatch) => {
    dispatch({ type: "OFFERLOADING" });
    try {
        let result = await axios.post(
            "/clearRejectedOffers",
            {},
            {
                headers: { authorization: localStorage.token },
            }
        );

        dispatch({
            type: "CLEARREJECTEDOFFERSUCCESS",
        });
    } catch (error) {
        dispatch({ type: "OFFERERROR", payload: error.response.status });
    }
};

export const clearOffers = () => async (dispatch) => {
    dispatch({ type: "CLEAROFFER" });
};
