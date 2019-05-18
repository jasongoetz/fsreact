import {Redirect, Route} from "react-router";
import React, {Component} from "react";
import {connect} from "react-redux";
import {State} from "../reducers/root";

const UnauthenticatedRoute = ({component: Component, authenticated, redirectTo, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => !!authenticated
                ? <Redirect to={{
                    pathname: redirectTo,
                    state: { from: props.location }}}/>
                : <Component {...props} />}
        />
    )
};

const mapStateToProps = (state: State) => {
    return {
        authenticated: state.auth.authenticated,
    };
};

export default connect(
    mapStateToProps
)(UnauthenticatedRoute);