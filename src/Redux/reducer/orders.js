const initialState = {
    loading: false,
    orders: [],
    error: null,
    orderUpdated: false,
};

// pure function=> (state, {type,payload})=>
export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ORDERSLOADING":
            return { ...state, loading: true };
        case "ORDERSERROR":
            return { ...state, loading: false, error: action.payload };
        case "CLEARORDERS":
            return {
                ...state,
                loading: false,
                error: null,
                orderUpdated: false,
            };
        case "GETMYORDERSSUCCESS":
            return { ...state, orders: action.payload, loading: false };
        case "GETALLORDERSSUCCESS":
            return { ...state, orders: action.payload, loading: false };
        case "CHANGESTATUSORDERSSUCCESS":
            return { ...state, loading: false, orderUpdated: true };

        default:
            return state;
    }
};
