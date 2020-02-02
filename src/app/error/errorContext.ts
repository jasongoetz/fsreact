import createState from 'react-copy-write';

export type ErrorContext = {
    isError: boolean;
    statusCode?: number;
    errorMessage?: string;
};

const initialState: ErrorContext = {
    isError: false,
};

const {
    Provider,
    Consumer,
    mutate,
} = createState(initialState);

export { Provider as ErrorProvider, Consumer as ErrorConsumer, mutate }
