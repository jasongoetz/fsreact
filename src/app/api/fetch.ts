import ApiError from './apiError';

type Method = 'PUT' | 'POST' | 'GET' | 'DELETE';

interface FetchBody {
    path: string;
    token?: string;
    body?: string;
    headers?: object;
}

interface Fetch extends FetchBody {
    method: Method;
}

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const appFetch = async ({ method, token, path, body, headers = {} }: Fetch) => {
    let authHeaders = {};
    if (token) {
        authHeaders = {
            Authorization: `Bearer ${token}`,
        };
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders,
            ...headers,
        },
        body,
    });

    checkStatus(response);
    return response;
};

export const put = (data: FetchBody) => appFetch({ method: 'PUT', ...data });
export const post = (data: FetchBody) => appFetch({ method: 'POST', ...data });
export const get = (data: FetchBody) => appFetch({ method: 'GET', ...data });

export const checkStatus = (resp: Response) => {
    if (resp.status >= 200 && resp.status < 300) {
        return resp;
    } else {
        throw new ApiError(resp, resp.statusText);
    }
};