import {Redirect, Route} from "react-router-dom";
import React from "react";
import ErrorPanel from "../error/ErrorPanel";
import {useGlobalStores} from "../../context/global_context";
import {errorStore} from "../../error/error.store";
import {observer} from "mobx-react";

const PrivateUnaffiliatedRoute = observer(({component: Comp, ...rest}) => {
    const { authStore, userStore } = useGlobalStores();
    const authenticated = !!authStore.authenticated;
    return (
        <Route
            {...rest}
            render={props => authenticated
                ? (errorStore.isError ? <ErrorPanel {...errorStore}/> : (!!userStore.user?.id && !userStore.hasLeague ?
                    <Comp {...props} /> :
                    <ErrorPanel statusCode={400} errorMessage={"You already are in a league"}/>))
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
        />
    )
});

export default PrivateUnaffiliatedRoute;
