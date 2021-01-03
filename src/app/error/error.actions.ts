import {errorStore} from "./error.store";

const execute404Handler = () => {
    errorStore.saveError(404);
};

const execute500Handler = (error) => {
    errorStore.saveError(500, error.message);
};

const executeOtherErrorHandler = (error) => {
    errorStore.saveError(500, error.message);
};

export const handleHTTPError = (error) => {
    if (!error.response) {
        return executeOtherErrorHandler(error);
    }
    if (error.response.status === 404) {
        return execute404Handler();
    }
    else if (error.response.status === 500) {
        return execute500Handler(error);
    }
    else {
        return executeOtherErrorHandler(error);
    }
};


