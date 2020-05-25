import {Redirect, Route} from "react-router-dom";
import React from "react";
import ErrorPanel from "../error/ErrorPanel";
import {useGlobalStores} from "../../context/global_context";
import {observer} from "mobx-react";

const PrivateLeagueRoute = observer(({component: Comp, ...rest}) => {
    const { authStore, userStore, errorStore } = useGlobalStores();
    const authenticated = !!authStore.authenticated;
    return (
        <Route
            {...rest}
            render={props => authenticated
                ? (errorStore.isError ? <ErrorPanel {...errorStore}/> : (!!userStore.user?.id && !userStore.hasLeague ? <Redirect to={{pathname: '/league/new', state: {from: props.location}}}/> : <Comp {...props} />))
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
        />
    )
});

export default PrivateLeagueRoute
