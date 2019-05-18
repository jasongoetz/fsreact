import {Redirect, Route} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {State} from "../reducers/root";
import {isLoggedIn} from "../auth/authSelector";

const PrivateRoute = ({component: Comp, authenticated, ...rest}) => (
    <Route
        {...rest}
        render={props => !!authenticated
            ? <Comp {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        }
    />
);

const mapStateToProps = (state: State) => {
    return {
        authenticated: isLoggedIn(state),
    };
};

export default connect(
    mapStateToProps
)(PrivateRoute);
