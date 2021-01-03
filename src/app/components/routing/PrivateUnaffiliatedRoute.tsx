import {Redirect, Route, useLocation} from "react-router-dom";
import React from "react";
import ErrorPanel from "../error/ErrorPanel";
import {useGlobalStores} from "../../context/global_context";
import {errorStore} from "../../error/error.store";
import {observer} from "mobx-react";

const PrivateUnaffiliatedRoute = observer(({component: Comp, ...rest}) => {
    const { authStore, userStore } = useGlobalStores();
    const location = useLocation();
    const authenticated = !!authStore.authenticated;

    if (!authenticated) {
        return <Redirect to={{pathname: '/login', state: {from: location}}}/>
    }

    if (!!userStore.user?.id && userStore.hasLeague) {
        return <ErrorPanel statusCode={400} errorMessage={"You already are in a league"}/>
    }

    return (
        <Route
            {...rest}
            render={props => errorStore.isError ? <ErrorPanel {...errorStore}/> : <Comp {...props} />}
        />
    )
});

export default PrivateUnaffiliatedRoute;
