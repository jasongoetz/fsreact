import CreateLeagueForm from "./CreateLeagueForm";
import ImagePage from "./ImagePage";
import React from "react";
import {observer} from "mobx-react";
import {useGlobalStores} from "../context/global_context";
import {LoadingContainer} from "./LoadingContainer";
import {FSButton} from "./FSComponents";
import {joinLeagueWithInvite} from "../user/user.actions";
import {Invite, LeagueInviteWithFullLeague} from "../types";
import {useHistory} from "react-router-dom";

const JoinLeagueScreen: React.FC = observer(() => {

    const history = useHistory();

    const {authStore, userStore} = useGlobalStores();

    if (!userStore.loaded || !userStore.user || !authStore.userId) {
        return <LoadingContainer/>;
    }

    const joinLeague = async (leagueInvite: LeagueInviteWithFullLeague) => {
        const invite: Invite = {...leagueInvite, league: leagueInvite.league.id};
        await joinLeagueWithInvite(authStore.userId!, invite);
        history.push('/');
    }

    if (userStore.user.leagueInvites && userStore.user.leagueInvites.length >  0) {
        return (
            <div>
                <span>{(userStore.user.leagueInvites.length > 1) ? 'Join one of the following leagues:' : 'Join this league: '}</span>
                {userStore.user.leagueInvites.map((invite, i) =>
                    <FSButton
                        key={`join-league-${i}`}
                        data-testid={`join-league-${i}`}
                        color="link"
                        onClick={() => joinLeague(invite)}>{`${invite.league.name} (${invite.league.sport})`}
                    </FSButton>
                )}
            </div>
        )
    }
    else {
        return (
            <ImagePage>
                <CreateLeagueForm userId={authStore.userId} />
            </ImagePage>
        );
    }
});

export default JoinLeagueScreen;
