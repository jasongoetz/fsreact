import {Redirect, Route} from "react-router";
import React, {Component} from "react";
import {connect} from "react-redux";
import {State} from "../reducers/root";
import InternalServerError from "./error/InternalServerError";
import ErrorPanel from "./error/ErrorPanel";

const UnauthenticatedRoute = ({component: Component, authenticated, error, redirectTo, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => !!authenticated
                ? <Redirect to={{
                    pathname: redirectTo,
                    state: { from: props.location }}}/>
                : (error.isError ? <ErrorPanel {...error}/> : <Component {...props} />)}
        />
    )
};

const mapStateToProps = (state: State) => {
    return {
        error: state.error,
        authenticated: state.auth.authenticated,
    };
};

export default connect(
    mapStateToProps
)(UnauthenticatedRoute);