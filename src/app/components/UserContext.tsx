import React from "react";
import UserContextContainer from "./UserContextContainer";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";

const UserContext: React.FC = observer(({children}) => {
    const { authStore } = useGlobalStores();
    return !!authStore.authenticated && authStore.userId ?
        <UserContextContainer userId={authStore.userId}>
            {children}
        </UserContextContainer>
    : <>{children}</>
});

export default UserContext;
