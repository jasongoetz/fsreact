import {Redirect, Route} from "react-router";
import React from "react";
import ErrorPanel from "../error/ErrorPanel";
import {useGlobalStores} from "../../context/global_context";
import {observer} from "mobx-react";

const UnauthenticatedRoute = observer(({component: Component, redirectTo, ...rest}) => {
    const { authStore, errorStore } = useGlobalStores();
    const authenticated = !!authStore.authenticated;
    return <Route
        {...rest}
        render={(props) => authenticated
            ? <Redirect to={{
                pathname: redirectTo,
                state: {from: props.location}
            }}/>
            : (errorStore.isError ? <ErrorPanel {...errorStore}/> : <Component {...props} />)}
    />
});

export default UnauthenticatedRoute;
