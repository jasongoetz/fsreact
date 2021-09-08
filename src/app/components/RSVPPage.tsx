import {Redirect, useLocation} from "react-router-dom";
import {useGlobalStores} from "../context/global_context";
import React, {useEffect} from "react";
import {loadInviteByToken} from "../invite/invite.actions";
import {LoadingContainer} from "./LoadingContainer";
import {observer} from "mobx-react";
import Registration from "./Registration";
import {joinLeagueWithInvite} from "../user/user.actions";

export const RSVPPage: React.FC = observer(() => {
    const location = useLocation();
    const useQuery = () => {
        return new URLSearchParams(location.search);
    }

    const {inviteStore, authStore} = useGlobalStores();
    const query = useQuery();
    const token = query.get("token");
    useEffect(() => {
        if (token) {
            loadInviteByToken(token);
        }
    }, [token]);

    useEffect(() => {
        if (authStore.authenticated && authStore.userId && inviteStore.invite) {
            joinLeagueWithInvite(authStore.userId, inviteStore.invite);
        }
    }, [authStore.authenticated, authStore.userId, inviteStore.invite]);

    if (!token) {
        return <Redirect to={{pathname: '/login', state: {from: location}}}/>
    }

    if (!inviteStore.invite || (authStore.authenticated && !inviteStore.invite.accepted)) {
        return <LoadingContainer/>;
    }

    if (inviteStore.invite && inviteStore.invite.accepted) {
        return <Redirect to={{pathname: '/', state: {from: location}}}/>
    }

    return <Registration />
});

