import {useLoadContext} from "../context/use_load_context";
import React, {FC} from "react";

interface Props {
    userId: number;
}

const UserContextContainer: FC<React.PropsWithChildren<Props>> = (props) => {
    useLoadContext(props.userId);
    return <>{props.children}</>;
};

export default UserContextContainer;
