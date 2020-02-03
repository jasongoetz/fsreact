import {Redirect, Route} from "react-router-dom";
import React from "react";
import ErrorPanel from "./error/ErrorPanel";
import {AuthConsumer} from "../auth/authContext";
import {isLoggedIn} from "../auth/authSelectors";
import {ErrorConsumer, ErrorContext} from "../error/errorContext";

const PrivateRoute = ({component: Comp, ...rest}) => {
    return (
        <AuthConsumer select={[isLoggedIn]}>
            {authenticated =>
                <ErrorConsumer select={[(context: ErrorContext) => context]}>
                    {error =>
                        <Route
                            {...rest}
                            render={props => !!authenticated
                                ? (error.isError ? <ErrorPanel {...error}/> : <Comp {...props} />)
                                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                            }
                        />
                    }
                </ErrorConsumer>
            }
        </AuthConsumer>
    )
};

export default PrivateRoute
