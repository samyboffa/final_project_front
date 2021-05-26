const initialState = {
    loading: false,
    user: "",
    error: null,
    admin: false,
    userRated: false,
};

// pure function=> (state, {type,payload})=>
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_LOADING":
            return { ...state, loading: true };
        case "USER_SUCCESS":
            return { ...state, user: action.payload, loading: false };
        case "USER_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "LOGOUT":
            return {
                ...state,
                loading: false,
                user: "",
                error: null,
                admin: false,
                userRated: false,
            };
        case "CLEAR_USER":
            return {
                ...state,
                loading: false,
                user: null,
            };
        case "USER_RATED":
            return { ...state, userRated: true, loading: false };
        case "ADMIN":
            return { ...state, loading: false, admin: true };

        default:
            return state;
    }
};
