import {useLoadContext} from "../context/use_load_context";
import React, {FC} from "react";
import {useGlobalStores} from "../context/global_context";
import {LoadingContainer} from "./LoadingContainer";
import {Redirect} from "react-router-dom";

interface Props {
    userId: number;
    adminRequired?: boolean;
    leagueAdminRequired?: boolean;
}

const UserContextContainer: FC<React.PropsWithChildren<Props>> = (props) => {
    const { userStore, leagueStore } = useGlobalStores();
    useLoadContext(props.userId, userStore.loaded);

    if (!userStore.loaded) {
        return <LoadingContainer/>
    }
    else if (props.adminRequired && !userStore.user?.systemAdmin) {
        return <Redirect to={{pathname: '/login'}}/>
    }
    else if (props.leagueAdminRequired && userStore.user && leagueStore.league && userStore.user?.id !== leagueStore.league?.adminId) {
        return <Redirect to={{pathname: '/login'}}/>
    }
    else {
        return <>{props.children}</>;
    }
};

export default UserContextContainer;
