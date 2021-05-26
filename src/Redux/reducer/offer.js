const initialState = {
    loading: false,
    offer: [],
    myOffer: [],
    error: null,
    offerAdded: false,
    offerUpdated: false,
    offerDeleted: false,
    rejectedCleaned: false,
};

// pure function=> (state, {type,payload})=>
export const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "OFFERLOADING":
            return { ...state, loading: true };
        case "OFFERERROR":
            return { ...state, loading: false, error: action.payload };
        case "CLEAROFFER":
            return {
                ...state,
                loading: false,
                error: null,
                offerUpdated: false,
                offerDeleted: false,
                rejectedCleaned: false,
            };
        case "ADDOFFERSUCCESS":
            return {
                ...state,
                response: action.payload,
                loading: false,
                offerAdded: true,
            };
        case "GETALLOFFERSUCCESS":
            return {
                ...state,
                offer: action.payload,
                loading: false,
                offerAdded: false,
                offerUpdated: false,
                error: null,
            };
        case "GETMYOFFERSUCCESS":
            return {
                ...state,
                myOffer: action.payload,
                loading: false,
                offerAdded: false,
                error: null,
            };
        case "CLEARREJECTEDOFFERSUCCESS":
            return { ...state, rejectedCleaned: true, loading: false };
        case "UPDATEOFFERSUCCESS":
            return { ...state, offerUpdated: true, loading: false };
        case "DELETEOFFERSUCCESS":
            return { ...state, offerDeleted: true, loading: false };

        default:
            return state;
    }
};
