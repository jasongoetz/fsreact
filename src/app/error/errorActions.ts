
export const HTTP_404_ERROR = 'HTTP_404_ERROR';
export const HTTP_500_ERROR = 'HTTP_500_ERROR';
export const HTTP_OTHER_ERROR = 'HTTP_OTHER_ERROR';

const execute404Handler = (error) => {
    return {
        type: HTTP_404_ERROR,
        props: {error}
    }
};

const execute500Handler = (error) => {
    return {
        type: HTTP_500_ERROR,
        props: {error}
    }
};

const executeOtherErrorHandler = (error) => {
    return {
        type: HTTP_OTHER_ERROR,
        props: {error}
    }
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


