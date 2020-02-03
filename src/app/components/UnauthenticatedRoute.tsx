import {Redirect, Route} from "react-router";
import React, {Component, FC} from "react";
import ErrorPanel from "./error/ErrorPanel";
import {isLoggedIn} from "../auth/authSelectors";
import {AuthConsumer} from "../auth/authContext";
import {ErrorConsumer, ErrorContext} from "../error/errorContext";

const UnauthenticatedRoute = ({component: Component, redirectTo, ...rest}) => {
    return (
        <AuthConsumer select={[isLoggedIn]}>
            {authenticated =>
                <ErrorConsumer select={[(context: ErrorContext) => context]}>
                    {error =>
                        <Route
                            {...rest}
                            render={(props) => !!authenticated
                                ? <Redirect to={{
                                    pathname: redirectTo,
                                    state: {from: props.location}
                                }}/>
                                : (error.isError ? <ErrorPanel {...error}/> : <Component {...props} />)}
                        />
                    }
                </ErrorConsumer>
            }
        </AuthConsumer>
    )
};

export default UnauthenticatedRoute;
