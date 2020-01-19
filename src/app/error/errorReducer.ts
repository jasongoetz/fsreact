
import * as errorTypes from './errorActions';

export type ErrorState = {
    isError: boolean;
    statusCode?: number;
    errorMessage?: string;
};

const initialState: ErrorState = {
    isError: false,
};

const execute404 = (state, action) => {
    return { ...state };
};

const execute500 = (state, action) => {
    return { ...state };
};

const executeOtherError = (state, action) => {
    return { ...state };
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case errorTypes.HTTP_404_ERROR:
            return { ...state, isError: true, statusCode: 404 };
        case errorTypes.HTTP_500_ERROR:
            return { ...state, isError: true, statusCode: 500 };
        case errorTypes.HTTP_OTHER_ERROR:
            return { ...state, isError: true, statusCode: 500 };
        default:
            return state;
    }
};

export default errorReducer;