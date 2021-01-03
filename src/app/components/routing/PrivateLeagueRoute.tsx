import {Redirect, Route, useLocation} from "react-router-dom";
import React from "react";
import ErrorPanel from "../error/ErrorPanel";
import {useGlobalStores} from "../../context/global_context";
import {observer} from "mobx-react";

const PrivateLeagueRoute = observer(({component: Comp, ...rest}) => {
    const { authStore, userStore, errorStore } = useGlobalStores();
    const location = useLocation();
    const authenticated = !!authStore.authenticated;

    if (!authenticated) {
        return <Redirect to={{pathname: '/login', state: {from: location}}}/>
    }

    console.log(`Hitting a private league route. User: ${userStore.user?.id}, hasLeague: ${userStore.hasLeague}`);
    if (!!userStore.user?.id && !userStore.hasLeague) {
        console.log("Not affiliated with league. Redirecting to new league page. Value " + userStore.hasLeague);
        return <Redirect to={{pathname: '/league/new', state: {from: location}}}/>;
    }

    return (
        <Route
            {...rest}
            render={props =>
                (errorStore.isError ? <ErrorPanel {...errorStore}/> : <Comp {...props} />)
            }
        />
    )
});

export default PrivateLeagueRoute
