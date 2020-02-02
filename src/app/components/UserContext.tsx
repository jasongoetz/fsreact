import {AuthConsumer} from "../auth/authContext";
import {getUserId, isLoggedIn} from "../auth/authSelectors";
import React from "react";
import UserContextContainer from "./UserContextContainer";

const UserContext: React.FC = ({children}) => {
    return <AuthConsumer select={[isLoggedIn, getUserId]}>
        {(authenticated, userId) => {
            return !!authenticated ?
                <UserContextContainer userId={userId}>
                    {children}
                </UserContextContainer>
            : {children}
        }}
    </AuthConsumer>;
};

export default UserContext;
