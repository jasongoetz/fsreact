import {ErrorContext, mutate} from "./errorContext";

const execute404Handler = (error) => {
    mutate((draft: ErrorContext) => {
       draft.statusCode = 404;
       draft.isError = true;
    });
};

const execute500Handler = (error) => {
    mutate((draft: ErrorContext) => {
        draft.statusCode = 500;
        draft.isError = true;
        draft.errorMessage = error.message;
    });
};

const executeOtherErrorHandler = (error) => {
    mutate((draft: ErrorContext) => {
        draft.statusCode = 500;
        draft.isError = true;
        draft.errorMessage = error.message;
    });
};

export const handleHTTPError = (error) => {
    if (!error.response) {
        return executeOtherErrorHandler(error);
    }
    if (error.response.status === 404) {
        return execute404Handler(error);
    }
    else if (error.response.status === 500) {
        return execute500Handler(error);
    }
    else {
        return executeOtherErrorHandler(error);
    }
};


