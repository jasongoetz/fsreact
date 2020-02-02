import {Redirect, Route} from "react-router";
import React, {Component} from "react";
import {connect} from "react-redux";
import {State} from "../reducers/root";
import ErrorPanel from "./error/ErrorPanel";
import {isLoggedIn} from "../auth/authSelectors";
import {AuthConsumer} from "../auth/authContext";

const UnauthenticatedRoute = ({component: Component, error, redirectTo, ...rest}) => {
    return (
        <AuthConsumer select={[isLoggedIn]}>
            {authenticated =>
                <Route
                    {...rest}
                    render={(props) => !!authenticated
                        ? <Redirect to={{
                            pathname: redirectTo,
                            state: { from: props.location }}}/>
                        : (error.isError ? <ErrorPanel {...error}/> : <Component {...props} />)}
                />
            }
        </AuthConsumer>
    )
};

const mapStateToProps = (state) => {
    return {
        error: state.error,
    };
};

export default connect(
    mapStateToProps
)(UnauthenticatedRoute);
