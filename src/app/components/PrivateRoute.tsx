import {Redirect, Route} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {State} from "../reducers/root";
import ErrorPanel from "./error/ErrorPanel";
import {AuthConsumer, AuthContext} from "../auth/authContext";
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
