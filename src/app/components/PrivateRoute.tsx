import {Redirect, Route} from "react-router";
import React, {Component} from "react";
import {connect} from "react-redux";
import {State} from "../reducers/root";

const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
    console.log(`PrivateRoute, authenticated: ${authenticated}`);
    return (
        <Route
            {...rest}
            render={(props) => !!authenticated
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
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
)(PrivateRoute);
