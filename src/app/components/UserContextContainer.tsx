import {useLoadContext} from "../context/use_load_context";
import React, {FC} from "react";
import {useGlobalStores} from "../context/global_context";
import {LoadingContainer} from "./LoadingContainer";

interface Props {
    userId: number;
}

const UserContextContainer: FC<React.PropsWithChildren<Props>> = (props) => {
    const { userStore } = useGlobalStores();
    useLoadContext(props.userId);

    if (userStore.loading) {
        return <LoadingContainer/>
    }
    else {
        return <>{props.children}</>;
    }
};

export default UserContextContainer;
