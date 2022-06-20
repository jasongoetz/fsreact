import {useLoadContext} from "../context/use_load_context";
import React, {FC} from "react";
import {useGlobalStores} from "../context/global_context";
import {LoadingContainer} from "./LoadingContainer";
import {Redirect} from "react-router-dom";

interface Props {
    userId: number;
    adminRequired?: boolean;
}

const UserContextContainer: FC<React.PropsWithChildren<Props>> = (props) => {
    const { userStore } = useGlobalStores();
    useLoadContext(props.userId, userStore.loaded);

    if (!userStore.loaded) {
        return <LoadingContainer/>
    }
    else if (props.adminRequired && !userStore.user?.systemAdmin) {
        return <Redirect to={{pathname: '/login'}}/>
    }
    else {
        return <>{props.children}</>;
    }
};

export default UserContextContainer;
