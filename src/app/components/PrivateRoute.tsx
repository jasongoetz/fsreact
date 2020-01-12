import {Redirect, Route} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {State} from "../reducers/root";
import {isLoggedIn} from "../auth/authSelector";
import InternalServerError from "./error/InternalServerError";
import ErrorPanel from "./error/ErrorPanel";

const PrivateRoute = ({component: Comp, authenticated, error, ...rest}) => (
    <Route
        {...rest}
        render={props => !!authenticated
            ? (error.isError ? <ErrorPanel {...error}/> : <Comp {...props} />)
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        }
    />
);

const mapStateToProps = (state: State) => {
    return {
        error: state.error,
        authenticated: isLoggedIn(state),
    };
};

export default connect(
    mapStateToProps
)(PrivateRoute);
