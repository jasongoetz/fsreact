import {Route} from "react-router";
import React from "react";
import ErrorPanel from "../error/ErrorPanel";
import {useGlobalStores} from "../../context/global_context";
import {observer} from "mobx-react";

const OpenRoute = observer(({component: Component, redirectTo, ...rest}) => {
    const { errorStore } = useGlobalStores();
    return <Route
        {...rest}
        render={(props) => errorStore.isError ?
            <ErrorPanel {...errorStore}/> :
            <Component {...props} />}
    />
});

export default OpenRoute;
