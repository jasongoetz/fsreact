import {Redirect, useLocation} from "react-router-dom";
import {useGlobalStores} from "../context/global_context";
import React, {useEffect} from "react";
import {loadInviteByToken} from "../invite/invite.actions";
import {LoadingContainer} from "./LoadingContainer";
import {observer} from "mobx-react";
import Registration from "./Registration";

export const RSVPPage: React.FC = observer(() => {
    const location = useLocation();
    const useQuery = () => {
        return new URLSearchParams(location.search);
    }

    const {inviteStore} = useGlobalStores();
    //const authenticated = !!authStore.authenticated;
    const query = useQuery();
    const token = query.get("token");
    useEffect(() => {
        if (token) {
            loadInviteByToken(token);
        }
    }, [token]);

    if (!token) {
        return <Redirect to={{pathname: '/login', state: {from: location}}}/>
    }

    if (!inviteStore.invite) {
        return <LoadingContainer/>;
    }

    return <Registration />
});

