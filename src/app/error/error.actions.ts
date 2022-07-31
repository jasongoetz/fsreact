import {errorStore} from "./error.store";

const execute401Handler = async () => {
    errorStore.saveError(401);
};

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
    if (!error.payload) {
        return executeOtherErrorHandler(error);
    }
    if (error.payload.status === 404) {
        return execute404Handler();
    } else if (error.payload.status === 401) {
        return execute401Handler();
    }
    else if (error.payload.status === 500) {
        return execute500Handler(error);
    }
    else {
        return executeOtherErrorHandler(error);
    }
};


