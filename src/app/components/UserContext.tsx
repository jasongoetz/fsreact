import React from "react";
import UserContextContainer from "./UserContextContainer";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";

interface Props {
    adminRequired?: boolean;
}

const UserContext: React.FC<Props> = observer(({adminRequired, children}) => {
    const { authStore } = useGlobalStores();
    return !!authStore.authenticated && authStore.userId ?
        <UserContextContainer userId={authStore.userId} adminRequired={adminRequired}>
            {children}
        </UserContextContainer>
    : <>{children}</>
});

export default UserContext;
